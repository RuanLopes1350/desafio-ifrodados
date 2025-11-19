import { describe, it, expect, vi, beforeEach } from 'vitest';
import CandidatoController from '../../controller/candidatoController';
import CandidatoService from '../../service/candidatoService';
import { Request, Response } from 'express';

vi.mock('../../service/candidatoService');

describe('CandidatoController', () => {
    let controller: CandidatoController;
    let serviceMock: any;
    let req: Partial<Request>;
    let res: Partial<Response>;
    let statusJsonSpy: any;

    beforeEach(() => {
        vi.clearAllMocks();
        controller = new CandidatoController();
        serviceMock = (CandidatoService as any).mock.instances[0];

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

    it('deve retornar erro 400 se campos obrigatórios estiverem faltando', async () => {
        req.body = { nome: 'Sem Email' };

        await controller.criar(req as Request, res as Response);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(statusJsonSpy).toHaveBeenCalledWith(expect.objectContaining({
            message: 'Campos obrigatórios faltando'
        }));
        expect(serviceMock.criar).not.toHaveBeenCalled();
    });

    it('deve retornar 201 e os dados quando o cadastro for bem sucedido', async () => {
        req.body = {
            nome: 'Candidato Valido',
            email: 'teste@teste.com',
            estudante: true,
            dataCadastro: '2025-10-10',
            projetosAcademicos: [],
            projetosProfissionais: []
        };

        const candidatoCriado = { ...req.body, _id: 'novo_id' };
        vi.mocked(serviceMock.criar).mockResolvedValue(candidatoCriado);

        await controller.criar(req as Request, res as Response);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(statusJsonSpy).toHaveBeenCalledWith({
            message: 'Candidato cadastrado com sucesso',
            data: candidatoCriado
        });
    });

    it('deve retornar 500 se o service lançar exceção', async () => {
        req.body = {
            nome: 'Candidato Erro',
            email: 'erro@teste.com',
            estudante: false,
            dataCadastro: '2025-10-10'
        };

        vi.mocked(serviceMock.criar).mockRejectedValue(new Error('Erro interno'));

        await controller.criar(req as Request, res as Response);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(statusJsonSpy).toHaveBeenCalledWith(expect.objectContaining({
            message: 'Erro ao cadastrar candidato'
        }));
    });
});