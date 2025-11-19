import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import DbConnect from './config/DbConnect.js';
import cors from 'cors'
import router from './routes/index.js';
import swaggerUi from 'swagger-ui-express';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({
    origin: '*'
}));

// Carregar o swagger-output.json
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const swaggerDocument = JSON.parse(readFileSync(path.join(__dirname, './doc/swagger-output.json'), 'utf-8'));

// Rota da documentação Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/api', router)

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
            console.log(`Documentação Swagger disponível em: http://localhost:${PORT}/api-docs`);
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