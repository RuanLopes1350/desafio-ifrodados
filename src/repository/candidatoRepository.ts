import mongoose from 'mongoose'
import Candidato from '../models/candidato'
import { ICandidato } from '../interface/models'
import { CandidatoFilter } from './filters/candidatoFilter'
import { Document } from 'mongoose'


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

    async listar(filtros: any = {}, opcoesPaginacao: any = {}) {
        try {
            const query = CandidatoFilter.build(filtros);

            const page = parseInt(opcoesPaginacao.page) || 1;
            const limit = parseInt(opcoesPaginacao.limit) || 10;
            const sort = opcoesPaginacao.sort || { dataCadastro: -1 };

            const options = {
                page,
                limit,
                sort,
                lean: true
            };

            const resultado = await (this.model as any).paginate(query, options);
            return resultado;
        } catch (error) {
            console.error('[candidatoRepository] Erro ao listar candidatos:', error)
            throw error
        }
    }

    async editar(id: string, dadosEditar: Partial<ICandidato>): Promise<Partial<ICandidato>> {
        try {
            const usuarioEditado: ICandidato | Document | null = await this.model.findByIdAndUpdate(id, dadosEditar)
            return usuarioEditado as Partial<ICandidato>
        } catch (error) {
            console.error('[candidatoRepository] Erro ao editar candidatos:', error)
            throw error
        }
    }

    async avaliar(id: string, avalicao: number): Promise<Partial<ICandidato>> {
        try {
            const candidatoAvaliado: ICandidato | Document | null = await this.model.findByIdAndUpdate(id, { avaliacao: avalicao }, { new: true })
            if (!candidatoAvaliado) {
                throw new Error('Candidato não encontrado')
            }
            return candidatoAvaliado as Partial<ICandidato>
        } catch (error) {
            console.error('[candidatoRepository] Erro ao avaliar candidatos:', error)
            throw error
        }
    }

    async alterarStatus(id: string, statusInscricao: string): Promise<Partial<ICandidato>> {
        try {
            const candidatoAtualizado: ICandidato | Document | null = await this.model.findByIdAndUpdate(id, { statusInscricao }, { new: true })
            return candidatoAtualizado as Partial<ICandidato>
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