import express from 'express'
import CandidatoController from '../controller/candidatoController'

const candidatoRouter = express.Router()
const candidatoController = new CandidatoController()

candidatoRouter
    .get('/',
        // #swagger.tags = ['Candidato']
        // #swagger.summary = 'Listar todos os candidatos'
        // #swagger.security = [{ "bearerAuth": [] }]
        candidatoController.listar.bind(candidatoController)
    )
    .post('/',
        // #swagger.tags = ['Candidato']
        // #swagger.summary = 'Criar novo candidato'
        // #swagger.security = [{ "bearerAuth": [] }]
        /* #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: { $ref: '#/components/schemas/Candidato' }
                }
            }
        } */
        candidatoController.criar.bind(candidatoController)
    )
    .patch('/:id',
        // #swagger.tags = ['Candidato']
        // #swagger.summary = 'Editar candidato'
        candidatoController.editar.bind(candidatoController)
    )
    .delete('/:id',
        // #swagger.tags = ['Candidato']
        // #swagger.summary = 'Deletar candidato'
        candidatoController.deletar.bind(candidatoController)
    )

export default candidatoRouter