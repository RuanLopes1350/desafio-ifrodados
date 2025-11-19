import { describe, it, expect, vi, beforeEach } from 'vitest';
import UsuarioService from '../../service/usuarioService';
import UsuarioRepository from '../../repository/usuarioRepository';

vi.mock('../../repository/usuarioRepository');

describe('UsuarioService', () => {
    let service: UsuarioService;
    let repositoryMock: any;

    beforeEach(() => {
        vi.clearAllMocks();
        service = new UsuarioService();
        repositoryMock = (UsuarioRepository as any).mock.instances[0];
    });

    describe('criar', () => {
        it('deve criar usuário com sucesso', async () => {
            const dadosUsuario = {
                nome: 'Usuário Teste',
                login: 'usuario@test.com',
                senha: '123456',
                funcao: 'COORDENADOR'
            };

            const mockUsuario = { _id: '123', ...dadosUsuario };
            vi.mocked(repositoryMock.criar).mockResolvedValue(mockUsuario);

            const resultado = await service.criar(dadosUsuario as any);

            expect(repositoryMock.criar).toHaveBeenCalledWith(dadosUsuario);
            expect(resultado).toEqual(mockUsuario);
        });

        it('deve lançar erro se repositório falhar', async () => {
            vi.mocked(repositoryMock.criar).mockRejectedValue(new Error('Erro ao criar'));

            await expect(service.criar({} as any)).rejects.toThrow('Erro ao criar');
        });
    });

    describe('listar', () => {
        it('deve listar usuários com sucesso', async () => {
            const mockUsuarios = [
                { _id: '1', nome: 'Usuário 1', login: 'user1@test.com' },
                { _id: '2', nome: 'Usuário 2', login: 'user2@test.com' }
            ];

            vi.mocked(repositoryMock.listar).mockResolvedValue(mockUsuarios);

            const resultado = await service.listar();

            expect(repositoryMock.listar).toHaveBeenCalledTimes(1);
            expect(resultado).toEqual(mockUsuarios);
        });

        it('deve lançar erro se falhar ao listar', async () => {
            vi.mocked(repositoryMock.listar).mockRejectedValue(new Error('Erro de conexão'));

            await expect(service.listar()).rejects.toThrow('Erro de conexão');
        });
    });

    describe('editar', () => {
        it('deve editar usuário com sucesso', async () => {
            const dadosAtualizacao = { nome: 'Nome Atualizado' };
            const mockUsuario = { _id: '123', nome: 'Nome Atualizado' };

            vi.mocked(repositoryMock.editar).mockResolvedValue(mockUsuario);

            const resultado = await service.editar('123', dadosAtualizacao);

            expect(repositoryMock.editar).toHaveBeenCalledWith('123', dadosAtualizacao);
            expect(resultado).toEqual(mockUsuario);
        });

        it('deve lançar erro se falhar ao editar', async () => {
            vi.mocked(repositoryMock.editar).mockRejectedValue(new Error('Erro ao editar'));

            await expect(service.editar('123', {})).rejects.toThrow('Erro ao editar');
        });
    });

    describe('deletar', () => {
        it('deve deletar usuário com sucesso', async () => {
            vi.mocked(repositoryMock.deletar).mockResolvedValue(undefined);

            const resultado = await service.deletar('123');

            expect(repositoryMock.deletar).toHaveBeenCalledWith('123');
            expect(resultado).toBeUndefined();
        });

        it('deve lançar erro se falhar ao deletar', async () => {
            vi.mocked(repositoryMock.deletar).mockRejectedValue(new Error('Erro ao deletar'));

            await expect(service.deletar('123')).rejects.toThrow('Erro ao deletar');
        });
    });
});
