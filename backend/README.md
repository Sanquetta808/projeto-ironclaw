# IronClaw Backend

API REST (Node.js + Express + PostgreSQL) do IronClaw. A explicação completa de instalação e uso está no [README da raiz](../README.md).

## Setup
1. `npm install`
2. Copie `.env.example` para `.env` e ajuste os dados do banco (inclua a senha em `DB_PASSWORD`)
3. Crie o banco `ironclaw` no PostgreSQL e depois as tabelas: `npm run db:init`
   (ou, com o psql: `psql -U postgres -d ironclaw -f schema.sql`)
4. (Opcional) Dados de exemplo: `npm run seed`  — use `npm run seed -- --limpar` para apagar tudo e recarregar
5. `npm run dev` (ou `npm start`)

## Scripts
| Comando | O que faz |
|---|---|
| `npm run dev` | Inicia a API com reinício automático (nodemon) |
| `npm start` | Inicia a API |
| `npm run db:init` | Cria as tabelas, se ainda não existirem |
| `npm run seed` | Insere dados de exemplo (não sobrescreve dados existentes) |

## Endereços
- Saúde da API e do banco: `GET /health`
- Documentação Swagger: `/api-docs` (JSON em `/api-docs.json`)

## Rotas (mesmo padrão pra cada módulo)
- `GET    /api/{modulo}`
- `GET    /api/{modulo}/:id`
- `POST   /api/{modulo}`
- `PUT    /api/{modulo}/:id` (altera só os campos enviados)
- `DELETE /api/{modulo}/:id`

Módulos: `frotas`, `militares`, `medicamentos`, `aprovisionamento`, `armamento`

Erros: `{ "erro": "mensagem" }` com status 400, 404, 409 ou 503.

## Próximos passos
- Endpoint de missão que baixa estoque automático (medicamentos/aprovisionamento)
- Cálculo de status "Baixo/Esgotado" no backend (hoje é só no front)
- Autenticação
- Testes automatizados e CI
