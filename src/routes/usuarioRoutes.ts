import UsuarioController from "../controller/usuarioController";
import express from 'express'

const usuarioController = new UsuarioController()
const usuarioRouter = express.Router()

usuarioRouter
    .post('/',
        // #swagger.tags = ['Usuario']
        // #swagger.summary = 'Criar novo usuário'
        // #swagger.security = [{ "bearerAuth": [] }]
        /* #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: { $ref: '#/components/schemas/Usuario' }
                }
            }
        } */
        /* #swagger.responses[200] = {
            description: 'Usuário criado com sucesso',
            content: {
                "application/json": {
                    example: {
                        message: 'Usuário criado com sucesso',
                        data: {
                            _id: '507f1f77bcf86cd799439011',
                            nome: 'Ana Costa',
                            login: 'ana.costa@ifro.edu.br',
                            funcao: 'AVALIADOR'
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
                        message: 'Erro ao criar usuário',
                        error: 'Erro interno'
                    }
                }
            }
        } */
        usuarioController.criar.bind(usuarioController)
    )
    .get('/',
        // #swagger.tags = ['Usuario']
        // #swagger.summary = 'Listar todos os usuários'
        // #swagger.security = [{ "bearerAuth": [] }]
        /* #swagger.responses[200] = {
            description: 'Lista de usuários retornada com sucesso',
            content: {
                "application/json": {
                    example: {
                        message: 'Usuários listados com sucesso',
                        data: [{
                            _id: '507f1f77bcf86cd799439011',
                            nome: 'Ana Costa',
                            login: 'ana.costa@ifro.edu.br',
                            funcao: 'AVALIADOR'
                        }, {
                            _id: '507f1f77bcf86cd799439012',
                            nome: 'Pedro Santos',
                            login: 'pedro.santos@ifro.edu.br',
                            funcao: 'COORDENADOR'
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
                        message: 'Erro ao listar usuários',
                        error: 'Erro interno'
                    }
                }
            }
        } */
        usuarioController.listar.bind(usuarioController)
    )
    .patch('/:id',
        // #swagger.tags = ['Usuario']
        // #swagger.summary = 'Editar usuário'
        // #swagger.security = [{ "bearerAuth": [] }]
        /* #swagger.responses[200] = {
            description: 'Usuário editado com sucesso',
            content: {
                "application/json": {
                    example: {
                        message: 'Usuário editado com sucesso',
                        data: {
                            _id: '507f1f77bcf86cd799439011',
                            nome: 'Ana Costa Silva',
                            login: 'ana.costa@ifro.edu.br',
                            funcao: 'COORDENADOR'
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
                        message: 'Erro ao editar usuário',
                        error: 'Erro interno'
                    }
                }
            }
        } */
        usuarioController.editar.bind(usuarioController)
    )
    .delete('/:id',
        // #swagger.tags = ['Usuario']
        // #swagger.summary = 'Deletar usuário'
        // #swagger.security = [{ "bearerAuth": [] }]
        /* #swagger.responses[200] = {
            description: 'Usuário deletado com sucesso',
            content: {
                "application/json": {
                    example: {
                        message: 'Usuário deletado com sucesso'
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
                        message: 'Erro ao deletar usuário',
                        error: 'Erro interno'
                    }
                }
            }
        } */
        usuarioController.deletar.bind(usuarioController)
    )

export default usuarioRouter