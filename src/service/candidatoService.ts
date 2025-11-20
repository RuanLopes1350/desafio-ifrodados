import CandidatoRepository from "../repository/candidatoRepository";
import { ICandidato } from "../interface/models";

class CandidatoService {
    private repository
    constructor() {
        this.repository = new CandidatoRepository()
    }

    async criar(dadosCandidato: ICandidato) {
        try {
            // Ajustar timezone da data de cadastro (America/Manaus = UTC-4)
            if (dadosCandidato.dataCadastro) {
                const data = new Date(dadosCandidato.dataCadastro)
                const offsetMinutes = 4 * 60 // +4 horas em minutos com relação ao UTC
                dadosCandidato.dataCadastro = new Date(data.getTime() - offsetMinutes * 60 * 1000)
            }

            const candidatoCriado = await this.repository.criar(dadosCandidato)
            return candidatoCriado
        } catch (error) {
            console.error('[candatoService] Erro ao criar candidato:', error)
            throw error
        }
    }

    async listar(filtros: any) { 
        try {
            const candidatos = await this.repository.listar(filtros)
            return candidatos
        } catch (error) {
            console.error('[candatoService] Erro ao listar candidatos:', error)
            throw error
        }
    }

    async editar(id: string, dadosEditar: Partial<ICandidato>) {
        try {
            const candidatoEditado = await this.repository.editar(id, dadosEditar)
            return candidatoEditado
        } catch (error) {
            console.error('[candidatoService] Erro ao editar candidato:', error)
            throw error
        }
    }

    async avaliar(id: string, avaliacao: number) {
        try {
            const candidatoAvaliado = await this.repository.avaliar(id, avaliacao)
            return candidatoAvaliado
        } catch (error) {
            console.error('[candidatoService] Erro ao avaliar candidato:', error)
            throw error
        }
    }

    async deletar(id: string) {
        try {
            const usuarioDeletado = await this.repository.deletar(id)
            return usuarioDeletado
        } catch (error) {
            console.error('[candidatoService] Erro ao deletar candidato:', error)
            throw error
        }
    }
}

export default CandidatoService