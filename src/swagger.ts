import swaggerAutogen from 'swagger-autogen'

const doc = {
    info: {
        version: '1.0.0',
        title: 'API Desafio IFRO Dados',
        description: 'API para gestão de projetos, candidatos e usuários'
    },
    servers: [
        {
            url: 'http://localhost:1350/api',
            description: 'Servidor de Desenvolvimento'
        },
        {
            url: 'https://seu-dominio-producao.com/api',
            description: 'Servidor de Produção'
        }
    ],
    tags: [
        {
            name: 'Auth',
            description: 'Endpoints de autenticação'
        },
        {
            name: 'Candidato',
            description: 'Endpoints de gerenciamento de candidatos'
        },
        {
            name: 'Projeto',
            description: 'Endpoints de gerenciamento de projetos'
        },
        {
            name: 'Usuario',
            description: 'Endpoints de gerenciamento de usuários'
        }
    ],
    components: {}
};

const outputFile = './doc/swagger-output.json';
const routes = ['./routes/index.ts']

swaggerAutogen({ openapi: '3.0.0' })(outputFile, routes, doc).then(async () => {
    await import('./server.ts');
})