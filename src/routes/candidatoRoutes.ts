import express from 'express'
import CandidatoController from '../controller/candidatoController'

const candidatoRouter = express.Router()
const candidatoController = new CandidatoController()

candidatoRouter
    .get('/candidato', candidatoController.listar.bind(candidatoController))
    .post('/candidato', candidatoController.criar.bind(candidatoController))
    .patch('/candidato/:id', candidatoController.editar.bind(candidatoController))
    .delete('/candidato/:id', candidatoController.deletar.bind(candidatoController))

export default candidatoRouter