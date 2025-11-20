import express from 'express'
import CandidatoController from '../controller/candidatoController'
import { checkRole } from '../middleware/roleMiddleware'

const candidatoRouter = express.Router()
const candidatoController = new CandidatoController()

candidatoRouter
    .get('/',
        // #swagger.tags = ['Candidato']
        // #swagger.summary = 'Listar todos os candidatos (com filtros opcionais)'
        // #swagger.description = 'Retorna lista de candidatos com opção de filtrar por nome, email, estudante, status de inscrição e avaliação'
        // #swagger.security = [{ "bearerAuth": [] }]
        /* #swagger.parameters['nome'] = {
            in: 'query',
            description: 'Filtrar por nome (busca parcial)',
            required: false,
            type: 'string'
        } */
        /* #swagger.parameters['email'] = {
            in: 'query',
            description: 'Filtrar por email (busca parcial)',
            required: false,
            type: 'string'
        } */
        /* #swagger.parameters['estudante'] = {
            in: 'query',
            description: 'Filtrar por estudante (true/false)',
            required: false,
            type: 'boolean'
        } */
        /* #swagger.parameters['statusInscricao'] = {
            in: 'query',
            description: 'Filtrar por status da inscrição',
            required: false,
            schema: {
                '@enum': ['Pendente', 'Aprovado', 'Rejeitado']
            }
        } */
        /* #swagger.parameters['minAvaliacao'] = {
            in: 'query',
            description: 'Filtrar por avaliação mínima',
            required: false,
            type: 'number'
        } */
        /* #swagger.parameters['maxAvaliacao'] = {
            in: 'query',
            description: 'Filtrar por avaliação máxima',
            required: false,
            type: 'number'
        } */
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
        /* #swagger.parameters['id'] = {
            in: 'path',
            description: 'ID do candidato',
            required: true,
            type: 'string'
        } */
        /* #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: { $ref: '#/components/schemas/Candidato' }
                }
            }
        } */
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
        // #swagger.description = 'Atribui uma nota de avaliação ao candidato (0 a 10)'
        // #swagger.security = [{ "bearerAuth": [] }]
        /* #swagger.parameters['id'] = {
            in: 'path',
            description: 'ID do candidato',
            required: true,
            type: 'string'
        } */
        /* #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: { $ref: '#/components/schemas/CandidatoAvaliacao' }
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
        checkRole(['Avaliador', 'Coordenador']), candidatoController.avaliar.bind(candidatoController)
    )
    .patch('/status/:id',
        // #swagger.tags = ['Candidato']
        // #swagger.summary = 'Alterar status da inscrição'
        // #swagger.description = 'Altera o status da inscrição do candidato (Pendente, Aprovado ou Rejeitado)'
        // #swagger.security = [{ "bearerAuth": [] }]
        /* #swagger.parameters['id'] = {
            in: 'path',
            description: 'ID do candidato',
            required: true,
            type: 'string'
        } */
        /* #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: { $ref: '#/components/schemas/CandidatoStatus' }
                }
            }
        } */
        /* #swagger.responses[200] = {
            description: 'Status alterado com sucesso',
            content: {
                "application/json": {
                    example: {
                        message: 'Status da inscrição alterado com sucesso',
                        data: {
                            _id: '507f1f77bcf86cd799439011',
                            nome: 'Maria Santos',
                            email: 'maria.santos@example.com',
                            statusInscricao: 'Aprovado'
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
                        message: 'status inválido',
                        error: 'status deve ser Pendente, Aprovado ou Rejeitado'
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
                        message: 'Erro ao alterar status da inscrição',
                        error: 'Erro interno'
                    }
                }
            }
        } */
        checkRole(['Coordenador']),
        candidatoController.alterarStatus.bind(candidatoController)
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
        checkRole(['Coordenador']),
        candidatoController.deletar.bind(candidatoController)
    )

export default candidatoRouter