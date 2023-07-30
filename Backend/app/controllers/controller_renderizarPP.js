const db = require('../models');
const Parametros_Padrao = db.parametros_padrao;
const Historico_Estados = db.historico_estados;
const TabelaRespostas = db.tabela_respostas;
const TabelaColunas = db.tabela_colunas;
const TabelaGeral = db.tabela_geral;
const dbSequelize = db.Sequelize;

const getParametroPadrao = async (req, res) => {
    try {
        const id = req.params.n_ParametroPadrao; // Pegando o ID da URL
        const parametroPadrao = await Parametros_Padrao.findOne({
            where: { n_ParametroPadrao: id }, // Buscando pelo ID
            attributes: ['n_ParametroPadrao', 'n_Versao', 'descricao', 'n_Formularios', 'n_VersaoFormulario'],
            include: [
                {
                    model: Historico_Estados,
                    attributes: ['n_Estados'],
                },
            ],
        });

        //console.log(parametroPadrao);

        // Se não encontrar nenhum ParametroPadrao com o ID fornecido
        if (!parametroPadrao) {
            return res.status(404).send({ message: 'ParametroPadrao não encontrado' });
        }

        res.status(200).send(parametroPadrao);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

const getParametroPadraoComDetalhes = async (req, res) => {
    try {
        const id = req.params.n_ParametroPadrao; 
        const parametroPadrao = await Parametros_Padrao.findOne({
            where: { n_ParametroPadrao: id }, 
            include: [
                {
                    model: TabelaRespostas,
                    include: [
                        {
                            model: TabelaColunas,
                            include: [
                                {
                                    model: TabelaGeral,
                                }
                            ]
                        }
                    ]
                },
            ],
            order: [
                [TabelaRespostas, 'n_TabelaRespostas', 'ASC'],
                [TabelaRespostas, TabelaColunas, TabelaGeral, 'n_TabelaGeral', 'ASC'],
                [TabelaRespostas, TabelaColunas, TabelaGeral, 'numero_linhas', 'ASC'],
                [TabelaRespostas, TabelaColunas, 'n_TabelaColunas', 'ASC'],
                [TabelaRespostas, 'createdAt', 'ASC']
            ]
        });

        if (!parametroPadrao) {
            return res.status(404).send({ message: 'ParametroPadrao não encontrado' });
        }

        res.status(200).send(parametroPadrao);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

const alterarEstadoParametroPadraoDeviated = async (req, res) => {
    try {
        const id = req.params.n_ParametroPadrao; // Pegando o ID da URL
        const parametroPadrao = await Parametros_Padrao.findOne({
            where: { n_ParametroPadrao: id }, // Buscando pelo ID
        });

        // Se não encontrar nenhum ParametroPadrao com o ID fornecido
        if (!parametroPadrao) {
            return res.status(404).send({ message: 'ParametroPadrao não encontrado' });
        }

        // Alterar o estado do ParametroPadrao para 9
        await Historico_Estados.update({ n_Estados: 9 }, {
            where: { n_ParametroPadrao: id }
        });

        res.status(200).send({ message: `Estado do ParametroPadrao ${id} foi alterado para 9` });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

const alterarEstadoParametroPadraoDeviatedtoSaved = async (req, res) => {
    try {
        const id = req.params.n_ParametroPadrao; // Pegando o ID da URL
        const parametroPadrao = await Parametros_Padrao.findOne({
            where: { n_ParametroPadrao: id }, // Buscando pelo ID
        });

        // Se não encontrar nenhum ParametroPadrao com o ID fornecido
        if (!parametroPadrao) {
            return res.status(404).send({ message: 'ParametroPadrao não encontrado' });
        }

        // Alterar o estado do ParametroPadrao para 3
        await Historico_Estados.update({ n_Estados: 3 }, {
            where: { n_ParametroPadrao: id }
        });

        res.status(200).send({ message: `Estado do ParametroPadrao ${id} foi alterado para 9` });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

// const updateRespostas = async (req, res) => {
//     console.log('Corpo da requisição:', req.body);
//     const { n_TabelaColunas, respostas } = req.body;
//     const n_ParametroPadrao = req.params.n_ParametroPadrao;
  
//     if ( !n_ParametroPadrao || !n_TabelaColunas || !respostas) {
//       return res.status(400).send({ message: "Campos obrigatórios estão faltando" });
//     }
  
//     try {
//       const updatedResposta = await TabelaRespostas.update(
//         { respostas },
//         { where: { n_ParametroPadrao, n_TabelaColunas } }
//       );
  
//       console.log('Resposta atualizada:', updatedResposta);
//       return res.status(200).send(updatedResposta);
//     } catch (error) {
//       console.log('Erro ao atualizar respostas:', error);
//       return res.status(500).send({ message: "Erro ao atualizar respostas", error });
//     }
//   };
  
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

  console.log("Corpo da requisição:", req.body);
 // const n_ParametroPadrao = req.params.id; // Buscando o n_ParametroPadrao do caminho da URL
  const { n_TabelaColunas, respostas } = req.body;

  if (!n_ParametroPadrao || !n_TabelaColunas || !respostas) {
    return res
      .status(400)
      .send({ message: "Campos obrigatórios estão faltando" });
  }

  try {
    const newResposta = await TabelaRespostas.update({
      n_ParametrosPadrao: n_ParametroPadrao,
      n_TabelaColunas,
      respostas,
    });

    console.log("Nova resposta criada:", newResposta);
    return res.status(201).send(newResposta);
  } catch (error) {
    console.log("Erro ao adicionar respostas:", error);
    return res
      .status(500)
      .send({ message: "Erro ao adicionar respostas", error });
  }
};


module.exports = {
    getParametroPadrao,
    getParametroPadraoComDetalhes,
    alterarEstadoParametroPadraoDeviated,
    alterarEstadoParametroPadraoDeviatedtoSaved,
    addRespostas,
    updateRespostas
};
