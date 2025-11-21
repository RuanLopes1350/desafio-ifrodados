import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2';
import { IProjeto } from '../interface/models';

class Projeto {
    model: mongoose.Model<IProjeto>;
    constructor() {
        const projetoSchema = new mongoose.Schema({
            nome: { type: String, required: true },
            periodoDuracao: { type: Number, required: true }, // Duração em meses
            dataLimiteInscricao: { type: Date, required: true },
            instituicaoCliente: { type: String, required: true },
            coordenador: { type: String, required: true }
        })

        projetoSchema.plugin(mongoosePaginate);
        this.model = mongoose.models.Projeto || mongoose.model('Projeto', projetoSchema);
    }
}

export default Projeto