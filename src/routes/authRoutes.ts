import AuthController from "../controller/authController";
import express from "express";
import { authMiddleware } from "../middleware/authMiddleware";

const authRouter = express.Router()
const authController = new AuthController()

authRouter
    .post('/login',
        // #swagger.tags = ['Auth']
        // #swagger.summary = 'Fazer login'
        /* #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: { $ref: '#/components/schemas/Login' }
                }
            }
        } */
        /* #swagger.responses[200] = {
            description: 'Login realizado com sucesso',
            content: {
                "application/json": {
                    example: {
                        message: 'Login realizado com sucesso',
                        data: {
                            usuario: {
                                id: '507f1f77bcf86cd799439011',
                                nome: 'João Silva',
                                login: 'joao.silva@example.com',
                                funcao: 'COORDENADOR'
                            },
                            token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
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
                        message: 'Login é obrigatório',
                        error: 'Campo login faltando'
                    }
                }
            }
        } */
        /* #swagger.responses[401] = {
            description: 'Credenciais inválidas',
            content: {
                "application/json": {
                    example: {
                        message: 'Credenciais inválidas',
                        error: 'Usuário não encontrado'
                    }
                }
            }
        } */
        /* #swagger.responses[500] = {
            description: 'Erro interno do servidor',
            content: {
                "application/json": {
                    example: {
                        message: 'Erro ao fazer login',
                        error: 'Erro interno'
                    }
                }
            }
        } */
        authController.encontrarPorEmail.bind(authController)
    )
    .post('/logout',
        // #swagger.tags = ['Auth']
        // #swagger.summary = 'Fazer logout'
        // #swagger.security = [{ bearerAuth: [] }]
        /* #swagger.responses[200] = {
            description: 'Logout realizado com sucesso',
            content: {
                "application/json": {
                    example: {
                        message: 'Logout realizado com sucesso'
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
                        message: 'Erro ao fazer logout',
                        error: 'Erro interno'
                    }
                }
            }
        } */
        authMiddleware,
        authController.logout.bind(authController)
    )
    .post('/invalidar',
        // #swagger.tags = ['Auth']
        // #swagger.summary = 'Invalidar token'
        /* #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        type: 'object',
                        properties: {
                            token: { type: 'string', description: 'Token a ser invalidado' }
                        }
                    }
                }
            }
        } */
        /* #swagger.responses[200] = {
            description: 'Token invalidado com sucesso',
            content: {
                "application/json": {
                    example: {
                        message: 'Token invalidado com sucesso'
                    }
                }
            }
        } */
        /* #swagger.responses[400] = {
            description: 'Dados inválidos',
            content: {
                "application/json": {
                    example: {
                        message: 'Token é obrigatório',
                        error: 'Campo token faltando'
                    }
                }
            }
        } */
        /* #swagger.responses[500] = {
            description: 'Erro interno do servidor',
            content: {
                "application/json": {
                    example: {
                        message: 'Erro ao invalidar token',
                        error: 'Erro interno'
                    }
                }
            }
        } */
        authController.invalidarToken.bind(authController)
    )

export default authRouter