import express from "express";
import ProjetoController from "../controller/projetosController";

const projetosRouter = express.Router()
const projetoController = new ProjetoController()

projetosRouter
    .post('/', projetoController.criar.bind(projetoController))
    .get('/', projetoController.listar.bind(projetoController))
    .patch('/:id', projetoController.editar.bind(projetoController))
    .delete('/:id', projetoController.deletar.bind(projetoController))

export default projetosRouter