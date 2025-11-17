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
            console.error('[usuarioRepository] Erro ao criar usuario:', error)
            throw error
        }
    }
}

export default UsuarioService