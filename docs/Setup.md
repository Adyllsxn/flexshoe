# 🔧 Setup - FlexShoe

[![GitHub](https://img.shields.io/badge/github-flexshoe-181717?style=flat&logo=github)](https://github.com/Adyllsxn/flexshoe)
[![NestJS](https://img.shields.io/badge/NestJS-11.0-E0234E?style=flat&logo=nestjs)](https://nestjs.com/)
[![Next.js](https://img.shields.io/badge/Next.js-15.0-000000?style=flat&logo=next.js)](https://nextjs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-4169E1?style=flat&logo=postgresql)](https://www.postgresql.org/)
[![Prisma](https://img.shields.io/badge/Prisma-7.8-2D3748?style=flat&logo=prisma)](https://www.prisma.io/)
[![Docker](https://img.shields.io/badge/Docker-28.0-2496ED?style=flat&logo=docker)](https://www.docker.com/)

---

## 📋 Pré-requisitos

- [Node.js 20+](https://nodejs.org/)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)
- [Docker](https://www.docker.com/) e [Docker Compose](https://docs.docker.com/compose/) (opcional, mas recomendado)
- [Git](https://git-scm.com/)

---

## 🚀 Instalação Rápida (Recomendado)

### 1. Clonar o repositório

```bash
git clone https://github.com/Adyllsxn/flexshoe.git
cd flexshoe
```

### 2. Subir com Docker Compose
```bash
cd src/orchestration
docker-compose up -d
```
> ⚠️ O Docker Compose já:

- Sobe PostgreSQL
- Roda as migrations
- Executa o seed
- Inicia backend e frontend

### 3. Acessar a aplicação
- Frontend: http://localhost:3000 
- Backend API: http://localhost:3001
- Swagger Docs: http://localhost:3001/api-docs

---

## 🛠️ Instalação Manual

### 1. Clonar o repositório
```bash
git clone https://github.com/Adyllsxn/flexshoe.git
cd flexshoe
```

### 2. Configurar o Banco de Dados

#### 2.1. Opção A: Usando Docker (Recomendado)
> Subir PostgreSQL
```bash
cd src/orchestration
docker-compose up -d postgres
```

#### 2.2. Opção B: PostgreSQL Local
```bash
CREATE DATABASE db_flexshoe;
CREATE USER flexshoe_user WITH PASSWORD 'sua_senha';
GRANT ALL PRIVILEGES ON DATABASE db_flexshoe TO flexshoe_user;
```

### 3. Configurar variáveis de ambiente
> Crie o arquivo .env na pasta src/apps/backend

```bash
# DATABASE
DATABASE_URL="postgresql://postgres:SEUSERVIDOR@localhost:5432/db_flexshoe"

# JWT
JWT_SECRET=flexshoe_super_secret_key_2026_change_in_production

# App
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

### 4. Configurar e rodar o Backend (NestJS)

> cd src/apps/backend

#### 4.1. Instalar dependências
```bash
npm install
```

#### 4.2. Gerar Prisma Client
```bash
npx prisma generate
```

#### 4.3. Rodar migrations
```bash
npx prisma migrate dev --name init
```

#### 4.4. Rodar seed (cria admin, store e marcas)
```bash
npx prisma db seed
```

#### 4.5. Iniciar o servidor
```bash
npm run start:dev
```
> O backend estará rodando em: http://localhost:3001


### 5. Configurar e rodar o Frontend (Next.js)
> cd src/apps/frontend

#### 5.1. Instalar dependências
```bash
npm install
```

#### 5.2. Configurar variáveis de ambiente (opcional)
```bash
echo "NEXT_PUBLIC_API_URL=http://localhost:3001" > .env.local
```

#### 5.3. Iniciar o servidor de desenvolvimento
```bash
npm run dev
```
> O frontend estará rodando em: http://localhost:3000

---

## 🔐 Credenciais de Acesso (Após o Seed)
### Admin
- Email: admin@flexshoe.ao
- Senha: admin123


