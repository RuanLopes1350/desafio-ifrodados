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
                login: 'john.doe@example.com',
                senha: 'SenhaSuperSegur@123'
            },
            Candidato: {
                nome: 'Maria Santos',
                email: 'maria.santos@example.com',
                estudante: true,
                dataCadastro: '2025-11-19T10:30:00.000Z',
                projetosAcademicos: [{
                    nome: 'Sistema de Gestão Escolar',
                    descricao: 'Sistema web para gerenciar matrículas',
                    duracao: 6,
                    links: ['https://github.com/user/projeto']
                }],
                projetosProfissionais: [{
                    nome: 'API de Pagamentos',
                    descricao: 'API REST para processamento de pagamentos',
                    duracao: 12,
                    links: ['https://github.com/company/api']
                }],
                avaliacao: 8.5,
                statusInscricao: 'Pendente'
            },
            Projeto: {
                nome: 'Sistema de Gestão Acadêmica',
                periodoDuracao: 12,
                dataLimiteInscricao: '2025-12-31T23:59:59.000Z',
                instituicaoCliente: 'IFRO - Instituto Federal de Rondônia',
                coordenador: 'Prof. Carlos Silva'
            },
            Usuario: {
                nome: 'Ana Costa',
                login: 'ana.costa@ifro.edu.br',
                senha: 'Senha@123',
                funcao: 'Avaliador'
            },
            CandidatoAvaliacao: {
                avaliacao: 8.5
            },
            CandidatoStatus: {
                statusInscricao: 'Aprovado'
            }
        },
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT'
            }
        }
    }
};

const outputFile = './doc/swagger-output.json';
const routes = ['./routes/index.ts']

swaggerAutogen({ openapi: '3.0.0' })(outputFile, routes, doc).then(async () => {
    await import('./server.ts');
})