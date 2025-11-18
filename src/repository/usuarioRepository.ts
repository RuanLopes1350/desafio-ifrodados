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

    async listar(): Promise<IUsuario> {
        try {
            const usuarios: IUsuario | any = await this.usuarioModel.find()
            return usuarios as IUsuario
        } catch (error) {
            console.error('[usuarioRepository] Erro ao listar usuarios:', error)
            throw error
        }
    }

    async editar(id: string, dadosAtualizar: Partial<IUsuario>): Promise<Partial<IUsuario>> {
        try {
            const usuarioParaEditar: IUsuario | any = await this.usuarioModel.findByIdAndUpdate(id, dadosAtualizar)
            return usuarioParaEditar
        } catch (error) {
            console.error('[usuarioRepository] Erro ao listar usuarios:', error)
            throw error
        }
    }

    async deletar(id: string) {
        try {
            const usuarioDeletado = await this.usuarioModel.findByIdAndDelete(id)
            return usuarioDeletado
        } catch (error) {
            console.error('[usuarioRepository] Erro ao deletar usuarios:', error)
            throw error
        }
    }
}

export default UsuarioRepository