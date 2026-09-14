-- IronClaw - Schema PostgreSQL

CREATE TABLE frotas (
  id SERIAL PRIMARY KEY,
  prefixo VARCHAR(50) NOT NULL,
  tipo VARCHAR(100) NOT NULL,
  secao VARCHAR(100) NOT NULL,
  km INTEGER,
  revisao DATE,
  status VARCHAR(30) NOT NULL CHECK (status IN ('Operacional','Manutenção','Baixada'))
);

CREATE TABLE militares (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(150) NOT NULL,
  posto VARCHAR(30) NOT NULL,
  secao VARCHAR(100) NOT NULL,
  arma VARCHAR(50) NOT NULL,
  matricula VARCHAR(30) NOT NULL UNIQUE,
  status VARCHAR(30) NOT NULL CHECK (status IN ('Ativo','Missão','Instrução','Licença'))
);

CREATE TABLE medicamentos (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(150) NOT NULL,
  categoria VARCHAR(100) NOT NULL,
  quantidade INTEGER NOT NULL DEFAULT 0,
  unidade VARCHAR(30) NOT NULL,
  quantidade_minima INTEGER NOT NULL DEFAULT 0,
  validade DATE NOT NULL
);

CREATE TABLE aprovisionamento (
  id SERIAL PRIMARY KEY,
  item VARCHAR(150) NOT NULL,
  categoria VARCHAR(100) NOT NULL,
  quantidade INTEGER NOT NULL DEFAULT 0,
  unidade VARCHAR(30) NOT NULL,
  quantidade_minima INTEGER NOT NULL DEFAULT 0,
  secao_destino VARCHAR(100) NOT NULL
);

CREATE TABLE armamento (
  id SERIAL PRIMARY KEY,
  modelo VARCHAR(150) NOT NULL,
  categoria VARCHAR(100) NOT NULL,
  quantidade INTEGER NOT NULL DEFAULT 0,
  local VARCHAR(100) NOT NULL,
  status VARCHAR(30) NOT NULL CHECK (status IN ('Disponível','Manutenção','Indisponível'))
);
