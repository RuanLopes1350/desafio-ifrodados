import AuthService from "../service/authService";
import { IUsuario } from "../interface/models";
import { Request, Response } from "express";

class AuthController {
    private service: AuthService
    constructor() {
        this.service = new AuthService()
    }

    async encontrarPorEmail(req: Request, res: Response) {
        const { login, senha } = req.body

        if (!login) {
            return res.status(400).json({
                message: 'Login é obrigatório',
                error: 'Campo login faltando'
            })
        }
        if (!senha) {
            return res.status(400).json({
                message: 'Senha é obrigatória',
                error: 'Campo senha faltando'
            })
        }

        try {
            const { usuario, token } = await this.service.login(login, senha)

            res.status(200).json({
                message: 'Login realizado com sucesso',
                data: {
                    usuario: {
                        id: usuario._id,
                        nome: usuario.nome,
                        login: usuario.login,
                        funcao: usuario.funcao
                    },
                    token
                }
            })
        } catch (error: any) {
            console.error('[authController] Erro ao fazer login:', error)

            if (error.message === 'Usuário não encontrado' || error.message === 'Senha incorreta') {
                return res.status(401).json({
                    message: 'Credenciais inválidas',
                    error: error.message
                })
            }

            res.status(500).json({
                message: 'Erro ao fazer login',
                error: error.message
            })
        }
    }
}

export default AuthController