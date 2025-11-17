import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import DbConnect from './config/DbConnect.js';
import cors from 'cors'
import projetosRouter from './routes/projetosRoutes.js';
import usuarioRouter from './routes/usuarioRoutes.js';
import authRouter from './routes/authRoutes.js';

dotenv.config();

const username: string = process.env.ADMIN_USERNAME || 'admin';
const password: string = process.env.ADMIN_PASSWORD || 'admin123';

const app = express();
app.use(express.json());
app.use(cors({
    origin: '*'
}));

app.use('/api', authRouter)
app.use('/api', projetosRouter)
app.use('/api', usuarioRouter)

app.get('/', (req, res) => {
    res.json({ message: 'A - Gura, Gawr (2020)' });
});

app.use((req, res) => {
    res.status(404).json({ message: 'Rota não encontrada' });
});


const PORT = process.env.PORT || 1350;

async function iniciarServidor() {
    try {
        console.log('\nIniciando...\n');

        console.log('Conectando ao banco de dados...');
        await DbConnect.conectar();

        app.listen(PORT, async () => {
            console.log(`\nServidor rodando na porta ${PORT}`);
            console.log(`API disponível em: http://localhost:${PORT}/api`);
        });

        console.log()
    } catch (error) {
        console.error('Erro ao iniciar servidor:', error);
        process.exit(1);
    }
}

process.on('SIGINT', async () => {
    console.log('Encerrando servidor...');
    await DbConnect.desconectar();
    process.exit(0);
});

process.on('SIGTERM', async () => {
    console.log('Encerrando servidor...');
    await DbConnect.desconectar();
    process.exit(0);
});

iniciarServidor();