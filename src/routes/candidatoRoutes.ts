import express from 'express'
import CandidatoController from '../controller/candidatoController'

const candidatoRouter = express.Router()
const candidatoController = new CandidatoController()

candidatoRouter
    .get('/', candidatoController.listar.bind(candidatoController))
    .post('/', candidatoController.criar.bind(candidatoController))
    .patch('/:id', candidatoController.editar.bind(candidatoController))
    .delete('/:id', candidatoController.deletar.bind(candidatoController))

export default candidatoRouter