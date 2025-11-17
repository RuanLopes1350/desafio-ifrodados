import mongoose from "mongoose";
import { IProjeto } from "../interface/models";
import Projeto from "../models/projetos";

class ProjetoRepository {
    private projetoModel: mongoose.Model<IProjeto>
    constructor() {
        this.projetoModel = new Projeto().model
    }

    async listar() {
        try {
            const projetos = await this.projetoModel.find()
            return projetos
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
}

export default ProjetoRepository