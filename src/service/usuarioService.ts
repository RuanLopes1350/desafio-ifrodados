import UsuarioRepository from "../repository/usuarioRepository";
import { IUsuario } from "../interface/models";

class UsuarioService {
    private repository
    constructor() {
        this.repository = new UsuarioRepository()
    }

    async criar(usuarioData: IUsuario) {
        try {
            const usuarioCriado = await this.repository.criar(usuarioData)
            return usuarioCriado
        } catch (error) {
            console.error('[usuarioService] Erro ao criar usuario:', error)
            throw error
        }
    }

    async listar() {
        try {
            const usuarios = await this.repository.listar()
            return usuarios
        } catch (error) {
            console.error('[usuarioService] Erro ao criar usuario:', error)
            throw error
        }
    }

    async editar(id: string, dadosAtualizar: Partial<IUsuario>): Promise<Partial<IUsuario>> {
        try {
            const usuarioEditado: IUsuario | Partial<IUsuario> = await this.repository.editar(id, dadosAtualizar)
            return usuarioEditado
        } catch (error) {
            console.error('[usuarioService] Erro ao criar usuario:', error)
            throw error
        }
    }

    async deletar(id: string) {
        try {
            const usuarioDeletado = await this.repository.deletar(id)
            return usuarioDeletado
        } catch (error) {
            console.error('[usuarioService] Erro ao criar usuario:', error)
            throw error
        }
    }
}

export default UsuarioService