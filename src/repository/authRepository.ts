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
}

export default AuthRepository