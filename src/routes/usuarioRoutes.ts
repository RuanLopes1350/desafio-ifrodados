import UsuarioController from "../controller/usuarioController";
import express from 'express'

const usuarioController = new UsuarioController()
const usuarioRouter = express.Router()

usuarioRouter
    .post('/usuarios', usuarioController.criar.bind(usuarioController))
    .get('/usuarios', usuarioController.listar.bind(usuarioController))
    .patch('/usuarios/:id', usuarioController.editar.bind(usuarioController))
    .delete('/usuarios/:id', usuarioController.deletar.bind(usuarioController))


export default usuarioRouter