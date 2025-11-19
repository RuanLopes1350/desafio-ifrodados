import AuthRepository from "../repository/authRepository";
import { IUsuario } from "../interface/models";
import jwt from 'jsonwebtoken';

class AuthService {
    private repository: AuthRepository
    constructor() {
        this.repository = new AuthRepository()
    }

    async login(email: string, senha: string) {
        try {
            const usuario = await this.repository.encontrarPorEmail(email)

            if (!usuario) {
                throw new Error('Usuário não encontrado')
            }

            if (usuario.senha !== senha) {
                throw new Error('Senha incorreta')
            }

            // Gerar token JWT
            const token = jwt.sign(
                {
                    id: usuario._id,
                    login: usuario.login,
                    nome: usuario.nome,
                    funcao: usuario.funcao
                },
                process.env.JWT_SECRET || 'secret',
                { expiresIn: '24h' }
            )

            // Salvar token no banco
            await this.repository.salvarToken(usuario._id.toString(), token)

            return { usuario, token }
        } catch (error) {
            console.error('[authService] Erro ao fazer login:', error)
            throw error
        }
    }

    async logout(userId: string) {
        try {
            await this.repository.removerToken(userId)
            return { message: 'Logout realizado com sucesso' }
        } catch (error) {
            console.error('[authService] Erro ao fazer logout:', error)
            throw error
        }
    }

    async invalidarToken(token: string) {
        try {
            await this.repository.removerTokenPorValor(token)
            return { message: 'Token invalidado com sucesso' }
        } catch (error) {
            console.error('[authService] Erro ao invalidar token:', error)
            throw error
        }
    }

    async validarToken(token: string): Promise<boolean> {
        try {
            const usuario = await this.repository.encontrarPorToken(token)
            return usuario !== null
        } catch (error) {
            console.error('[authService] Erro ao validar token:', error)
            return false
        }
    }
}

export default AuthService