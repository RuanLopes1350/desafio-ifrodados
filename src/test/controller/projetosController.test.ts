import { describe, it, expect, vi, beforeEach } from 'vitest';
import ProjetoController from '../../controller/projetosController';
import ProjetoService from '../../service/projetosService';
import { Request, Response } from 'express';

vi.mock('../../service/projetosService');

describe('ProjetoController', () => {
    let controller: ProjetoController;
    let serviceMock: any;
    let req: Partial<Request>;
    let res: Partial<Response>;
    let statusJsonSpy: any;

    beforeEach(() => {
        vi.clearAllMocks();
        controller = new ProjetoController();
        serviceMock = (ProjetoService as any).mock.instances[0];

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

    describe('listar', () => {
        it('deve retornar lista de projetos com sucesso', async () => {
            const mockProjetos = [
                { _id: '1', nome: 'Projeto 1', periodoDuracao: 12 },
                { _id: '2', nome: 'Projeto 2', periodoDuracao: 6 }
            ];

            const mockResultado = {
                docs: mockProjetos,
                totalDocs: 2,
                page: 1,
                limit: 10,
                totalPages: 1,
                hasNextPage: false,
                hasPrevPage: false
            };

            req.query = {};
            vi.mocked(serviceMock.listar).mockResolvedValue(mockResultado);

            await controller.listar(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(statusJsonSpy).toHaveBeenCalledWith({
                message: 'Projetos listados com sucesso',
                data: mockProjetos,
                pagination: {
                    total: 2,
                    page: 1,
                    limit: 10,
                    totalPages: 1,
                    hasNextPage: false,
                    hasPrevPage: false
                }
            });
        });

        it('deve retornar erro 500 se houver falha no serviço', async () => {
            req.query = {};
            vi.mocked(serviceMock.listar).mockRejectedValue(new Error('Erro interno'));

            await controller.listar(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(statusJsonSpy).toHaveBeenCalledWith({
                message: 'Erro ao listar projetos',
                error: 'Erro interno'
            });
        });
    });

    describe('criar', () => {
        it('deve retornar erro 400 se campos obrigatórios estiverem faltando', async () => {
            req.body = { nome: 'Projeto sem dados completos' };

            await controller.criar(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(statusJsonSpy).toHaveBeenCalledWith({
                message: 'Todos os campos são obrigatórios',
                error: 'Campos faltando...'
            });
        });

        it('deve retornar 201 quando projeto for criado com sucesso', async () => {
            req.body = {
                nome: 'Projeto Novo',
                periodoDuracao: 12,
                dataLimiteInscricao: '2025-12-31',
                instituicaoCliente: 'IFRO',
                coordenador: 'Prof. Silva'
            };

            const mockProjeto = { _id: '123', ...req.body };
            vi.mocked(serviceMock.criar).mockResolvedValue(mockProjeto);

            await controller.criar(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(201);
            expect(statusJsonSpy).toHaveBeenCalledWith({
                message: 'Projeto criado com sucesso',
                data: mockProjeto
            });
        });
    });

    describe('editar', () => {
        it('deve retornar 404 se projeto não for encontrado', async () => {
            req.params = { id: '123' };
            req.body = { nome: 'Novo Nome' };

            vi.mocked(serviceMock.editar).mockResolvedValue(null);

            await controller.editar(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(statusJsonSpy).toHaveBeenCalledWith({
                message: 'Projeto não encontrado',
                error: 'ID inválido'
            });
        });

        it('deve retornar 200 quando projeto for editado com sucesso', async () => {
            req.params = { id: '123' };
            req.body = { nome: 'Nome Atualizado' };

            const mockProjeto = { _id: '123', nome: 'Nome Atualizado' };
            vi.mocked(serviceMock.editar).mockResolvedValue(mockProjeto);

            await controller.editar(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(statusJsonSpy).toHaveBeenCalledWith({
                message: 'Projeto atualizado com sucesso',
                data: mockProjeto
            });
        });
    });

    describe('deletar', () => {
        it('deve retornar 200 quando projeto for deletado com sucesso', async () => {
            req.params = { id: '123' };

            vi.mocked(serviceMock.deletar).mockResolvedValue(undefined);

            await controller.deletar(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(statusJsonSpy).toHaveBeenCalledWith({
                message: 'Projeto deletado com sucesso'
            });
        });

        it('deve retornar erro 500 se houver falha ao deletar', async () => {
            req.params = { id: '123' };

            vi.mocked(serviceMock.deletar).mockRejectedValue(new Error('Erro ao deletar'));

            await controller.deletar(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(statusJsonSpy).toHaveBeenCalledWith({
                message: 'Erro ao deletar projeto',
                error: 'Erro ao deletar'
            });
        });
    });
});
