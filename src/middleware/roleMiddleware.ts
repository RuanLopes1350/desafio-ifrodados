import { Request, Response, NextFunction } from 'express';
import { AuthRequest } from './authMiddleware';

export function checkRole(rolesPermitidas: string[]) {
    return (req: AuthRequest, res: Response, next: NextFunction) => {
        const usuarioFuncao = req.user?.funcao;

        if (!usuarioFuncao || !rolesPermitidas.includes(usuarioFuncao)) {
             return res.status(403).json({
                message: 'Acesso negado',
                error: 'Você não tem permissão para realizar esta ação'
            });
        }
        next();
    };
}