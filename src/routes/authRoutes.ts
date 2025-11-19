import AuthController from "../controller/authController";
import express from "express";

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
        authController.encontrarPorEmail.bind(authController)
    )

export default authRouter