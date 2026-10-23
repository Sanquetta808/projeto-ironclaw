// Especificação OpenAPI (Swagger) da API IronClaw.
// Os campos seguem o schema.sql. "obrigatorios" = NOT NULL sem valor padrão.

const SECOES = ['1ª Companhia', '2ª Companhia', '3ª Companhia', 'Companhia de Comando', 'Esquadrão de Cavalaria', 'Bateria de Artilharia', 'Pelotão de Engenharia', 'Seção de Comunicações', 'Seção de Saúde', 'Seção de Intendência'];

const modulos = {
  frotas: {
    tag: 'Frotas',
    singular: 'viatura',
    obrigatorios: ['prefixo', 'tipo', 'secao', 'status'],
    campos: {
      prefixo: { type: 'string', maxLength: 50, example: 'VTR-014' },
      tipo: { type: 'string', maxLength: 100, example: 'Viatura de transporte de tropa' },
      secao: { type: 'string', maxLength: 100, example: '1ª Companhia' },
      km: { type: 'integer', nullable: true, example: 15200 },
      revisao: { type: 'string', format: 'date', nullable: true, example: '2026-08-15' },
      status: { type: 'string', enum: ['Operacional', 'Manutenção', 'Baixada'], example: 'Operacional' }
    }
  },
  militares: {
    tag: 'Militares',
    singular: 'militar',
    obrigatorios: ['nome', 'posto', 'secao', 'arma', 'matricula', 'status'],
    campos: {
      nome: { type: 'string', maxLength: 150, example: 'Carlos Eduardo Lima' },
      posto: { type: 'string', maxLength: 30, example: 'Cap' },
      secao: { type: 'string', maxLength: 100, example: '2ª Companhia' },
      arma: { type: 'string', maxLength: 50, example: 'Infantaria' },
      matricula: { type: 'string', maxLength: 30, example: 'MAT-0001', description: 'Valor único' },
      status: { type: 'string', enum: ['Ativo', 'Missão', 'Instrução', 'Licença'], example: 'Ativo' }
    }
  },
  medicamentos: {
    tag: 'Medicamentos',
    singular: 'medicamento',
    obrigatorios: ['nome', 'categoria', 'unidade', 'validade'],
    campos: {
      nome: { type: 'string', maxLength: 150, example: 'Dipirona 500 mg' },
      categoria: { type: 'string', maxLength: 100, example: 'Analgésico' },
      quantidade: { type: 'integer', default: 0, example: 200 },
      unidade: { type: 'string', maxLength: 30, example: 'comprimidos' },
      quantidade_minima: { type: 'integer', default: 0, example: 50 },
      validade: { type: 'string', format: 'date', example: '2027-03-31' }
    }
  },
  aprovisionamento: {
    tag: 'Aprovisionamento',
    singular: 'item de suprimento',
    obrigatorios: ['item', 'categoria', 'unidade', 'secao_destino'],
    campos: {
      item: { type: 'string', maxLength: 150, example: 'Ração operacional' },
      categoria: { type: 'string', maxLength: 100, example: 'Alimentação' },
      quantidade: { type: 'integer', default: 0, example: 500 },
      unidade: { type: 'string', maxLength: 30, example: 'kg' },
      quantidade_minima: { type: 'integer', default: 0, example: 100 },
      secao_destino: { type: 'string', maxLength: 100, enum: SECOES, example: 'Seção de Intendência' }
    }
  },
  armamento: {
    tag: 'Armamento',
    singular: 'item de armamento',
    obrigatorios: ['modelo', 'categoria', 'local', 'status'],
    campos: {
      modelo: { type: 'string', maxLength: 150, example: 'Fuzil 5,56 mm' },
      categoria: { type: 'string', maxLength: 100, example: 'Fuzil' },
      quantidade: { type: 'integer', default: 0, example: 40 },
      local: { type: 'string', maxLength: 100, example: 'Paiol Central' },
      status: { type: 'string', enum: ['Disponível', 'Manutenção', 'Indisponível'], example: 'Disponível' }
    }
  }
};

