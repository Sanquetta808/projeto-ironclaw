-- IronClaw - Dados de exemplo para demonstração (todos fictícios).
-- Datas de validade/revisão são relativas a hoje, para o painel sempre mostrar alertas.
-- Execute com: npm run seed   (veja o README)

INSERT INTO frotas (prefixo, tipo, secao, km, revisao, status) VALUES
  ('VTR-001', 'Viatura de transporte de tropa', '1ª Companhia', 48200, CURRENT_DATE - 40, 'Operacional'),
  ('VTR-002', 'Viatura de transporte de tropa', '2ª Companhia', 51730, CURRENT_DATE - 95, 'Operacional'),
  ('VTR-003', 'Caminhão de carga', 'Seção de Intendência', 102400, CURRENT_DATE - 200, 'Manutenção'),
  ('VTR-004', 'Ambulância', 'Seção de Saúde', 36800, CURRENT_DATE - 30, 'Operacional'),
  ('VTR-005', 'Viatura de comando', 'Companhia de Comando', 22150, CURRENT_DATE - 60, 'Operacional'),
  ('VTR-006', 'Viatura blindada de reconhecimento', 'Esquadrão de Cavalaria', 78900, CURRENT_DATE - 150, 'Manutenção'),
  ('VTR-007', 'Caminhão-tanque', 'Seção de Intendência', 134500, CURRENT_DATE - 320, 'Baixada'),
  ('VTR-008', 'Viatura de comunicações', 'Seção de Comunicações', 19700, CURRENT_DATE - 20, 'Operacional');

INSERT INTO militares (nome, posto, secao, arma, matricula, status) VALUES
  ('Carlos Eduardo Lima', 'Cap', '1ª Companhia', 'Infantaria', 'MAT-0001', 'Ativo'),
  ('Rafael Henrique Souza', '1º Ten', '2ª Companhia', 'Infantaria', 'MAT-0002', 'Missão'),
  ('Marcos Vinícius Rocha', '2º Ten', 'Pelotão de Engenharia', 'Engenharia', 'MAT-0003', 'Ativo'),
  ('Ana Beatriz Martins', 'Cap', 'Seção de Saúde', 'Saúde', 'MAT-0004', 'Ativo'),
  ('Paulo Roberto Alves', 'Maj', 'Companhia de Comando', 'Quadro Complementar', 'MAT-0005', 'Ativo'),
  ('João Pedro Ferreira', '1º Sgt', 'Esquadrão de Cavalaria', 'Cavalaria', 'MAT-0006', 'Instrução'),
  ('Lucas Gabriel Nunes', '2º Sgt', 'Bateria de Artilharia', 'Artilharia', 'MAT-0007', 'Ativo'),
  ('Fernanda Costa Ribeiro', '3º Sgt', 'Seção de Comunicações', 'Comunicações', 'MAT-0008', 'Licença'),
  ('Thiago Moreira Dias', 'Cb', '3ª Companhia', 'Infantaria', 'MAT-0009', 'Missão'),
  ('Gustavo Lopes Barros', 'Cb', 'Seção de Intendência', 'Intendência', 'MAT-0010', 'Ativo'),
  ('Daniel Santos Pereira', 'Sd', '1ª Companhia', 'Infantaria', 'MAT-0011', 'Ativo'),
  ('Bruno Cardoso Teixeira', 'Sd', '2ª Companhia', 'Infantaria', 'MAT-0012', 'Instrução')
ON CONFLICT (matricula) DO NOTHING;

INSERT INTO medicamentos (nome, categoria, quantidade, unidade, quantidade_minima, validade) VALUES
  ('Dipirona 500 mg', 'Analgésico', 400, 'comprimidos', 100, CURRENT_DATE + 540),
  ('Paracetamol 750 mg', 'Analgésico', 35, 'comprimidos', 80, CURRENT_DATE + 300),
  ('Amoxicilina 500 mg', 'Antibiótico', 120, 'caixas', 40, CURRENT_DATE + 12),
  ('Azitromicina 500 mg', 'Antibiótico', 60, 'caixas', 20, CURRENT_DATE - 15),
  ('Loratadina 10 mg', 'Antialérgico', 150, 'comprimidos', 50, CURRENT_DATE + 410),
  ('Soro Fisiológico 0,9%', 'Soro/Solução', 80, 'frascos', 30, CURRENT_DATE + 220),
  ('Ringer com Lactato', 'Soro/Solução', 0, 'frascos', 20, CURRENT_DATE + 180),
  ('Gaze estéril', 'Material de Curativo', 500, 'unidades', 150, CURRENT_DATE + 700),
  ('Atadura de crepom', 'Material de Curativo', 90, 'unidades', 60, CURRENT_DATE + 650),
  ('Diclofenaco injetável', 'Analgésico', 25, 'ampolas', 40, CURRENT_DATE + 25);

INSERT INTO aprovisionamento (item, categoria, quantidade, unidade, quantidade_minima, secao_destino) VALUES
  ('Ração operacional', 'Alimentação', 900, 'kg', 200, 'Seção de Intendência'),
  ('Arroz', 'Alimentação', 120, 'kg', 150, 'Seção de Intendência'),
  ('Uniforme de campanha', 'Fardamento', 260, 'unidades', 80, '1ª Companhia'),
  ('Coturno', 'Fardamento', 40, 'unidades', 60, '2ª Companhia'),
  ('Barraca de campanha', 'Material de Acampamento', 30, 'unidades', 10, 'Pelotão de Engenharia'),
  ('Papel A4', 'Material de Expediente', 0, 'resmas', 20, 'Companhia de Comando'),
  ('Óleo diesel', 'Combustível', 8000, 'litros', 2000, 'Seção de Intendência'),
  ('Gasolina', 'Combustível', 1200, 'litros', 1500, 'Seção de Intendência');

INSERT INTO armamento (modelo, categoria, quantidade, local, status) VALUES
  ('Fuzil 5,56 mm', 'Fuzil', 120, 'Paiol Central', 'Disponível'),
  ('Pistola 9 mm', 'Pistola', 60, 'Paiol Central', 'Disponível'),
  ('Metralhadora leve 7,62 mm', 'Metralhadora', 8, 'Paiol de Cavalaria', 'Manutenção'),
  ('Lançador de granadas 40 mm', 'Lançador', 6, 'Paiol de Artilharia', 'Disponível'),
  ('Rádio portátil', 'Equipamento Diverso', 45, 'Seção de Comunicações', 'Disponível'),
  ('Colete balístico', 'Equipamento Diverso', 70, 'Paiol Central', 'Indisponível');
