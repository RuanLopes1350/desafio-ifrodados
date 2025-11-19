import express from 'express'
import CandidatoController from '../controller/candidatoController'

const candidatoRouter = express.Router()
const candidatoController = new CandidatoController()

candidatoRouter
    .get('/',
        // #swagger.tags = ['Candidato']
        // #swagger.summary = 'Listar todos os candidatos'
        // #swagger.security = [{ "bearerAuth": [] }]
        /* #swagger.responses[200] = {
            description: 'Lista de candidatos retornada com sucesso',
            content: {
                "application/json": {
                    example: {
                        message: 'Candidatos listados com sucesso',
                        data: [{
                            _id: '507f1f77bcf86cd799439011',
                            nome: 'Maria Santos',
                            email: 'maria.santos@example.com',
                            estudante: true,
                            dataCadastro: '2025-11-19T12:00:00.000Z',
                            projetosAcademicos: [{
                                nome: 'Sistema Web',
                                descricao: 'Sistema de gestão',
                                duracao: 6,
                                links: ['https://github.com/exemplo']
                            }],
                            projetosProfissionais: [],
                            avaliacao: 8.5
                        }]
                    }
                }
            }
        } */
        /* #swagger.responses[401] = {
            description: 'Não autorizado',
            content: {
                "application/json": {
                    example: {
                        message: 'Token não fornecido',
                        error: 'Autenticação necessária'
                    }
                }
            }
        } */
        /* #swagger.responses[500] = {
            description: 'Erro interno do servidor',
            content: {
                "application/json": {
                    example: {
                        message: 'Erro ao listar candidatos',
                        error: 'Erro interno'
                    }
                }
            }
        } */
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
        /* #swagger.responses[200] = {
            description: 'Candidato criado com sucesso',
            content: {
                "application/json": {
                    example: {
                        message: 'Candidato criado com sucesso',
                        data: {
                            _id: '507f1f77bcf86cd799439011',
                            nome: 'Carlos Oliveira',
                            email: 'carlos.oliveira@example.com',
                            estudante: false,
                            dataCadastro: '2025-11-19T12:00:00.000Z',
                            projetosAcademicos: [],
                            projetosProfissionais: [{
                                nome: 'Sistema ERP',
                                descricao: 'Desenvolvimento de módulo financeiro',
                                duracao: 12,
                                links: ['https://example.com/projeto']
                            }]
                        }
                    }
                }
            }
        } */
        /* #swagger.responses[400] = {
            description: 'Dados inválidos',
            content: {
                "application/json": {
                    example: {
                        message: 'Dados inválidos',
                        error: 'Campo nome é obrigatório'
                    }
                }
            }
        } */
        /* #swagger.responses[401] = {
            description: 'Não autorizado',
            content: {
                "application/json": {
                    example: {
                        message: 'Token inválido ou expirado',
                        error: 'Não autorizado'
                    }
                }
            }
        } */
        /* #swagger.responses[500] = {
            description: 'Erro interno do servidor',
            content: {
                "application/json": {
                    example: {
                        message: 'Erro ao criar candidato',
                        error: 'Erro interno'
                    }
                }
            }
        } */
        candidatoController.criar.bind(candidatoController)
    )
    .patch('/:id',
        // #swagger.tags = ['Candidato']
        // #swagger.summary = 'Editar candidato'
        // #swagger.security = [{ "bearerAuth": [] }]
        /* #swagger.responses[200] = {
            description: 'Candidato editado com sucesso',
            content: {
                "application/json": {
                    example: {
                        message: 'Candidato editado com sucesso',
                        data: {
                            _id: '507f1f77bcf86cd799439011',
                            nome: 'Maria Santos Atualizada',
                            email: 'maria.nova@example.com',
                            estudante: true,
                            avaliacao: 9.0
                        }
                    }
                }
            }
        } */
        /* #swagger.responses[400] = {
            description: 'Dados inválidos',
            content: {
                "application/json": {
                    example: {
                        message: 'ID inválido',
                        error: 'Formato de ID incorreto'
                    }
                }
            }
        } */
        /* #swagger.responses[401] = {
            description: 'Não autorizado',
            content: {
                "application/json": {
                    example: {
                        message: 'Token inválido ou expirado',
                        error: 'Não autorizado'
                    }
                }
            }
        } */
        /* #swagger.responses[500] = {
            description: 'Erro interno do servidor',
            content: {
                "application/json": {
                    example: {
                        message: 'Erro ao editar candidato',
                        error: 'Erro interno'
                    }
                }
            }
        } */
        candidatoController.editar.bind(candidatoController)
    )
    .patch('/avaliar/:id',
        // #swagger.tags = ['Candidato']
        // #swagger.summary = 'Avaliar candidato'
        // #swagger.security = [{ "bearerAuth": [] }]
        /* #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        type: 'object',
                        properties: {
                            avaliacao: { type: 'number', description: 'Nota de avaliação (0-10)', example: 8.5 }
                        }
                    }
                }
            }
        } */
        /* #swagger.responses[200] = {
            description: 'Candidato avaliado com sucesso',
            content: {
                "application/json": {
                    example: {
                        message: 'Candidato avaliado com sucesso',
                        data: {
                            _id: '507f1f77bcf86cd799439011',
                            nome: 'Maria Santos',
                            email: 'maria.santos@example.com',
                            avaliacao: 8.5
                        }
                    }
                }
            }
        } */
        /* #swagger.responses[400] = {
            description: 'Dados inválidos',
            content: {
                "application/json": {
                    example: {
                        message: 'Dados inválidos',
                        error: 'Avaliação deve ser um número entre 0 e 10'
                    }
                }
            }
        } */
        /* #swagger.responses[401] = {
            description: 'Não autorizado',
            content: {
                "application/json": {
                    example: {
                        message: 'Token inválido ou expirado',
                        error: 'Não autorizado'
                    }
                }
            }
        } */
        /* #swagger.responses[500] = {
            description: 'Erro interno do servidor',
            content: {
                "application/json": {
                    example: {
                        message: 'Erro ao avaliar candidato',
                        error: 'Erro interno'
                    }
                }
            }
        } */
        candidatoController.avaliar.bind(candidatoController)
    )
    .delete('/:id',
        // #swagger.tags = ['Candidato']
        // #swagger.summary = 'Deletar candidato'
        // #swagger.security = [{ "bearerAuth": [] }]
        /* #swagger.responses[200] = {
            description: 'Candidato deletado com sucesso',
            content: {
                "application/json": {
                    example: {
                        message: 'Candidato deletado com sucesso'
                    }
                }
            }
        } */
        /* #swagger.responses[400] = {
            description: 'Dados inválidos',
            content: {
                "application/json": {
                    example: {
                        message: 'ID inválido',
                        error: 'Formato de ID incorreto'
                    }
                }
            }
        } */
        /* #swagger.responses[401] = {
            description: 'Não autorizado',
            content: {
                "application/json": {
                    example: {
                        message: 'Token inválido ou expirado',
                        error: 'Não autorizado'
                    }
                }
            }
        } */
        /* #swagger.responses[500] = {
            description: 'Erro interno do servidor',
            content: {
                "application/json": {
                    example: {
                        message: 'Erro ao deletar candidato',
                        error: 'Erro interno'
                    }
                }
            }
        } */
        candidatoController.deletar.bind(candidatoController)
    )

export default candidatoRouter