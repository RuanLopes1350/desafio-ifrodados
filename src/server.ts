import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import DbConnect from './config/DbConnect.js';
import cors from 'cors'

dotenv.config();

const username: string = process.env.ADMIN_USERNAME || 'admin';
const password: string = process.env.ADMIN_PASSWORD || 'admin123';

const app = express();
app.use(express.json());
app.use(cors({
    origin: '*'
}));

app.use('/', (req, res) => {
  res.json({ message: 'Esta é uma resposta da API Ifro Dados...' });
});

// Rota 404
app.use((req, res) => {
    res.status(404).json({ message: 'Rota não encontrada' });
});

const PORT = process.env.PORT || 3000;

async function iniciarServidor() {
    try {
        console.log('\nIniciando...\n');

        // Conecta ao MongoDB
        console.log('Conectando ao banco de dados...');
        await DbConnect.conectar();

        // Inicia o servidor
        app.listen(PORT, async () => {
            console.log(`\nServidor rodando na porta ${PORT}`);
            console.log(`API disponível em: http://localhost:${PORT}/api`);
        });
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