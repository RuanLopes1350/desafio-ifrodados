import express from 'express';
import authRouter from "./authRoutes";
import candidatoRouter from "./candidatoRoutes";
import projetosRouter from "./projetosRoutes";
import usuarioRouter from "./usuarioRoutes";

const router = express.Router();

router.use('/auth', authRouter);
router.use('/candidato', candidatoRouter);
router.use('/projetos', projetosRouter);
router.use('/usuarios', usuarioRouter);

export default router;