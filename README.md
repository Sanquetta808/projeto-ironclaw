# IronClaw — Sistema de Gestão Operacional

Projeto Integrador do curso de Análise e Desenvolvimento de Sistemas (ADS) — IMEPAC, Araguari.

O **IronClaw** é uma aplicação web de gestão de recursos e controle operacional com temática militar. Ele centraliza o cadastro e o acompanhamento de efetivo, frota, medicamentos, suprimentos e armamento, e mostra um painel com indicadores e alertas (estoque baixo, medicamento vencido, viatura em manutenção etc.).

## Equipe

| Integrante | Papel |
|---|---|
| Victor Hugo Sanqueta | Front-end e UX |
| João Gabriel | Back-End |
| Luis Felipe | Scrum |
| Gustavo Henrique Martins | Q.A e P.O |

## Funcionalidades

- **Painel:** indicadores gerais (efetivo, viaturas operacionais, armamento em reserva) e lista de alertas ativos.
- **CRUD completo** (criar, listar, editar, excluir) de cinco módulos:
  - Frotas
  - Militares
  - Medicamentos
  - Aprovisionamento
  - Armamento
- Busca por texto e filtro por categoria/seção em cada módulo.
- Situação calculada automaticamente (ex.: medicamento *Vencido*, *A vencer*, *Baixo*, *Esgotado*).
- Dados persistidos em banco PostgreSQL, acessados por uma API REST.

## Tecnologias

- **Front-end:** HTML5, CSS3 e JavaScript puro (arquivo `ironclaw front.html`)
- **Back-end:** Node.js + Express (API REST)
- **Banco de dados:** PostgreSQL

## Estrutura do repositório

```
projeto-ironclaw/
├── backend/
│   ├── routes/            # rotas da API de cada módulo
│   ├── db.js              # conexão com o PostgreSQL
│   ├── server.js          # servidor Express
│   ├── schema.sql         # criação das tabelas
│   ├── .env.example       # modelo das variáveis de ambiente
│   └── package.json
├── ironclaw front.html    # interface da aplicação
└── README.md
```

## Como executar

### Pré-requisitos

- [Git](https://git-scm.com)
- [Node.js](https://nodejs.org) (versão LTS)
- [PostgreSQL](https://www.postgresql.org/download/), instalado e em execução

### 1. Baixar o projeto

```bash
git clone https://github.com/Sanquetta808/projeto-ironclaw.git
cd projeto-ironclaw
git checkout backend-joao
```

### 2. Criar o banco de dados

```bash
psql -U postgres -c "CREATE DATABASE ironclaw;"
psql -U postgres -d ironclaw -f backend/schema.sql
```

### 3. Configurar o back-end

```bash
cd backend
copy .env.example .env      # no Linux/Mac: cp .env.example .env
```

Abra o arquivo `.env` e preencha com os dados do seu PostgreSQL (usuário, senha, nome do banco `ironclaw` e porta). Esse arquivo não é versionado.

Instale as dependências:

```bash
npm install
```

### 4. Iniciar o servidor

Dentro da pasta `backend`:

```bash
npm run dev
```

Se tudo estiver certo, o terminal exibe:

```
IronClaw API rodando na porta 3000
```

Mantenha esse terminal aberto.

### 5. Acessar a aplicação

Com o servidor rodando, abra o arquivo **`ironclaw front.html`** no navegador (dois cliques no arquivo, ou `start "ironclaw front.html"` no terminal, na raiz do projeto).

> **Acesso:** nesta versão **não há tela de login**. A aplicação abre diretamente no Painel. Autenticação e perfis de usuário fazem parte das próximas etapas.

O banco começa vazio: use o botão **Adicionar registro** em cada módulo para cadastrar os dados.

## API

URL base: `http://localhost:3000/api`

Os cinco módulos seguem o mesmo padrão. Troque `:modulo` por `frotas`, `militares`, `medicamentos`, `aprovisionamento` ou `armamento`.

| Método | Rota | Ação |
|---|---|---|
| GET | `/api/:modulo` | Lista todos os registros |
| POST | `/api/:modulo` | Cria um registro |
| PUT | `/api/:modulo/:id` | Atualiza um registro |
| DELETE | `/api/:modulo/:id` | Remove um registro |

## Solução de problemas

| Sintoma | Causa provável | Solução |
|---|---|---|
| `npm error ENOENT ... package.json` | Comando executado fora de `backend/` | Entre em `backend/` e rode `npm install` |
| Front exibe "Não foi possível conectar à API" | Servidor não está rodando | Rode `npm run dev` em `backend/` |
| Servidor não sobe / erro de banco | `.env` ausente ou incorreto, ou PostgreSQL parado | Revise o `.env` e inicie o serviço do PostgreSQL |
| Painel com todos os valores em `0` | Tabelas vazias | Cadastre registros pela interface |
| Alteração no front não aparece | Cache do navegador | `Ctrl + F5` |

## Próximas etapas

- Autenticação e perfis de acesso
- Módulo de missões com baixa automática de estoque
- Alocação de esquadrões e operadores
- Mapa interativo com rotas
- Relatórios em PDF e gráficos
