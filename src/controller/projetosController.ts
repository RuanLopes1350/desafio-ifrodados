import ProjetoService from "../service/projetosService";
import { Request, Response } from "express";
import { IProjeto } from "../interface/models";

class ProjetoController {
    private service: ProjetoService
    constructor() {
        this.service = new ProjetoService()
    }

    async criar(req: Request, res: Response) {
        try {
            const { nome, periodoDuracao, dataLimiteInscricao, instituicaoCliente, coordenador } = req.body

            if (!nome || !periodoDuracao || !dataLimiteInscricao || !instituicaoCliente || !coordenador) {
                return res.status(400).json({
                    message: 'Todos os campos são obrigatórios',
                    error: 'Campos faltando'
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
}

export default ProjetoController