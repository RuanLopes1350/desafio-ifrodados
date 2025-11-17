import express from "express";
import ProjetoController from "../controller/projetosController";

const projetosRouter = express.Router()
const projetoController = new ProjetoController()

projetosRouter
    .post('/projetos', projetoController.criar.bind(projetoController))
    .get('/projetos', projetoController.listar.bind(projetoController))
    .patch('/projetos/:id', projetoController.editar.bind(projetoController))
    .delete('/projetos/:id', projetoController.deletar.bind(projetoController))

export default projetosRouter