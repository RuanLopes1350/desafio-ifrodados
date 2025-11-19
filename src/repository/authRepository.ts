import mongoose from "mongoose";
import Usuario from "../models/usuario";
import { IUsuario } from "../interface/models";

class AuthRepository {
    private usuarioModel: mongoose.Model<IUsuario>
    constructor() {
        this.usuarioModel = new Usuario().model
    }

    async encontrarPorEmail(email: string) {
        try {
            const usuario = await this.usuarioModel.findOne({ login: email })
            return usuario
        } catch (error) {
            console.error('[authRepository] Erro ao encontrar usuário por email:', error)
            throw error
        }
    }

    async salvarToken(userId: string, token: string) {
        try {
            await this.usuarioModel.findByIdAndUpdate(userId, { token })
        } catch (error) {
            console.error('[authRepository] Erro ao salvar token:', error)
            throw error
        }
    }

    async removerToken(userId: string) {
        try {
            await this.usuarioModel.findByIdAndUpdate(userId, { token: null })
        } catch (error) {
            console.error('[authRepository] Erro ao remover token:', error)
            throw error
        }
    }

    async removerTokenPorValor(token: string) {
        try {
            await this.usuarioModel.findOneAndUpdate({ token }, { token: null })
        } catch (error) {
            console.error('[authRepository] Erro ao remover token por valor:', error)
            throw error
        }
    }

    async encontrarPorToken(token: string) {
        try {
            const usuario = await this.usuarioModel.findOne({ token })
            return usuario
        } catch (error) {
            console.error('[authRepository] Erro ao encontrar usuário por token:', error)
            throw error
        }
    }
}

export default AuthRepository