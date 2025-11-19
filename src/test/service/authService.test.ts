import { describe, it, expect, vi, beforeEach } from 'vitest';
import AuthService from '../../service/authService';
import AuthRepository from '../../repository/authRepository';
import jwt from 'jsonwebtoken';

vi.mock('../../repository/authRepository');
vi.mock('jsonwebtoken');

describe('AuthService', () => {
    let service: AuthService;
    let repositoryMock: any;

    beforeEach(() => {
        vi.clearAllMocks();
        service = new AuthService();
        repositoryMock = (AuthRepository as any).mock.instances[0];
    });

    describe('login', () => {
        it('deve fazer login com sucesso e retornar token', async () => {
            const mockUsuario = {
                _id: '123',
                nome: 'Usuário Teste',
                login: 'usuario@test.com',
                senha: '123456',
                funcao: 'COORDENADOR'
            };

            const mockToken = 'token_jwt_mockado';

            vi.mocked(repositoryMock.encontrarPorEmail).mockResolvedValue(mockUsuario);
            vi.mocked(jwt.sign).mockReturnValue(mockToken as any);
            vi.mocked(repositoryMock.salvarToken).mockResolvedValue(undefined);

            const resultado = await service.login('usuario@test.com', '123456');

            expect(repositoryMock.encontrarPorEmail).toHaveBeenCalledWith('usuario@test.com');
            expect(jwt.sign).toHaveBeenCalled();
            expect(repositoryMock.salvarToken).toHaveBeenCalledWith('123', mockToken);
            expect(resultado).toEqual({
                usuario: mockUsuario,
                token: mockToken
            });
        });

        it('deve lançar erro se usuário não for encontrado', async () => {
            vi.mocked(repositoryMock.encontrarPorEmail).mockResolvedValue(null);

            await expect(service.login('inexistente@test.com', '123456')).rejects.toThrow('Usuário não encontrado');
        });

        it('deve lançar erro se senha estiver incorreta', async () => {
            const mockUsuario = {
                _id: '123',
                login: 'usuario@test.com',
                senha: '123456',
                nome: 'Teste',
                funcao: 'COORDENADOR'
            };

            vi.mocked(repositoryMock.encontrarPorEmail).mockResolvedValue(mockUsuario);

            await expect(service.login('usuario@test.com', 'senhaErrada')).rejects.toThrow('Senha incorreta');
        });
    });

    describe('logout', () => {
        it('deve fazer logout com sucesso', async () => {
            vi.mocked(repositoryMock.removerToken).mockResolvedValue(undefined);

            const resultado = await service.logout('123');

            expect(repositoryMock.removerToken).toHaveBeenCalledWith('123');
            expect(resultado).toEqual({ message: 'Logout realizado com sucesso' });
        });

        it('deve lançar erro se falhar ao remover token', async () => {
            vi.mocked(repositoryMock.removerToken).mockRejectedValue(new Error('Erro ao remover'));

            await expect(service.logout('123')).rejects.toThrow('Erro ao remover');
        });
    });

    describe('invalidarToken', () => {
        it('deve invalidar token com sucesso', async () => {
            vi.mocked(repositoryMock.removerTokenPorValor).mockResolvedValue(undefined);

            const resultado = await service.invalidarToken('token123');

            expect(repositoryMock.removerTokenPorValor).toHaveBeenCalledWith('token123');
            expect(resultado).toEqual({ message: 'Token invalidado com sucesso' });
        });
    });

    describe('validarToken', () => {
        it('deve retornar true se token for válido', async () => {
            const mockUsuario = { _id: '123', nome: 'Teste' };
            vi.mocked(repositoryMock.encontrarPorToken).mockResolvedValue(mockUsuario);

            const resultado = await service.validarToken('token123');

            expect(resultado).toBe(true);
        });

        it('deve retornar false se token não for encontrado', async () => {
            vi.mocked(repositoryMock.encontrarPorToken).mockResolvedValue(null);

            const resultado = await service.validarToken('tokenInvalido');

            expect(resultado).toBe(false);
        });

        it('deve retornar false se houver erro', async () => {
            vi.mocked(repositoryMock.encontrarPorToken).mockRejectedValue(new Error('Erro'));

            const resultado = await service.validarToken('token123');

            expect(resultado).toBe(false);
        });
    });
});
