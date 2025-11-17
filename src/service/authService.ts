import AuthRepository from "../repository/authRepository";
import { IUsuario } from "../interface/models";

class AuthService {
    private repository: AuthRepository
    constructor() {
        this.repository = new AuthRepository()
    }

    async encontrarPorEmail(email: string) {
        try {
            const usuario = await this.repository.encontrarPorEmail(email)
            return usuario
        } catch (error) {
            console.error('[authService] Erro ao encontrar usuário por email:', error)
            throw error
        }
    }
}

export default AuthService