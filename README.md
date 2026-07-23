# Gerenciando Contas App

Sistema Full Stack para gerenciamento de despesas pessoais desenvolvido com Next.js, React, TypeScript, Prisma e PostgreSQL.

A aplicação permite gerenciar despesas pessoais, acompanhar pagamentos, visualizar relatórios financeiros e analisar gastos através de um dashboard interativo e responsivo.

---

# Preview

## Login

![Tela de Login](./screenshots/login.png)

## Dashboard

![Dashboard principal](./screenshots/dashboard.png)

![Dashboard financeiro](./screenshots/dashboard-2.png)

## Cadastro de despesa

![Nova despesa](./screenshots/nova-despesa.png)

## Edição e exclusão de despesa

![Editar e excluir despesa](./screenshots/editar-excluir-despesa.png)

## Atualização de status

![Atualizar status da despesa](./screenshots/atualizar-status.png)

---

# Tecnologias Utilizadas

- Next.js 16 (App Router)
- React
- TypeScript
- Prisma ORM
- PostgreSQL
- JWT para gerenciamento de sessão e autenticação
- bcrypt para criptografia de senhas
- React Hook Form
- Tailwind CSS
- Recharts
- Sonner

---

# Funcionalidades

## Autenticação

- Cadastro de usuários
- Login com email e senha
- Senhas protegidas utilizando bcrypt
- Autenticação baseada em JWT
- Controle de acesso às páginas protegidas

---

## Gerenciamento de Despesas

- Cadastro de despesas
- Edição de despesas
- Exclusão de despesas
- Seleção de categorias disponíveis durante o cadastro da despesa
- Associação de despesas com categorias
- Controle de status de pagamento:
  - Pago
  - Pendente
- Armazenamento dos dados em PostgreSQL
- Validação dos formulários

---

## Dashboard Financeiro

- Resumo geral das despesas
- Resumo mensal
- Resumo por categoria
- Análise financeira por período
- Total geral de despesas
- Total pago
- Valores pendentes
- Quantidade de contas cadastradas
- Contas vencidas
- Percentual de despesas pagas
- Visualização de gastos por categoria
- Gráfico financeiro utilizando Recharts
- Insights financeiros
- Próximos vencimentos
- Últimas despesas cadastradas

---

# Interface

- Layout responsivo para desktop e dispositivos móveis
- Sidebar dinâmica baseada nas categorias utilizadas
- Navegação por resumo geral e categorias específicas
- Componentes reutilizáveis
- Formulários responsivos
- Feedback visual através de notificações utilizando Sonner

---

# Estrutura do Banco de Dados

## User

| Campo | Tipo |
|---|---|
| id | Int |
| usuario | String |
| email | String |
| senha | String |
| createdAt | DateTime |

---

## Categoria

| Campo | Tipo |
|---|---|
| id | Int |
| nome | String |
| createdAt | DateTime |

---

## Despesa

| Campo | Tipo |
|---|---|
| id | Int |
| nome | String |
| valor | Decimal |
| data | DateTime |
| descricao | String |
| pago | Boolean |
| categoriaId | Int |

---

# Configuração

Crie um arquivo `.env` na raiz do projeto:

```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/database"
JWT_SECRET="sua_chave_secreta"