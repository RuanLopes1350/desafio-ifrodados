import express from "express";
import ProjetoController from "../controller/projetosController";

const projetosRouter = express.Router()
const projetoController = new ProjetoController()

projetosRouter
    .post('/projetos', projetoController.criar.bind(projetoController))
    .get('/projetos', projetoController.listar.bind(projetoController))

export default projetosRouter