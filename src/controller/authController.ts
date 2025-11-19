import AuthService from "../service/authService";
import { IUsuario } from "../interface/models";
import { Request, Response } from "express";
import { AuthRequest } from "../middleware/authMiddleware";

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

    async logout(req: AuthRequest, res: Response) {
        try {
            if (!req.user?.id) {
                return res.status(401).json({
                    message: 'Usuário não autenticado',
                    error: 'ID do usuário não encontrado'
                })
            }

            const resultado = await this.service.logout(req.user.id)

            res.status(200).json(resultado)
        } catch (error: any) {
            console.error('[authController] Erro ao fazer logout:', error)
            res.status(500).json({
                message: 'Erro ao fazer logout',
                error: error.message
            })
        }
    }

    async invalidarToken(req: Request, res: Response) {
        const { token } = req.body

        if (!token) {
            return res.status(400).json({
                message: 'Token é obrigatório',
                error: 'Campo token faltando'
            })
        }

        try {
            const resultado = await this.service.invalidarToken(token)

            res.status(200).json(resultado)
        } catch (error: any) {
            console.error('[authController] Erro ao invalidar token:', error)
            res.status(500).json({
                message: 'Erro ao invalidar token',
                error: error.message
            })
        }
    }
}

export default AuthController