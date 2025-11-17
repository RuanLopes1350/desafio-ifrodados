import mongoose from "mongoose";
import { IAvaliador } from "../interface/models";

class Avaliador {
    model: mongoose.Model<IAvaliador>
    constructor() {
        const avaliadorSchema = new mongoose.Schema({
            login: { type: String, required: true, unique: true },
            senha: { type: String, required: true },
            nome: { type: String, required: true },
            funcao: { type: String, required: true },
        });
        this.model = mongoose.model('Avaliador', avaliadorSchema)
    }
}

export default Avaliador