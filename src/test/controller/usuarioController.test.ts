import { describe, it, expect, vi, beforeEach } from 'vitest';
import UsuarioController from '../../controller/usuarioController';
import UsuarioService from '../../service/usuarioService';
import { Request, Response } from 'express';

vi.mock('../../service/usuarioService');

describe('UsuarioController', () => {
    let controller: UsuarioController;
    let serviceMock: any;
    let req: Partial<Request>;
    let res: Partial<Response>;
    let statusJsonSpy: any;

    beforeEach(() => {
        vi.clearAllMocks();
        controller = new UsuarioController();
        serviceMock = (UsuarioService as any).mock.instances[0];

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

    describe('criar', () => {
        it('deve retornar erro 400 se nome estiver faltando', async () => {
            req.body = { login: 'test', senha: '123', funcao: 'COORDENADOR' };

            await controller.criar(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(statusJsonSpy).toHaveBeenCalledWith({
                message: 'Nome é obrigatório',
                error: 'Nome faltando...'
            });
        });

        it('deve retornar erro 400 se login estiver faltando', async () => {
            req.body = { nome: 'Teste', senha: '123', funcao: 'COORDENADOR' };

            await controller.criar(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(statusJsonSpy).toHaveBeenCalledWith({
                message: 'Login é obrigatório',
                error: 'Login faltando...'
            });
        });

        it('deve retornar erro 400 se senha estiver faltando', async () => {
            req.body = { nome: 'Teste', login: 'test', funcao: 'COORDENADOR' };

            await controller.criar(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(statusJsonSpy).toHaveBeenCalledWith({
                message: 'Senha é obrigatória',
                error: 'Senha faltando...'
            });
        });

        it('deve retornar erro 400 se funcao estiver faltando', async () => {
            req.body = { nome: 'Teste', login: 'test', senha: '123' };

            await controller.criar(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(statusJsonSpy).toHaveBeenCalledWith({
                message: 'Função é obrigatória',
                error: 'Função faltando...'
            });
        });

        it('deve retornar 201 quando usuário for criado com sucesso', async () => {
            req.body = {
                nome: 'Usuário Teste',
                login: 'usuario@test.com',
                senha: '123456',
                funcao: 'COORDENADOR'
            };

            const mockUsuario = { _id: '123', ...req.body };
            vi.mocked(serviceMock.criar).mockResolvedValue(mockUsuario);

            await controller.criar(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(201);
            expect(statusJsonSpy).toHaveBeenCalledWith({
                message: 'Usuário criado com sucesso',
                data: mockUsuario
            });
        });

        it('deve retornar erro 500 se houver falha no serviço', async () => {
            req.body = {
                nome: 'Teste',
                login: 'test',
                senha: '123',
                funcao: 'COORDENADOR'
            };

            vi.mocked(serviceMock.criar).mockRejectedValue(new Error('Erro interno'));

            await controller.criar(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(statusJsonSpy).toHaveBeenCalledWith({
                message: 'Erro ao criar usuário',
                error: 'Erro interno'
            });
        });
    });

    describe('listar', () => {
        it('deve retornar lista de usuários com sucesso', async () => {
            const mockUsuarios = [
                { _id: '1', nome: 'Usuário 1', login: 'user1@test.com' },
                { _id: '2', nome: 'Usuário 2', login: 'user2@test.com' }
            ];

            vi.mocked(serviceMock.listar).mockResolvedValue(mockUsuarios);

            await controller.listar(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(statusJsonSpy).toHaveBeenCalledWith({
                message: 'Usuários encontrados',
                data: mockUsuarios
            });
        });
    });

    describe('editar', () => {
        it('deve retornar 200 quando usuário for editado com sucesso', async () => {
            req.params = { id: '123' };
            req.body = { nome: 'Nome Atualizado' };

            const mockUsuario = { _id: '123', nome: 'Nome Atualizado' };
            vi.mocked(serviceMock.editar).mockResolvedValue(mockUsuario);

            await controller.editar(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(statusJsonSpy).toHaveBeenCalledWith({
                message: 'Usuário editado com sucesso!',
                data: mockUsuario
            });
        });
    });

    describe('deletar', () => {
        it('deve retornar 200 quando usuário for deletado com sucesso', async () => {
            req.params = { id: '123' };

            vi.mocked(serviceMock.deletar).mockResolvedValue(undefined);

            await controller.deletar(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(statusJsonSpy).toHaveBeenCalledWith({
                message: 'Usuário deletado com sucesso!',
                data: undefined
            });
        });
    });
});
