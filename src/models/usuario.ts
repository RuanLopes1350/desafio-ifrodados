import mongoose from "mongoose";
import { IUsuario, FuncaoUsuario } from "../interface/models";

class Usuario {
    model: mongoose.Model<IUsuario>
    constructor() {
        const usuarioSchema = new mongoose.Schema<IUsuario>({
            login: { type: String, required: true, unique: true },
            senha: { type: String, required: true },
            nome: { type: String, required: true },
            funcao: { type: String, required: true, enum: FuncaoUsuario },
        });
        this.model = mongoose.models.Usuario || mongoose.model('Usuario', usuarioSchema)
    }
}

export default Usuario