const resposta = (descricao, schema) => ({
  description: descricao,
  content: { 'application/json': { schema } }
});
const erro = (descricao) => resposta(descricao, { $ref: '#/components/schemas/Erro' });

const idParam = {
  name: 'id', in: 'path', required: true, description: 'ID do registro',
  schema: { type: 'integer', minimum: 1 }
};

const schemas = {
  Erro: {
    type: 'object',
    properties: { erro: { type: 'string', example: 'Campo obrigatório ausente: prefixo' } }
  }
};
const paths = {
  '/health': {
    get: {
      tags: ['Sistema'],
      summary: 'Verifica se a API e o banco estão no ar',
      responses: {
        200: resposta('API e banco funcionando', {
          type: 'object',
          properties: {
            status: { type: 'string', example: 'ok' },
            banco: { type: 'string', example: 'conectado' },
            api: { type: 'string', example: 'IronClaw API' },
            uptime_segundos: { type: 'integer', example: 120 },
            timestamp: { type: 'string', format: 'date-time' }
          }
        }),
        503: erro('Banco de dados indisponível')
      }
    }
  }
};

for (const [nome, m] of Object.entries(modulos)) {
  const schemaNome = nome.charAt(0).toUpperCase() + nome.slice(1);
  schemas[schemaNome] = {
    type: 'object',
    required: m.obrigatorios,
    properties: { id: { type: 'integer', readOnly: true, example: 1 }, ...m.campos }
  };
  const ref = { $ref: `#/components/schemas/${schemaNome}` };
  const corpo = { required: true, content: { 'application/json': { schema: ref } } };

  paths[`/api/${nome}`] = {
    get: {
      tags: [m.tag], summary: `Lista todos os registros de ${nome}`,
      responses: { 200: resposta('Lista de registros', { type: 'array', items: ref }), 503: erro('Banco de dados indisponível') }
    },
    post: {
      tags: [m.tag], summary: `Cadastra ${m.singular}`,
      description: `Campos obrigatórios: ${m.obrigatorios.join(', ')}.`,
      requestBody: corpo,
      responses: { 201: resposta('Registro criado', ref), 400: erro('Dados inválidos ou campo obrigatório ausente'), 409: erro('Valor único duplicado') }
    }
  };
  paths[`/api/${nome}/{id}`] = {
    get: {
      tags: [m.tag], summary: `Busca ${m.singular} pelo ID`, parameters: [idParam],
      responses: { 200: resposta('Registro encontrado', ref), 400: erro('ID inválido'), 404: erro('Não encontrado') }
    },
    put: {
      tags: [m.tag], summary: `Atualiza ${m.singular}`,
      description: 'Altera apenas os campos enviados no corpo da requisição.',
      parameters: [idParam], requestBody: corpo,
      responses: { 200: resposta('Registro atualizado', ref), 400: erro('Dados inválidos'), 404: erro('Não encontrado'), 409: erro('Valor único duplicado') }
    },
    delete: {
      tags: [m.tag], summary: `Remove ${m.singular}`, parameters: [idParam],
      responses: {
        200: resposta('Registro removido', { type: 'object', properties: { ok: { type: 'boolean', example: true } } }),
        400: erro('ID inválido'), 404: erro('Não encontrado')
      }
    }
  };
}

module.exports = {
  openapi: '3.0.3',
  info: {
    title: 'IronClaw API',
    version: '1.0.0',
    description: 'API REST do IronClaw — Sistema de Gestão Operacional (Projeto Integrador, ADS - IMEPAC).'
  },
  servers: [{ url: 'http://localhost:3000', description: 'Ambiente local' }],
  tags: [{ name: 'Sistema' }, ...Object.values(modulos).map((m) => ({ name: m.tag }))],
  paths,
  components: { schemas }
};
