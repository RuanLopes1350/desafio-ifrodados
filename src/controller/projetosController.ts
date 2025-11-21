import ProjetoService from "../service/projetosService";
import { Request, Response } from "express";
import { IProjeto } from "../interface/models";

class ProjetoController {
    private service: ProjetoService
    constructor() {
        this.service = new ProjetoService()
    }

    async listar(req: Request, res: Response) {
        try {
            const { page, limit, sort } = req.query;

            const opcoesPaginacao = {
                page: page as string,
                limit: limit as string,
                sort: sort ? JSON.parse(sort as string) : undefined
            };

            const resultado = await this.service.listar(opcoesPaginacao)
            res.status(200).json({
                message: 'Projetos listados com sucesso',
                data: resultado.docs,
                pagination: {
                    total: resultado.totalDocs,
                    page: resultado.page,
                    limit: resultado.limit,
                    totalPages: resultado.totalPages,
                    hasNextPage: resultado.hasNextPage,
                    hasPrevPage: resultado.hasPrevPage
                }
            })
        } catch (error: any) {
            console.error('[projetosController] Erro ao listar projetos:', error)

            res.status(500).json({
                message: 'Erro ao listar projetos',
                error: error.message
            })
        }
    }

    async criar(req: Request, res: Response) {
        try {
            const { nome, periodoDuracao, dataLimiteInscricao, instituicaoCliente, coordenador } = req.body

            if (!nome || !periodoDuracao || !dataLimiteInscricao || !instituicaoCliente || !coordenador) {
                return res.status(400).json({
                    message: 'Todos os campos são obrigatórios',
                    error: 'Campos faltando...'
                })
            }

            const dados: IProjeto = {
                nome,
                periodoDuracao,
                dataLimiteInscricao,
                instituicaoCliente,
                coordenador
            }

            const projeto = await this.service.criar(dados)

            res.status(201).json({
                message: 'Projeto criado com sucesso',
                data: projeto
            })
        } catch (error: any) {
            console.error('[projetosController] Erro ao criar projeto:', error)

            res.status(500).json({
                message: 'Erro ao criar projeto',
                error: error.message
            })
        }
    }

    async editar(req: Request, res: Response) {
        try {
            const { id } = req.params
            const dados: Partial<IProjeto> = req.body

            const projetoAtualizado = await this.service.editar(id, dados)

            if (!projetoAtualizado) {
                return res.status(404).json({
                    message: 'Projeto não encontrado',
                    error: 'ID inválido'
                })
            }

            res.status(200).json({
                message: 'Projeto atualizado com sucesso',
                data: projetoAtualizado
            })
        } catch (error: any) {
            console.error('[projetosController] Erro ao editar projeto:', error)

            res.status(500).json({
                message: 'Erro ao editar projeto',
                error: error.message
            })
        }
    }

    async deletar(req: Request, res: Response) {
        try {
            const { id } = req.params

            await this.service.deletar(id)

            res.status(200).json({
                message: 'Projeto deletado com sucesso'
            })
        } catch (error: any) {
            console.error('[projetosController] Erro ao deletar projeto:', error)

            res.status(500).json({
                message: 'Erro ao deletar projeto',
                error: error.message
            })
        }
    }
}

export default ProjetoController