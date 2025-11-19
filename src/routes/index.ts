import express from 'express';
import authRouter from "./authRoutes";
import candidatoRouter from "./candidatoRoutes";
import projetosRouter from "./projetosRoutes";
import usuarioRouter from "./usuarioRoutes";
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

// Rota pública
router.use('/auth', authRouter);

// Rotas protegidas (exigem autenticação)
router.use('/candidato', authMiddleware, candidatoRouter);
router.use('/projetos', authMiddleware, projetosRouter);
router.use('/usuarios', authMiddleware, usuarioRouter);

export default router;