const db = require('../models');
const Parametros_Padrao = db.parametros_padrao;
const Historico_Estados = db.historico_estados;
const TabelaRespostas = db.tabela_respostas;
const TabelaColunas = db.tabela_colunas;
const TabelaGeral = db.tabela_geral;
const dbSequelize = db.Sequelize;
const Historico_Eventos = db.historico_eventos;


const addRespostas = async (req, res) => {
    console.log('Corpo da requisição:', req.body);
    const n_ParametroPadrao = req.params.id; // Buscando o n_ParametroPadrao do caminho da URL
    const { n_TabelaColunas, respostas } = req.body;
  
    if (!n_ParametroPadrao || !n_TabelaColunas || !respostas) {
      return res.status(400).send({ message: "Campos obrigatórios estão faltando" });
    }
  
    try {
      const newResposta = await TabelaRespostas.create({
        n_ParametrosPadrao: n_ParametroPadrao,
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
  const Sequelize = require("sequelize");
  async function atualizarRespostaTabela(pos, n_ParametrosPadrao, n_TabelaColunas, resposta) {
    try {
        console.log("Got: " + resposta)
      const query = `EXEC atualizarRespostaTabela @pos = ${pos}, @n_ParametrosPadrao = ${n_ParametrosPadrao}, @n_TabelaColunas = ${n_TabelaColunas}, @resposta = '${resposta}';`;
  
      await TabelaRespostas.sequelize.query(query, {
        type: Sequelize.QueryTypes.RAW,
      });
  
      console.log('Procedimento armazenado executado com sucesso!');
    } catch (error) {
      console.error('Erro ao executar o procedimento armazenado:', error);
    }
  }
  
  // Exemplo de uso
  atualizarRespostaTabela(3, 1004, 2005, 'Nova Resposta');
  
const updateRespostas = async (req, res) => {

    const { id, tabelas } = req.body;
    
    try {
        await Historico_Estados.update({ n_Estados: 1004 }, {
            where: { n_ParametroPadrao: id }
        });
    } catch (error) {
        console.error("Erro ao atualizar Historico_Estados:", error);
        return res.status(500).send({"error": "Erro ao atualizar Historico_Estados"});
    }
    
    var keyCounter = {};
    var lastKey = 0;

    for(var key in tabelas){
        console.log(key);
        if(lastKey != key){
            keyCounter = {}
            lastKey = key
        }
        //console.log(tabelas[key])
        //console.log(tabelas[key].linhas)
        for(var k in tabelas[key].linhas){
            //console.log(k)
            //console.log("---------------Start")
            //console.log(tabelas[key])
            //console.log("---------------End")
            //console.log(tabelas[key].linhas[k])
            //console.log("---------------IdsStart")
            //console.log(tabelas[key].ids)
            const keysArray = Object.values(tabelas[key].ids);
            //console.log("---------------IdsEnd")
            Object.keys(tabelas[key].linhas[k]).forEach((linha, index) => {
                console.log(index)
                if(index != 0){
                    const novaResposta = tabelas[key].linhas[k][linha];
                    if (keyCounter[keysArray[index-1]]) {
                        keyCounter[keysArray[index-1]]++;
                    } else {
                        keyCounter[keysArray[index-1]] = 1;
                    }
                    console.log(`Index: ${keyCounter[keysArray[index-1]]}, nParametro: ${id}, Key: ${keysArray[index-1]}, Resposta: ${novaResposta}`);

                    atualizarRespostaTabela(keyCounter[keysArray[index-1]], id, keysArray[index-1], novaResposta)
                }
            });
            console.log("----")
            //atualizarRespostaTabela(k, key, )
        }

    }
    
    
    return res.status(201).send({"success": true});
};



const alterarEstadoParametroPadraoSeg_GuardadotoSeg_Submeter = async (
  req,
  res
) => {
  try {
    const id = req.params.n_ParametroPadrao; // Pegando o ID da URL
    const parametroPadrao = await Parametros_Padrao.findOne({
      where: { n_ParametroPadrao: id }, // Buscando pelo ID
    });

    // Se não encontrar nenhum ParametroPadrao com o ID fornecido
    if (!parametroPadrao) {
      return res
        .status(404)
        .send({ message: "ParametroPadrao não encontrado" });
    }

    // Alterar o estado do ParametroPadrao para 7
    await Historico_Estados.update(
      { n_Estados: 1005 },
      {
        where: { n_ParametroPadrao: id },
      }
    );

    res.status(200).send({
      message: `Estado do ParametroPadrao ${id} foi alterado para 1005 Seg_Submetido`,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const alterarEstadoParametroPadraoSeg_SubmetertoSeg_Completo = async (
    req,
    res
  ) => {
    try {
      const id = req.params.n_ParametroPadrao; // Pegando o ID da URL
      const parametroPadrao = await Parametros_Padrao.findOne({
        where: { n_ParametroPadrao: id }, // Buscando pelo ID
      });
  
      // Se não encontrar nenhum ParametroPadrao com o ID fornecido
      if (!parametroPadrao) {
        return res
          .status(404)
          .send({ message: "ParametroPadrao não encontrado" });
      }
  
      // Alterar o estado do ParametroPadrao para 7
      await Historico_Estados.update(
        { n_Estados: 2004 },
        {
          where: { n_ParametroPadrao: id },
        }
      );
  
      res.status(200).send({
        message: `Estado do ParametroPadrao ${id} foi alterado para 2004 Seg_Completo`,
      });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  };
  
  const alterarEstadoParametroPadraoSeg_CompletotoSeg_Cancelado = async (
    req,
    res
  ) => {
    try {
      const id = req.params.n_ParametroPadrao; // Pegando o ID da URL
      const parametroPadrao = await Parametros_Padrao.findOne({
        where: { n_ParametroPadrao: id }, // Buscando pelo ID
      });
  
      // Se não encontrar nenhum ParametroPadrao com o ID fornecido
      if (!parametroPadrao) {
        return res
          .status(404)
          .send({ message: "ParametroPadrao não encontrado" });
      }
  
      // Alterar o estado do ParametroPadrao para 7
      await Historico_Estados.update(
        { n_Estados: 2003 },
        {
          where: { n_ParametroPadrao: id },
        }
      );
  
      res.status(200).send({
        message: `Estado do ParametroPadrao ${id} foi alterado para 2003 Seg_Cancelado`,
      });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  };

  const alterarEstadoParametroPadraoSeg_CompletotoSeg_FimInjecao = async (
    req,
    res
  ) => {
    try {
      const id = req.params.n_ParametroPadrao; // Pegando o ID da URL
      const parametroPadrao = await Parametros_Padrao.findOne({
        where: { n_ParametroPadrao: id }, // Buscando pelo ID
      });
  
      // Se não encontrar nenhum ParametroPadrao com o ID fornecido
      if (!parametroPadrao) {
        return res
          .status(404)
          .send({ message: "ParametroPadrao não encontrado" });
      }
  
      // Alterar o estado do ParametroPadrao para 7
      await Historico_Estados.update(
        { n_Estados: 2005 },
        {
          where: { n_ParametroPadrao: id },
        }
      );
  
      res.status(200).send({
        message: `Estado do ParametroPadrao ${id} foi alterado para 2005 Seg_FimInjecao`,
      });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  };
  

  const alterarEstadoParametroPadraoSeg_SubmetidotoSeg_Saved = async (
    req,
    res
  ) => {
    try {
      const id = req.params.n_ParametroPadrao; // Pegando o ID da URL
      const parametroPadrao = await Parametros_Padrao.findOne({
        where: { n_ParametroPadrao: id }, // Buscando pelo ID
      });
  
      // Se não encontrar nenhum ParametroPadrao com o ID fornecido
      if (!parametroPadrao) {
        return res
          .status(404)
          .send({ message: "ParametroPadrao não encontrado" });
      }
  
      // Alterar o estado do ParametroPadrao para 7
      await Historico_Estados.update(
        { n_Estados: 1004 },
        {
          where: { n_ParametroPadrao: id },
        }
      );
  
      res.status(200).send({
        message: `Estado do ParametroPadrao ${id} foi alterado para 1004 Seg_Saved`,
      });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  };
  

  module.exports = {
    addRespostas,
    updateRespostas,
    alterarEstadoParametroPadraoSeg_GuardadotoSeg_Submeter,
    alterarEstadoParametroPadraoSeg_SubmetertoSeg_Completo,
    alterarEstadoParametroPadraoSeg_CompletotoSeg_Cancelado,
    alterarEstadoParametroPadraoSeg_CompletotoSeg_FimInjecao,
    alterarEstadoParametroPadraoSeg_SubmetidotoSeg_Saved


};