# Desafio IFRO Dados

Sistema de gestão de projetos e candidatos desenvolvido para o processo seletivo do Projeto IFRO Dados.

## Como executar

### 1. Clonar o projeto
```bash
git clone https://github.com/RuanLopes1350/desafio-ifrodados.git
cd desafio-ifrodados
```

### 2. Instalar as dependências
```bash
npm install
```

### 3. Configurar variáveis de ambiente
Crie um arquivo `.env` na raiz do projeto:
```env
PORT=1350
MONGO_URI=mongodb://localhost:27019/desafio-ifrodados
JWT_SECRET=sua_chave_secreta
```

### 4. Subir o banco de dados
```bash
docker-compose up -d
```

### 5. Executar o projeto
```bash
npm run dev
```

O servidor vai iniciar em `http://localhost:1350`

### 6. Popular o banco (opcional)
```bash
npm run seed
```

## Endpoints

### Autenticação
- `POST /auth/login` - Fazer login
- `POST /auth/logout` - Fazer logout
- `POST /auth/invalidar` - Invalidar token

### Usuários
- `POST /usuario` - Criar usuário
- `GET /usuario` - Listar usuários
- `PATCH /usuario/:id` - Atualizar usuário
- `DELETE /usuario/:id` - Deletar usuário

### Projetos
- `POST /projeto` - Criar projeto
- `GET /projeto` - Listar projetos
- `PATCH /projeto/:id` - Atualizar projeto
- `DELETE /projeto/:id` - Deletar projeto

### Candidatos
- `POST /candidato` - Criar candidato
- `GET /candidato` - Listar candidatos
- `PATCH /candidato/:id` - Atualizar candidato
- `PATCH /candidato/avaliar/:id` - Avaliar candidato
- `DELETE /candidato/:id` - Deletar candidato

## Decisões técnicas

### Node.js + TypeScript
Escolhi Node.js pela facilidade de desenvolver APIs REST e TypeScript para ter validação de tipos e evitar erros.

### Express
Framework simples e direto para criar APIs. Tem boa documentação e muita gente usa.

### MongoDB + Mongoose
MongoDB é bom para projetos que podem mudar os dados com o tempo. O Mongoose ajuda a definir os modelos e fazer as queries de forma mais fácil.

### JWT
Para autenticação, usei JWT porque é simples de implementar e ter experiência no uso do mesmo.

### Docker
Usei Docker para o MongoDB para facilitar a instalação. Não precisa instalar o MongoDB na máquina.

### Arquitetura em camadas
Separei o código em camadas (controller, service, repository) para organizar melhor e facilitar manutenção.

## Tecnologias

- Node.js
- TypeScript
- Express
- MongoDB
- Mongoose
- JWT
- Docker
