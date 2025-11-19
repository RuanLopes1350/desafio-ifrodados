import UsuarioController from "../controller/usuarioController";
import express from 'express'

const usuarioController = new UsuarioController()
const usuarioRouter = express.Router()

usuarioRouter
    .post('/', usuarioController.criar.bind(usuarioController))
    .get('/', usuarioController.listar.bind(usuarioController))
    .patch('/:id', usuarioController.editar.bind(usuarioController))
    .delete('/:id', usuarioController.deletar.bind(usuarioController))

export default usuarioRouter