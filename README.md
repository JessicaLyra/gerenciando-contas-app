# Gerenciando Contas App

Aplicação web em Next.js para controle de despesas com funcionalidades de login e cadastro de usuário.

## Sobre

Este projeto é um sistema simples de despesas onde o usuário pode se cadastrar, fazer login e usar uma interface para gerenciar contas.

Ele utiliza:
- Next.js (App Router)
- React
- TypeScript
- Prisma com PostgreSQL
- NextAuth (Credentials)
- bcrypt para hashing de senha
- React Hook Form

## Funcionalidades

- Cadastro de usuário com criptografia de senha
- Login com validação de email e senha
- Rotas de API para login e cadastro
- Integração com banco PostgreSQL via Prisma

## Pré-requisitos

- Node.js instalado (versão 18 ou superior recomendada)
- PostgreSQL disponível localmente ou via serviço hospedado
- Git instalado (para controle de versão)

## Configuração do ambiente

Crie um arquivo `.env.local` na raiz do projeto com pelo menos a variável:

```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/nome_do_banco"
```

> Se estiver usando um banco hospedado, ajuste a URL conforme as credenciais e host do serviço.

## Instalação

No terminal, execute:

```bash
npm install
```

Em seguida, gere o cliente Prisma (se ainda não tiver sido gerado):

```bash
npx prisma generate
```

E aplique o esquema no banco com:

```bash
npx prisma db push
```

> Se preferir, use `npx prisma migrate dev --name init` para criar uma migration.

## Executando o projeto

```bash
npm run dev
```

Acesse o app em:

```bash
http://localhost:3000
```

## Scripts úteis

- `npm run dev` — inicia o servidor de desenvolvimento
- `npm run build` — cria a versão de produção
- `npm run start` — inicia a aplicação em modo de produção
- `npm run lint` — executa o ESLint

## Estrutura principal

- `app/` — páginas e rotas do Next.js
- `components/` — componentes reutilizáveis
- `app/api/login/route.ts` — rota de login
- `app/api/cadastro/route.ts` — rota de cadastro
- `app/api/auth/[...nextauth]/route.ts` — configuração de autenticação
- `lib/prisma.ts` — conexão com o banco
- `prisma/schema.prisma` — modelo de dados do Prisma

## Observações

- O projeto já possui a lógica de cadastro e login.
- O esquema do Prisma define a tabela `User` com campos `usuario`, `email`, `senha` e `createdAt`.
- A autenticação por `next-auth` está configurada com `CredentialsProvider`.



