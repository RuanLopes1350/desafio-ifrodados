import { describe, it, expect, vi, beforeEach } from 'vitest';
import { authMiddleware, AuthRequest } from '../../middleware/authMiddleware';
import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import AuthService from '../../service/authService';

vi.mock('jsonwebtoken');
vi.mock('../../service/authService');

describe('authMiddleware', () => {
    let req: Partial<AuthRequest>;
    let res: Partial<Response>;
    let next: NextFunction;
    let statusJsonSpy: any;

    beforeEach(() => {
        vi.clearAllMocks();

        req = {
            headers: {}
        };

        statusJsonSpy = vi.fn();
        res = {
            status: vi.fn().mockReturnValue({
                json: statusJsonSpy
            })
        };

        next = vi.fn();
    });

    it('deve retornar 401 se token não for fornecido', async () => {
        req.headers = {};

        await authMiddleware(req as AuthRequest, res as Response, next);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(statusJsonSpy).toHaveBeenCalledWith({
            message: 'Token não fornecido',
            error: 'Autenticação necessária'
        });
        expect(next).not.toHaveBeenCalled();
    });

    it('deve retornar 401 se token for inválido ou expirado', async () => {
        req.headers = {
            authorization: 'Bearer token_invalido'
        };

        vi.mocked(jwt.verify).mockImplementation(() => {
            throw new Error('Token inválido');
        });

        await authMiddleware(req as AuthRequest, res as Response, next);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(statusJsonSpy).toHaveBeenCalledWith({
            message: 'Token inválido ou expirado',
            error: 'Não autorizado'
        });
        expect(next).not.toHaveBeenCalled();
    });

    it('deve retornar 401 se token não existir no banco de dados', async () => {
        req.headers = {
            authorization: 'Bearer token_valido'
        };

        const mockDecoded = {
            id: '123',
            login: 'usuario@test.com',
            nome: 'Usuário Teste',
            funcao: 'COORDENADOR'
        };

        vi.mocked(jwt.verify).mockReturnValue(mockDecoded as any);

        const mockAuthService = {
            validarToken: vi.fn().mockResolvedValue(false)
        };
        vi.mocked(AuthService).mockImplementation(() => mockAuthService as any);

        await authMiddleware(req as AuthRequest, res as Response, next);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(statusJsonSpy).toHaveBeenCalledWith({
            message: 'Token inválido ou revogado',
            error: 'Não autorizado'
        });
        expect(next).not.toHaveBeenCalled();
    });

    it('deve chamar next() se token for válido e existir no banco', async () => {
        req.headers = {
            authorization: 'Bearer token_valido'
        };

        const mockDecoded = {
            id: '123',
            login: 'usuario@test.com',
            nome: 'Usuário Teste',
            funcao: 'COORDENADOR'
        };

        vi.mocked(jwt.verify).mockReturnValue(mockDecoded as any);

        const mockAuthService = {
            validarToken: vi.fn().mockResolvedValue(true)
        };
        vi.mocked(AuthService).mockImplementation(() => mockAuthService as any);

        await authMiddleware(req as AuthRequest, res as Response, next);

        expect(req.user).toEqual(mockDecoded);
        expect(next).toHaveBeenCalled();
        expect(res.status).not.toHaveBeenCalled();
    });
});
