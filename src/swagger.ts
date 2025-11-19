import swaggerAutogen from 'swagger-autogen'

const doc = {
    info: {
        version: '',
        title: 'API Desafio',
        description: ''
    },
    servers: [
        {
            url: 'http://localhost:1350/api',
            description: ''
        },
    ],
    tags: [
        {
            name: '',
            description: ''
        },
    ],
    components: {}
};

const outputFile = './doc/swagger-output.json';
const routes = ['./routes/index.ts']

swaggerAutogen({openapi: '3.0.0'})(outputFile, routes, doc).then(async () => {
    await import('./server.ts');
})