import UsuarioService from "../service/usuarioService";
import { Request, Response } from "express";
import { IUsuario } from "../interface/models";

class UsuarioController {
    private service
    constructor() {
        this.service = new UsuarioService()
    }

    async criar(req: Request, res: Response) {
        try {
            const { nome, login, senha, funcao } = req.body
            if (!req.body.nome || !req.body.login || req.body.senha || req.body.funcao) {
                return res.status(400).json({
                    message: 'Todos os campos são obrigatórios',
                    error: 'Campos faltando...'
                })
            }

            const usuarioDados: IUsuario = {
                nome: nome,
                login: login,
                senha: senha,
                funcao: funcao
            }

            const usuarioCriado = await this.service.criar(usuarioDados)

            res.status(201).json({
                message: 'Usuário criado com sucesso',
                data: usuarioCriado
            })
        } catch (error: any) {
            console.error('[usuarioController] Erro ao criar usuário:', error)

            res.status(500).json({
                message: 'Erro ao criar usuário',
                error: error.message
            })
        }
    }
}

export default UsuarioController