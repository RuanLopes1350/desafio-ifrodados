import mongoose from 'mongoose'
import Candidato from '../models/candidato'
import { ICandidato } from '../interface/models'
import { CandidatoFilter } from './filters/candidatoFilter'

class CandidatoRepository {
    private model
    constructor() {
        this.model = new Candidato().model
    }

    async criar(dadosCandidato: ICandidato) {
        try {
            const candidatoCriado = await this.model.create(dadosCandidato)
            return candidatoCriado
        } catch (error) {
            console.error('[candidatoRepository] Erro ao criar candidato:', error)
            throw error
        }
    }

    async listar(filtros: any = {}): Promise<ICandidato[]> {
        try {
            // Usa o builder para gerar a query do Mongoose
            const query = CandidatoFilter.build(filtros);
            
            // Passa a query gerada para o find
            const candidatos: ICandidato | any = await this.model.find(query);
            
            return candidatos;
        } catch (error) {
            console.error('[candidatoRepository] Erro ao listar candidatos:', error)
            throw error
        }
    }

    async editar(id: string, dadosEditar: Partial<ICandidato>): Promise<Partial<ICandidato>> {
        try {
            const usuarioEditado: ICandidato | any = await this.model.findByIdAndUpdate(id, dadosEditar)
            return usuarioEditado
        } catch (error) {
            console.error('[candidatoRepository] Erro ao editar candidatos:', error)
            throw error
        }
    }

    async avaliar(id: string, avalicao: number): Promise<Partial<ICandidato>> {
        try {
            const candidatoAvaliado: ICandidato | any = await this.model.findByIdAndUpdate(id, { avaliacao: avalicao }, { new: true })
            return candidatoAvaliado
        } catch (error) {
            console.error('[candidatoRepository] Erro ao avaliar candidatos:', error)
            throw error
        }
    }

    async alterarStatus(id: string, statusInscricao: string): Promise<Partial<ICandidato>> {
        try {
            const candidatoAtualizado: ICandidato | any = await this.model.findByIdAndUpdate(id, { statusInscricao }, { new: true })
            return candidatoAtualizado
        } catch (error) {
            console.error('[candidatoRepository] Erro ao alterar status:', error)
            throw error
        }
    }

    async deletar(id: string) {
        try {
            const usuarioDeletado = await this.model.findByIdAndDelete(id)
            return usuarioDeletado
        } catch (error) {
            console.error('[candidatoRepository] Erro ao deletar candidatos:', error)
            throw error
        }
    }
}

export default CandidatoRepository