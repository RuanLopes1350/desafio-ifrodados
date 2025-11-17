import AuthService from "../service/authService";
import { IUsuario } from "../interface/models";
import { Request, Response } from "express";

class AuthController {
    private service: AuthService
    constructor() {
        this.service = new AuthService()
    }

    async encontrarPorEmail(req: Request, res: Response) {
        if (!req.body.email) {
            return res.status(400).json({
                message: 'Email é obrigatório',
                error: 'Campo email faltando'
            })
        }
        if (!req.body.senha) {
            return res.status(400).json({
                message: 'Senha é obrigatória',
                error: 'Campo senha faltando'
            })
        }

        try {
            const usuario: IUsuario | null = await this.service.encontrarPorEmail(req.body.email)

            if (!usuario) {
                return res.status(404).json({
                    message: 'Usuário não encontrado',
                    error: 'Usuário inexistente'
                })
            }

            res.status(200).json({
                message: 'Usuário encontrado com sucesso',
                data: usuario
            })
        } catch (error: any) {
            console.error('[authController] Erro ao buscar usuário por email:', error)

            res.status(500).json({
                message: 'Erro ao buscar usuário por email',
                error: error.message
            })
        }
    }
}

export default AuthController