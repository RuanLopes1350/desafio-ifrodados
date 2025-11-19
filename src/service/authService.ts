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

            return { usuario, token }
        } catch (error) {
            console.error('[authService] Erro ao fazer login:', error)
            throw error
        }
    }
}

export default AuthService