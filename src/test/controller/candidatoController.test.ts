import { describe, it, expect, vi, beforeEach } from 'vitest';
import CandidatoController from '../../controller/candidatoController';
import CandidatoService from '../../service/candidatoService';
import { Request, Response } from 'express';

vi.mock('../../service/candidatoService');

describe('CandidatoController - Validações', () => {
    let controller: CandidatoController;
    let serviceMock: any;
    let req: Partial<Request>;
    let res: Partial<Response>;
    let statusJsonSpy: any;

    beforeEach(() => {
        vi.clearAllMocks();
        controller = new CandidatoController();
        serviceMock = (CandidatoService as any).mock.instances[0];
        statusJsonSpy = vi.fn();
        res = {
            status: vi.fn().mockReturnValue({ json: statusJsonSpy })
        };
        req = { body: {}, params: {}, query: {} };
    });

    describe('Validação de Criação', () => {
        it('deve rejeitar e-mail inválido', async () => {
            req.body = {
                nome: 'Teste Silva',
                email: 'email-sem-arroba.com', // Inválido
                estudante: true,
                dataCadastro: new Date()
            };

            await controller.criar(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(statusJsonSpy).toHaveBeenCalledWith(expect.objectContaining({
                error: 'Formato de e-mail inválido'
            }));
        });

        it('deve rejeitar nome muito curto', async () => {
            req.body = {
                nome: 'Oi',
                email: 'teste@valido.com',
                estudante: true,
                dataCadastro: new Date()
            };

            await controller.criar(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(statusJsonSpy).toHaveBeenCalledWith(expect.objectContaining({
                error: 'O nome deve ter pelo menos 3 caracteres'
            }));
        });
    });

    describe('Validação de Avaliação', () => {
        it('deve rejeitar nota menor que 0', async () => {
            req.params = { id: '123' };
            req.body = { avaliacao: -1 };

            await controller.avaliar(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(statusJsonSpy).toHaveBeenCalledWith(expect.objectContaining({
                error: 'A nota deve ser entre 0 e 10'
            }));
        });

        it('deve rejeitar nota maior que 10', async () => {
            req.params = { id: '123' };
            req.body = { avaliacao: 10.5 };

            await controller.avaliar(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(statusJsonSpy).toHaveBeenCalledWith(expect.objectContaining({
                error: 'A nota deve ser entre 0 e 10'
            }));
        });
    });

    describe('Segurança na Edição', () => {
        it('NÃO deve permitir alterar status pela rota genérica de edição', async () => {
            req.params = { id: '123' };
            req.body = { 
                nome: 'Hacker', 
                statusInscricao: 'Aprovado' 
            };

            vi.mocked(serviceMock.editar).mockResolvedValue({ _id: '123' });

            await controller.editar(req as Request, res as Response);

            const argsChamadaService = vi.mocked(serviceMock.editar).mock.calls[0][1];
            
            expect(argsChamadaService).toHaveProperty('nome');
            expect(argsChamadaService).not.toHaveProperty('statusInscricao');
        });
    });
});