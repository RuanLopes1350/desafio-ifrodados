import { describe, it, expect, vi, beforeEach } from 'vitest';
import CandidatoService from '../../service/candidatoService';
import CandidatoRepository from '../../repository/candidatoRepository';

vi.mock('../../repository/candidatoRepository');

describe('CandidatoService', () => {
    let service: CandidatoService;
    let repositoryMock: any;

    beforeEach(() => {
        vi.clearAllMocks();
        
        service = new CandidatoService();
        repositoryMock = (CandidatoRepository as any).mock.instances[0];
    });

    it('deve criar um candidato com sucesso e ajustar o timezone', async () => {
        const dadosEntrada = {
            nome: 'Ruan Lopes',
            email: 'ruan@teste.com',
            estudante: true,
            dataCadastro: new Date('2025-11-19T12:00:00.000Z'),
            projetosAcademicos: [],
            projetosProfissionais: []
        };
        const retornoEsperado = {
            _id: '12345',
            ...dadosEntrada
        };
        
        vi.mocked(repositoryMock.criar).mockResolvedValue(retornoEsperado);

        const resultado = await service.criar(dadosEntrada);

        expect(repositoryMock.criar).toHaveBeenCalledTimes(1);
        expect(resultado).toEqual(retornoEsperado);

        const argumentoChamada = vi.mocked(repositoryMock.criar).mock.calls[0][0];
        expect(new Date(argumentoChamada.dataCadastro).getTime()).toBeLessThan(new Date('2025-11-19T12:00:00.000Z').getTime());
    });

    it('deve lançar um erro se o repositório falhar', async () => {
        const erroBanco = new Error('Erro de conexão');
        vi.mocked(repositoryMock.criar).mockRejectedValue(erroBanco);

        const dadosEntrada: any = { nome: 'Teste' };

        await expect(service.criar(dadosEntrada)).rejects.toThrow('Erro de conexão');
    });
});