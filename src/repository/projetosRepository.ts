import mongoose from "mongoose";
import { IProjeto } from "../interface/models";
import Projeto from "../models/projetos";

class ProjetoRepository {
    private projetoModel: mongoose.Model<IProjeto>
    constructor() {
        this.projetoModel = new Projeto().model
    }

    async listar(opcoesPaginacao: any = {}) {
        try {
            const page = parseInt(opcoesPaginacao.page) || 1;
            const limit = parseInt(opcoesPaginacao.limit) || 10;
            const sort = opcoesPaginacao.sort || { dataLimiteInscricao: -1 };

            const options = {
                page,
                limit,
                sort,
                lean: true
            };

            const resultado = await (this.projetoModel as any).paginate({}, options);
            return resultado;
        } catch (error) {
            console.error('[projetosRepository] Erro ao listar projetos:', error)
            throw error
        }
    }

    async criar(dados: IProjeto) {
        try {
            const criado = await this.projetoModel.create(dados)
            return criado
        } catch (error) {
            console.error('[projetosRepository] Erro ao criar projeto:', error)
            throw error
        }
    }

    async editar(id: string, dados: Partial<IProjeto>) {
        try {
            const atualizado = await this.projetoModel.findByIdAndUpdate(id, dados, { new: true })
            return atualizado
        } catch (error) {
            console.error('[projetosRepository] Erro ao editar projeto:', error)
            throw error
        }
    }

    async deletar(id: string) {
        try {
            await this.projetoModel.findByIdAndDelete(id)
        } catch (error) {
            console.error('[projetosRepository] Erro ao deletar projeto:', error)
            throw error
        }
    }
}

export default ProjetoRepository