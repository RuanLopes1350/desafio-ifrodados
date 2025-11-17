import mongoose from 'mongoose';
import { ICandidato, IProjetosAcademicosCandidato, IProjetosProfissionaisCandidato } from '../interface/models';

class Candidato {
    model: mongoose.Model<ICandidato>;
    constructor() {
        const projetosAcademicosSchema = new mongoose.Schema<IProjetosAcademicosCandidato>({
            nome: { type: String, required: true },
            descricao: { type: String, required: true },
            duracao: { type: Number, required: true },
            links: [{ type: String }]
        });

        const projetosProfissionaisSchema = new mongoose.Schema<IProjetosProfissionaisCandidato>({
            nome: { type: String, required: true },
            descricao: { type: String, required: true },
            duracao: { type: Number, required: true },
            links: [{ type: String }]
        });

        const candidatoSchema = new mongoose.Schema<ICandidato>({
            nome: { type: String, required: true },
            email: { type: String, required: true },
            projetosAcademicos: [projetosAcademicosSchema],
            estudante: { type: Boolean, required: true },
            dataCadastro: { type: Date, default: Date.now() },
            avaliacao: { type: Number, required: false }
        });
        this.model = mongoose.model('Candidato', candidatoSchema);
    }
}

export default Candidato