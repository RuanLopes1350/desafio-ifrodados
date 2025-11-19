import express from 'express'
import CandidatoController from '../controller/candidatoController'

const candidatoRouter = express.Router()
const candidatoController = new CandidatoController()

candidatoRouter
    .get('/',
        // #swagger.tags = ['Candidato']
        // #swagger.summary = 'Listar todos os candidatos'
        candidatoController.listar.bind(candidatoController)
        /* #swagger.responses[200] = {
            description: 'Lista de candidatos retornada com sucesso.',
            content: {
                "application/json": {
                    schema: {
                        $ref: '#/    
                    }
                }
            }
        */
    )
    .post('/',
        // #swagger.tags = ['Candidato']
        // #swagger.summary = 'Criar novo candidato'
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