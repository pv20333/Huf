const db = require('../models');
const TabelaRespostas = db.tabela_respostas;
const Parametros_Padrao = db.parametros_padrao;

const addRespostas = async (req, res) => {
  console.log('Corpo da requisição:', req.body);
  const { n_TabelaRespostas, n_ParametroPadrao, n_TabelaColunas, respostas } = req.body;

  if ( !n_ParametroPadrao || !n_TabelaColunas || !respostas) {
    return res.status(400).send({ message: "Campos obrigatórios estão faltando" });
  }

  try {
    const newResposta = await TabelaRespostas.create({
      n_ParametroPadrao,
      n_TabelaColunas,
      respostas
    });

    console.log('Nova resposta criada:', newResposta);
    return res.status(201).send(newResposta);
  } catch (error) {
    console.log('Erro ao adicionar respostas:', error);
    return res.status(500).send({ message: "Erro ao adicionar respostas", error });
  }
};


const createParametroPadrao = async (req, res) => {
  const { designacao } = req.body;
  const n_Versao = 1;
  const dataCriacao = new Date();

  if (!designacao) {
    return res.status(400).send({ message: "Campos obrigatórios estão faltando" });
  }

  try {
    console.log('Criando novo parâmetro padrão:', { n_Versao, dataCriacao, descricao: designacao });

    const newParametroPadrao = await Parametros_Padrao.create({
      n_Versao,
      dataCriacao,
      descricao: designacao,
    });

    console.log('Novo parâmetro padrão criado:', newParametroPadrao);

    return res.status(201).send({
      message: "Parâmetro padrão criado com sucesso",
      n_ParametroPadrao: newParametroPadrao.n_ParametroPadrao,
    });
  } catch (error) {
    console.log('Erro ao criar parâmetro padrão:', error);
    return res.status(500).send({ message: "Erro ao adicionar parâmetro padrão", error });
  }
};


module.exports = { 
  addRespostas,
  createParametroPadrao
};
