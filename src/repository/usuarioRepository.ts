import mongoose from 'mongoose';
import Usuario from '../models/usuario';
import { IUsuario } from '../interface/models';

class UsuarioRepository {
    private usuarioModel: mongoose.Model<IUsuario>;
    constructor() {
        this.usuarioModel = new Usuario().model
    }

    async criar(usuarioData: IUsuario): Promise<IUsuario> {
        try {
            const usuarioCriado = await this.usuarioModel.create(usuarioData)
            return usuarioCriado
        } catch (error) {
            console.error('[usuarioRepository] Erro ao criar usuario:', error)
            throw error
        }
    }
}

export default UsuarioRepository