import express from "express";
import ProjetoController from "../controller/projetosController";

const projetosRouter = express.Router()
const projetoController = new ProjetoController()

projetosRouter
    .post('/',
        // #swagger.tags = ['Projeto']
        // #swagger.summary = 'Criar novo projeto'
        projetoController.criar.bind(projetoController)
    )
    .get('/',
        // #swagger.tags = ['Projeto']
        // #swagger.summary = 'Listar todos os projetos'
        projetoController.listar.bind(projetoController)
    )
    .patch('/:id',
        // #swagger.tags = ['Projeto']
        // #swagger.summary = 'Editar projeto'
        projetoController.editar.bind(projetoController)
    )
    .delete('/:id',
        // #swagger.tags = ['Projeto']
        // #swagger.summary = 'Deletar projeto'
        projetoController.deletar.bind(projetoController)
    )

export default projetosRouter