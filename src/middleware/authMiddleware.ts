import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import AuthService from '../service/authService';

export interface AuthRequest extends Request {
    user?: {
        id: string;
        login: string;
        nome: string;
        funcao: string;
    };
}

export async function authMiddleware(req: AuthRequest, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({
            message: 'Token não fornecido',
            error: 'Autenticação necessária'
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret') as any;

        // Validar se o token existe no banco de dados
        const authService = new AuthService();
        const tokenValido = await authService.validarToken(token);

        if (!tokenValido) {
            return res.status(401).json({
                message: 'Token inválido ou revogado',
                error: 'Não autorizado'
            });
        }

        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            message: 'Token inválido ou expirado',
            error: 'Não autorizado'
        });
    }
}