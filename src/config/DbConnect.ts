import dotenv from 'dotenv';
import mongoose, { mongo } from 'mongoose';

dotenv.config();

class DbConnect {
    static async conectar() {
        try {
            let dbUrl = process.env.DB_URL;
            if (!dbUrl) {
                throw new Error("A variável de ambiente DB_URL não está definida.")
            }

            mongoose.connection.on('connected', () => {
                console.log(`Conectado com sucesso ao banco de dados em ${dbUrl}`)
            });

            mongoose.connection.on('error', (err) => {
                console.error(`Erro ao se conectar ao banco de dados: ${err}`)
            });

            mongoose.connection.on('disconnected', () => {
                console.log('Conexão com o banco de dados encerrada com sucesso!')
            });

            mongoose.connection.on('', () => {})

            await mongoose.connect(dbUrl).then( () =>
                console.log('Conexão com o banco de dados bem sucedida!')
            )

        } catch (erro) {
            console.error('Erro ao conectar ao banco!')
            throw erro;
        }
    }

    static async desconectar() {
        try {
            await mongoose.disconnect();
            console.log('Conexão com o banco de dados encerrada sem erros!')
        } catch (erro) {
            console.error('Erro ao desconectar do banco!')
            throw erro;
        }
    }
}

export default DbConnect;