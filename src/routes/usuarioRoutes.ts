import UsuarioController from "../controller/usuarioController";
import express from 'express'

const usuarioController = new UsuarioController()
const usuarioRouter = express.Router()

usuarioRouter
    .get('/', usuarioController.criar.bind(usuarioController))


export default usuarioRouter