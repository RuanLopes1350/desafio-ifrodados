import { describe, it, expect, vi, beforeEach } from 'vitest';
import AuthController from '../../controller/authController';
import AuthService from '../../service/authService';
import { Request, Response } from 'express';
import { AuthRequest } from '../../middleware/authMiddleware';

vi.mock('../../service/authService');

describe('AuthController', () => {
    let controller: AuthController;
    let serviceMock: any;
    let req: Partial<Request>;
    let res: Partial<Response>;
    let statusJsonSpy: any;

    beforeEach(() => {
        vi.clearAllMocks();
        controller = new AuthController();
        serviceMock = (AuthService as any).mock.instances[0];

        req = {
            body: {},
            params: {}
        };

        statusJsonSpy = vi.fn();
        res = {
            status: vi.fn().mockReturnValue({
                json: statusJsonSpy
            })
        };
    });

    describe('encontrarPorEmail (login)', () => {
        it('deve retornar erro 400 se login não for fornecido', async () => {
            req.body = { senha: '123456' };

            await controller.encontrarPorEmail(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(statusJsonSpy).toHaveBeenCalledWith({
                message: 'Login é obrigatório',
                error: 'Campo login faltando'
            });
        });

        it('deve retornar erro 400 se senha não for fornecida', async () => {
            req.body = { login: 'usuario@test.com' };

            await controller.encontrarPorEmail(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(statusJsonSpy).toHaveBeenCalledWith({
                message: 'Senha é obrigatória',
                error: 'Campo senha faltando'
            });
        });

        it('deve retornar 401 se credenciais forem inválidas', async () => {
            req.body = { login: 'usuario@test.com', senha: 'senhaErrada' };

            vi.mocked(serviceMock.login).mockRejectedValue(new Error('Usuário não encontrado'));

            await controller.encontrarPorEmail(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(401);
            expect(statusJsonSpy).toHaveBeenCalledWith({
                message: 'Credenciais inválidas',
                error: 'Usuário não encontrado'
            });
        });

        it('deve retornar 200 e token quando login for bem sucedido', async () => {
            req.body = { login: 'usuario@test.com', senha: '123456' };

            const mockData = {
                usuario: {
                    _id: '123',
                    nome: 'Usuário Teste',
                    login: 'usuario@test.com',
                    funcao: 'COORDENADOR',
                    senha: '123456'
                },
                token: 'token_jwt_mockado'
            };

            vi.mocked(serviceMock.login).mockResolvedValue(mockData);

            await controller.encontrarPorEmail(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(statusJsonSpy).toHaveBeenCalledWith({
                message: 'Login realizado com sucesso',
                data: {
                    usuario: {
                        id: '123',
                        nome: 'Usuário Teste',
                        login: 'usuario@test.com',
                        funcao: 'COORDENADOR'
                    },
                    token: 'token_jwt_mockado'
                }
            });
        });
    });

    describe('logout', () => {
        it('deve retornar erro 401 se usuário não estiver autenticado', async () => {
            const authReq = req as AuthRequest;
            authReq.user = undefined;

            await controller.logout(authReq, res as Response);

            expect(res.status).toHaveBeenCalledWith(401);
            expect(statusJsonSpy).toHaveBeenCalledWith({
                message: 'Usuário não autenticado',
                error: 'ID do usuário não encontrado'
            });
        });

        it('deve retornar 200 quando logout for bem sucedido', async () => {
            const authReq = req as AuthRequest;
            authReq.user = { id: '123', login: 'test', nome: 'Test', funcao: 'COORDENADOR' };

            vi.mocked(serviceMock.logout).mockResolvedValue({ message: 'Logout realizado com sucesso' });

            await controller.logout(authReq, res as Response);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(statusJsonSpy).toHaveBeenCalledWith({ message: 'Logout realizado com sucesso' });
        });
    });

    describe('invalidarToken', () => {
        it('deve retornar erro 400 se token não for fornecido', async () => {
            req.body = {};

            await controller.invalidarToken(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(statusJsonSpy).toHaveBeenCalledWith({
                message: 'Token é obrigatório',
                error: 'Campo token faltando'
            });
        });

        it('deve retornar 200 quando token for invalidado com sucesso', async () => {
            req.body = { token: 'token_para_invalidar' };

            vi.mocked(serviceMock.invalidarToken).mockResolvedValue({ message: 'Token invalidado com sucesso' });

            await controller.invalidarToken(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(statusJsonSpy).toHaveBeenCalledWith({ message: 'Token invalidado com sucesso' });
        });
    });
});
