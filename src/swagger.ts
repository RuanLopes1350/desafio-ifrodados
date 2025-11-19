import swaggerAutogen from 'swagger-autogen'

const doc = {
    info: {
        version: '1.0.0',
        title: 'API Desafio IFRO Dados',
        description: 'API para gestão de projetos, candidatos e usuários'
    },
    securityDefinitions: {
        bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT'
        }
    },
    servers: [
        {
            url: 'http://localhost:1350/api',
            description: 'Servidor de Desenvolvimento'
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
    components: {
        schemas: {
            Login: {
                login: 'string',
                senha: 'string'
            },
            Candidato: {
                nome: 'string',
                email: 'string',
                estudante: 'boolean',
                dataCadastro: 'string',
                projetosAcademicos: {
                    nome: 'string',
                    descricao: 'string',
                    duracao: 'number',
                    links: ['string']
                },
                projetosProfissionais: {
                    nome: 'string',
                    descricao: 'string',
                    duracao: 'number',
                    links: ['string']
                },
                avaliacao: 'number'
            },
            Projeto: {
                nome: 'string',
                periodoDuracao: 'number',
                dataLimiteInscricao: 'string',
                instituicaoCliente: 'string',
                coordenador: 'string'
            },
            Usuario: {
                nome: 'string',
                login: 'string',
                senha: 'string',
                funcao: 'string'
            }
        }
    }
};

const outputFile = './doc/swagger-output.json';
const routes = ['./routes/index.ts']

swaggerAutogen({ openapi: '3.0.0' })(outputFile, routes, doc).then(async () => {
    await import('./server.ts');
})