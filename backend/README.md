# IronClaw Backend

## Setup
1. `npm install`
2. Copie `.env.example` para `.env` e ajuste os dados do banco
3. Crie o banco e rode o schema: `psql -U postgres -d ironclaw -f schema.sql`
4. `npm run dev` (ou `npm start`)

## Rotas (mesmo padrão pra cada módulo)
- `GET    /api/{modulo}`
- `GET    /api/{modulo}/:id`
- `POST   /api/{modulo}`
- `PUT    /api/{modulo}/:id`
- `DELETE /api/{modulo}/:id`

Módulos: `frotas`, `militares`, `medicamentos`, `aprovisionamento`, `armamento`

## Próximos passos
- Endpoint de missão que baixa estoque automático (medicamentos/aprovisionamento)
- Cálculo de status "Baixo/Esgotado" no backend (hoje é só no front)
- Autenticação
