import express from "express";
import ProjetoController from "../controller/projetosController";

const projetosRouter = express.Router()
const projetoController = new ProjetoController()

projetosRouter
    .post('/',
        // #swagger.tags = ['Projeto']
        // #swagger.summary = 'Criar novo projeto'
        // #swagger.security = [{ "bearerAuth": [] }]
        /* #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: { $ref: '#/components/schemas/Projeto' }
                }
            }
        } */
        /* #swagger.responses[200] = {
            description: 'Projeto criado com sucesso',
            content: {
                "application/json": {
                    example: {
                        message: 'Projeto criado com sucesso',
                        data: {
                            _id: '507f1f77bcf86cd799439011',
                            nome: 'Sistema de Gestão Acadêmica',
                            periodoDuracao: 12,
                            dataLimiteInscricao: '2025-12-31T23:59:59.000Z',
                            instituicaoCliente: 'IFRO',
                            coordenador: 'Prof. Carlos Silva'
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
                        message: 'Erro ao criar projeto',
                        error: 'Erro interno'
                    }
                }
            }
        } */
        projetoController.criar.bind(projetoController)
    )
    .get('/',
        // #swagger.tags = ['Projeto']
        // #swagger.summary = 'Listar todos os projetos'
        // #swagger.security = [{ "bearerAuth": [] }]
        /* #swagger.responses[200] = {
            description: 'Lista de projetos retornada com sucesso',
            content: {
                "application/json": {
                    example: {
                        message: 'Projetos listados com sucesso',
                        data: [{
                            _id: '507f1f77bcf86cd799439011',
                            nome: 'Sistema de Gestão Acadêmica',
                            periodoDuracao: 12,
                            dataLimiteInscricao: '2025-12-31T23:59:59.000Z',
                            instituicaoCliente: 'IFRO',
                            coordenador: 'Prof. Carlos Silva'
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
                        message: 'Erro ao listar projetos',
                        error: 'Erro interno'
                    }
                }
            }
        } */
        projetoController.listar.bind(projetoController)
    )
    .patch('/:id',
        // #swagger.tags = ['Projeto']
        // #swagger.summary = 'Editar projeto'
        // #swagger.security = [{ "bearerAuth": [] }]
        /* #swagger.responses[200] = {
            description: 'Projeto editado com sucesso',
            content: {
                "application/json": {
                    example: {
                        message: 'Projeto editado com sucesso',
                        data: {
                            _id: '507f1f77bcf86cd799439011',
                            nome: 'Sistema de Gestão Atualizado',
                            periodoDuracao: 18,
                            dataLimiteInscricao: '2026-01-31T23:59:59.000Z',
                            instituicaoCliente: 'IFRO Campus Porto Velho',
                            coordenador: 'Prof. Carlos Silva'
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
                        message: 'Erro ao editar projeto',
                        error: 'Erro interno'
                    }
                }
            }
        } */
        projetoController.editar.bind(projetoController)
    )
    .delete('/:id',
        // #swagger.tags = ['Projeto']
        // #swagger.summary = 'Deletar projeto'
        // #swagger.security = [{ "bearerAuth": [] }]
        /* #swagger.responses[200] = {
            description: 'Projeto deletado com sucesso',
            content: {
                "application/json": {
                    example: {
                        message: 'Projeto deletado com sucesso'
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
                        message: 'Erro ao deletar projeto',
                        error: 'Erro interno'
                    }
                }
            }
        } */
        projetoController.deletar.bind(projetoController)
    )

export default projetosRouter