import ProjetoRepository from "../repository/projetosRepository";
import { IProjeto } from "../interface/models";

class ProjetoService {
    private repository: ProjetoRepository
    constructor() {
        this.repository = new ProjetoRepository()
    }

    async listar() {
        try {
            const projetos = await this.repository.listar()
            return projetos
        } catch (error) {
            console.error('[projetosService] Erro ao listar projetos:', error)
            throw error
        }
    }

    async criar(dados: IProjeto) {
        try {
            const criado = await this.repository.criar(dados)
            return criado
        } catch (error) {
            console.error('[projetosService] Erro ao criar projeto:', error)
            throw error
        }
    }
}

export default ProjetoService