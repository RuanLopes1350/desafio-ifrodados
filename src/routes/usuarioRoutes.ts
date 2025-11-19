import UsuarioController from "../controller/usuarioController";
import express from 'express'

const usuarioController = new UsuarioController()
const usuarioRouter = express.Router()

usuarioRouter
    .post('/',
        // #swagger.tags = ['Usuario']
        // #swagger.summary = 'Criar novo usuário'
        usuarioController.criar.bind(usuarioController)
    )
    .get('/',
        // #swagger.tags = ['Usuario']
        // #swagger.summary = 'Listar todos os usuários'
        usuarioController.listar.bind(usuarioController)
    )
    .patch('/:id',
        // #swagger.tags = ['Usuario']
        // #swagger.summary = 'Editar usuário'
        usuarioController.editar.bind(usuarioController)
    )
    .delete('/:id',
        // #swagger.tags = ['Usuario']
        // #swagger.summary = 'Deletar usuário'
        usuarioController.deletar.bind(usuarioController)
    )

export default usuarioRouter