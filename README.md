# Gerenciando Contas App

Sistema Full Stack para gerenciamento de despesas pessoais desenvolvido com Next.js, React, TypeScript, Prisma e PostgreSQL.

## Tecnologias Utilizadas

- Next.js 16 (App Router)
- React
- TypeScript
- Prisma ORM
- PostgreSQL
- NextAuth
- bcrypt
- React Hook Form
- Tailwind CSS

## Funcionalidades

### Autenticação

- Cadastro de usuários
- Login com email e senha
- Senhas armazenadas com criptografia (bcrypt)
- Controle de acesso às páginas protegidas

### Gerenciamento de Despesas

- Cadastro de despesas
- Cadastro de categorias
- Associação de despesas a categorias
- Armazenamento em banco PostgreSQL
- Dashboard dinâmico alimentado pelo banco de dados

### Dashboard

- Exibição das categorias cadastradas
- Exibição das despesas por categoria
- Visualização dos detalhes da despesa
- Cálculo do valor total das despesas
- Interface responsiva

## Estrutura do Banco de Dados

### User

| Campo | Tipo |
|---------|---------|
| id | Int |
| usuario | String |
| email | String |
| senha | String |
| createdAt | DateTime |

### Categoria

| Campo | Tipo |
|---------|---------|
| id | Int |
| nome | String |
| createdAt | DateTime |

### Despesa

| Campo | Tipo |
|---------|---------|
| id | Int |
| nome | String |
| valor | Decimal |
| data | DateTime |
| descricao | String |
| categoriaId | Int |

## Configuração

Crie um arquivo `.env`:

```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/database"
JWT_SECRET="sua_chave_secreta"
NEXTAUTH_SECRET="sua_chave_nextauth"
```

## Instalação

```bash
npm install
```

Gerar cliente Prisma:

```bash
npx prisma generate
```

Criar tabelas:

```bash
npx prisma db push
```

## Executar Projeto

```bash
npm run dev
```

Aplicação disponível em:

```txt
http://localhost:3000
```

## Build de Produção

```bash
npm run build
npm run start
```

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Próximas Melhorias

- Edição de despesas
- Exclusão de despesas
- Filtros por categoria
- Relatórios financeiros
- Gráficos de gastos
- Dashboard avançado

## Autor

Jessica Lyra

Desenvolvedora Web Full Stack