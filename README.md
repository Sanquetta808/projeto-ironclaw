# IronClaw — Sistema de Gestão Operacional

Aplicação web de gestão de recursos, logística e controle operacional (Projeto Integrador, ADS - IMEPAC).

- **Front-end:** HTML/CSS/JS puro (`ironclaw front.html`)
- **Back-end:** Node.js + Express (pasta `backend/`)
- **Banco de dados:** PostgreSQL (banco `ironclaw`)

## Pré-requisitos

- [Git](https://git-scm.com)
- [Node.js](https://nodejs.org) (versão LTS)
- [PostgreSQL](https://www.postgresql.org/download/) instalado e rodando
- VS Code (recomendado)

Confira as instalações:

```bash
git --version
node --version
npm --version
psql --version
```

## 1. Baixar o projeto

```bash
git clone https://github.com/Sanquetta808/projeto-ironclaw.git
cd projeto-ironclaw
```

A branch de back-end é `backend-joao`:

```bash
git checkout backend-joao
```

> Se o projeto já está no computador, **não clone de novo**. Entre na pasta e atualize (veja a seção "Atualizar o projeto").

## 2. Configurar o banco de dados

1. Crie o banco `ironclaw` no PostgreSQL:

   ```bash
   psql -U postgres -c "CREATE DATABASE ironclaw;"
   ```

2. Crie as tabelas rodando o `schema.sql`:

   ```bash
   psql -U postgres -d ironclaw -f backend/schema.sql
   ```

## 3. Configurar o back-end

Entre na pasta `backend` (o `package.json` fica **dentro dela**, não na raiz):

```bash
cd backend
```

Crie o arquivo `.env` a partir do exemplo:

```bash
copy .env.example .env
```

Abra o `.env` e preencha com os dados do **seu** PostgreSQL (usuário, senha, banco `ironclaw`, porta). O `.env` não vai para o GitHub, então cada pessoa cria o seu.

Instale as dependências:

```bash
npm install
```

## 4. Subir o back-end

Ainda dentro de `backend/`:

```bash
npm run dev
```

Deve aparecer:

```
IronClaw API rodando na porta 3000
```

**Deixe esse terminal aberto.** Para parar, `Ctrl + C`.

## 5. Abrir o front-end

Com o back rodando, abra o arquivo `ironclaw front.html`:

- dois cliques no arquivo pelo Explorer do Windows, ou
- em **outro** terminal, na pasta do projeto: `start "ironclaw front.html"`

O painel carrega os dados da API em `http://localhost:3000/api`.

## Atualizar o projeto (puxar mudanças do time)

Na pasta `projeto-ironclaw`:

```bash
git status                      # veja se há algo não salvo
git add . && git commit -m "meu progresso"
git fetch origin
git merge origin/main
cd backend && npm install       # pega dependências novas
```

Se houver conflito, o Git lista os arquivos. Abra-os no VS Code, escolha o código certo (Accept Current / Incoming / Both), depois:

```bash
git add "nome do arquivo"
git commit -m "resolve conflito"
```

Para desfazer o merge e voltar ao estado anterior: `git merge --abort`.

Para enviar seu trabalho ao GitHub:

```bash
git push origin backend-joao
```

## Problemas comuns

| Erro | Causa | Solução |
|---|---|---|
| `npm error ENOENT ... package.json` | Terminal na pasta errada | Rode `npm install` dentro de `backend/` |
| `fatal: not a git repository` | Terminal fora da pasta do projeto | `cd projeto-ironclaw` antes dos comandos git |
| Front mostra "Não foi possível conectar à API" | Back-end não está rodando | Rode `npm run dev` em `backend/` e veja o erro no terminal |
| Back não sobe / erro de conexão com banco | `.env` ausente ou errado, ou PostgreSQL desligado | Confira o `.env` e se o serviço do PostgreSQL está ativo |
| Painel abre com tudo `0` e sem erro | Banco conectado, mas tabelas vazias | Rode o `schema.sql` e cadastre registros pelo front |
| `start` não encontra o arquivo | Terminal em outra pasta | Vá até a pasta `projeto-ironclaw` e tente de novo |
| Mudança no front não aparece | Cache do navegador | `Ctrl + F5` |

## Equipe

- Victor Hugo Sanqueta — Front-end e UX
- João Gabriel — Back-End
- Luis Felipe — Scrum
- Gustavo Henrique Martins — Q.A e P.O
