import CandidatoService from "../service/candidatoService";
import { ICandidato } from "../interface/models";
import { Request, Response } from 'express'

class CandidatoController {
    private service
    constructor() {
        this.service = new CandidatoService()
    }

    async criar(req: Request, res: Response) {
        try {
            const { nome, email, estudante, dataCadastro, projetosAcademicos, projetosProfissionais } = req.body

            if (!nome || !email || estudante === undefined || !dataCadastro) {
                return res.status(400).json({
                    message: 'Campos obrigatórios faltando',
                    error: 'nome, email, estudante e dataCadastro são obrigatórios'
                })
            }

            const candidatoCriado: ICandidato = {
                nome,
                email,
                estudante,
                dataCadastro,
                projetosAcademicos,
                projetosProfissionais
            }

            const criado = await this.service.criar(candidatoCriado)
            res.status(201).json({
                message: 'Candidato cadastrado com sucesso',
                data: criado
            })

        } catch (error: any) {
            console.error('[candidatoController] Erro ao cadastrar candidato:', error)

            res.status(500).json({
                message: 'Erro ao cadastrar candidato',
                error: error.message
            })
        }
    }

    async listar(req: Request, res: Response) {
        try {
            const candidatos = await this.service.listar()
            res.status(200).json({
                message: 'Candidatos localizados',
                data: candidatos
            })
        } catch (error: any) {
            console.error('[candidatoController] Erro ao listar candidatos:', error)

            res.status(500).json({
                message: 'Erro ao listar candidatos',
                error: error.message
            })
        }
    }

    async editar(req: Request, res: Response) {
        try {
            const { id } = req.params
            const dadosEditar: Partial<ICandidato> = req.body

            if (!id) {
                return res.status(400).json({
                    message: 'parâmetro id não informado',
                    error: 'necessário informar o id do candidato'
                })
            }
            if (!dadosEditar || Object.keys(dadosEditar).length === 0) {
                return res.status(400).json({
                    message: 'campos a serem editados não informados',
                    error: 'necessário informar quais campos serão editados'
                })
            }

            const usuarioEditado = await this.service.editar(id, dadosEditar)
            res.status(200).json({
                message: 'Usuario editado com sucesso',
                data: usuarioEditado
            })
        } catch (error: any) {
            console.error('[candidatoController] Erro ao editar candidato:', error)

            res.status(500).json({
                message: 'Erro ao editar candidato',
                error: error.message
            })
        }
    }

    async deletar(req: Request, res: Response) {
        try {
            const { id } = req.params
            if (!id) {
                return res.status(400).json({
                    message: 'parâmetro id não informado',
                    error: 'necessário informar o id do candidato'
                })
            }

            const deletado = await this.service.deletar(id)
            res.status(200).json({
                message: 'candidato deletado com sucesso',
                data: deletado
            })
        } catch (error: any) {
            console.error('[candidatoController] Erro ao deletar candidato:', error)

            res.status(500).json({
                message: 'Erro ao deletar candidato',
                error: error.message
            })
        }
    }
}

export default CandidatoController