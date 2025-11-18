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

            if(!req.body.nome) {
                return res.status(400).json({
                    message: 'Nome é obrigatório',
                    error: 'Nome faltando...'
                })
            }

            if(!req.body.login) {
                return res.status(400).json({
                    message: 'Login é obrigatório',
                    error: 'Login faltando...'
                })
            }

            if(!req.body.senha) {
                return  res.status(400).json({
                    message: 'Senha é obrigatória',
                    error: 'Senha faltando...'
                })
            }

            if(!req.body.funcao) {
                return res.status(400).json({
                    message: 'Função é obrigatória',
                    error: 'Função faltando...'
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

    async listar(req: Request, res: Response) {
        try {
            const usuarios = await this.service.listar()

            res.status(200).json({
                message: 'Usuários encontrados',
                data: usuarios
            })
        } catch (error: any) {
            console.error('[usuarioController] Erro ao criar usuário:', error)

            res.status(500).json({
                message: 'Erro ao criar usuário',
                error: error.message
            })
        }
    }

    async editar(req: Request, res: Response) {
        try {
            const { id } = req.params
            const dadosAtualizar: Partial<IUsuario> = req.body

            if (!id) {
                res.status(204).json({
                    message: 'Necessário informar o ID do usuário como parâmetro',
                    error: 'ID deve ser informado'
                })
            }

            if (!dadosAtualizar) {
                res.status(204).json({
                    message: 'Necessário informar os dados que serão atualizados',
                    error: 'Informe o que deve ser atualizado'
                })
            }

            const usuarioAtualizado = await this.service.editar(id, dadosAtualizar)
            res.status(200).json({
                message: 'Usuário editado com sucesso!',
                data: usuarioAtualizado
            })
        } catch (error: any) {
            console.error('[usuarioController] Erro ao atualizar o usuário:', error)

            res.status(500).json({
                message: 'Erro ao atualizar usuário',
                error: error.message
            })
        }
    }

    async deletar(req: Request, res: Response) {
        try {
            const { id } = req.params

            if (!id) {
                res.status(204).json({
                    message: 'Necessário informar o ID do usuário como parâmetro',
                    error: 'ID deve ser informado'
                })
            }

            const usuarioAtualizado = await this.service.deletar(id)
            res.status(200).json({
                message: 'Usuário deletado com sucesso!',
                data: usuarioAtualizado
            })
        } catch (error: any) {
            console.error('[usuarioController] Erro ao deletar o usuário:', error)

            res.status(500).json({
                message: 'Erro ao deletar usuário',
                error: error.message
            })
        }
    }
}

export default UsuarioController