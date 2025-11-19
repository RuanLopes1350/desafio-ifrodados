import { describe, it, expect, vi, beforeEach } from 'vitest';
import ProjetoService from '../../service/projetosService';
import ProjetoRepository from '../../repository/projetosRepository';

vi.mock('../../repository/projetosRepository');

describe('ProjetoService', () => {
    let service: ProjetoService;
    let repositoryMock: any;

    beforeEach(() => {
        vi.clearAllMocks();
        service = new ProjetoService();
        repositoryMock = (ProjetoRepository as any).mock.instances[0];
    });

    describe('listar', () => {
        it('deve listar projetos com sucesso', async () => {
            const mockProjetos = [
                { _id: '1', nome: 'Projeto 1', periodoDuracao: 12 },
                { _id: '2', nome: 'Projeto 2', periodoDuracao: 6 }
            ];

            vi.mocked(repositoryMock.listar).mockResolvedValue(mockProjetos);

            const resultado = await service.listar();

            expect(repositoryMock.listar).toHaveBeenCalledTimes(1);
            expect(resultado).toEqual(mockProjetos);
        });

        it('deve lançar erro se repositório falhar', async () => {
            vi.mocked(repositoryMock.listar).mockRejectedValue(new Error('Erro de conexão'));

            await expect(service.listar()).rejects.toThrow('Erro de conexão');
        });
    });

    describe('criar', () => {
        it('deve criar projeto com sucesso', async () => {
            const dadosProjeto = {
                nome: 'Novo Projeto',
                periodoDuracao: 12,
                dataLimiteInscricao: new Date('2025-12-31'),
                instituicaoCliente: 'IFRO',
                coordenador: 'Prof. Silva'
            };

            const mockProjeto = { _id: '123', ...dadosProjeto };
            vi.mocked(repositoryMock.criar).mockResolvedValue(mockProjeto);

            const resultado = await service.criar(dadosProjeto);

            expect(repositoryMock.criar).toHaveBeenCalledWith(dadosProjeto);
            expect(resultado).toEqual(mockProjeto);
        });

        it('deve lançar erro se falhar ao criar', async () => {
            vi.mocked(repositoryMock.criar).mockRejectedValue(new Error('Erro ao criar'));

            await expect(service.criar({} as any)).rejects.toThrow('Erro ao criar');
        });
    });

    describe('editar', () => {
        it('deve editar projeto com sucesso', async () => {
            const dadosAtualizacao = { nome: 'Nome Atualizado' };
            const mockProjeto = { _id: '123', nome: 'Nome Atualizado' };

            vi.mocked(repositoryMock.editar).mockResolvedValue(mockProjeto);

            const resultado = await service.editar('123', dadosAtualizacao);

            expect(repositoryMock.editar).toHaveBeenCalledWith('123', dadosAtualizacao);
            expect(resultado).toEqual(mockProjeto);
        });
    });

    describe('deletar', () => {
        it('deve deletar projeto com sucesso', async () => {
            vi.mocked(repositoryMock.deletar).mockResolvedValue(undefined);

            await service.deletar('123');

            expect(repositoryMock.deletar).toHaveBeenCalledWith('123');
        });

        it('deve lançar erro se falhar ao deletar', async () => {
            vi.mocked(repositoryMock.deletar).mockRejectedValue(new Error('Erro ao deletar'));

            await expect(service.deletar('123')).rejects.toThrow('Erro ao deletar');
        });
    });
});
