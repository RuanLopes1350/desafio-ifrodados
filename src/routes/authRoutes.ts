import AuthController from "../controller/authController";
import express from "express";

const authRouter = express.Router()
const authController = new AuthController()

authRouter
    .post('/auth/login', authController.encontrarPorEmail.bind(authController))

export default authRouter