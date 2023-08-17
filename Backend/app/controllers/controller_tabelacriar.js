//const { TabelaGeral, TabelaColunas } = require('../models');
const db = require('../models');
const TabelaGeral = db.tabela_geral;
const TabelaColunas = db.tabela_colunas;

const createTabelaGeral = async (req, res) => {
    const { nome, numero_linhas } = req.body;
  
    try {
      const tabela = await TabelaGeral.create({ designacao: nome, numero_linhas: numero_linhas });
      res.status(201).send({ n_TabelaGeral: tabela.n_TabelaGeral });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  };
  



  const createTabelaColunas = async (req, res) => {
    const { n_TabelaGeral, colunas, Real } = req.body;
    console.log("Recebendo requisição para criar colunas da tabela:");
    console.log("n_TabelaGeral:", n_TabelaGeral);
    console.log("Colunas:", colunas);
    console.log("Real:", Real);
    try {
      for (let i = 0; i < colunas.length; i++) {
        const realValue = req.body.Real[i];
        console.log("Real value for column", i, ":", realValue);
        await TabelaColunas.create({ n_TabelaGeral, TituloColunas: colunas[i], Real: realValue });
      }
      res.status(201).send();
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  };

  

const listTabelaGeral = async (req, res) => {
    try {
      const tabelas = await TabelaGeral.findAll();
      res.status(200).send(tabelas);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  };
  
  const listTabelaColunas = async (req, res) => {
    try {
      const colunas = await TabelaColunas.findAll();
      res.status(200).send(colunas);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  };
  
  const updateTabelaGeral = async (req, res) => {
    const { n_TabelaGeral, nome, numero_linhas } = req.body;
  
    try {
      const tabela = await TabelaGeral.findOne({ where: { n_TabelaGeral } });
  
      if (!tabela) {
        return res.status(404).send({ message: 'Tabela Geral not found' });
      }
  
      tabela.designacao = nome;
      tabela.numero_linhas = numero_linhas; // update numero_linhas
      await tabela.save();
  
      res.status(200).send(tabela);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  };
  
  
  const updateTabelaColunas = async (req, res) => {
    const { n_TabelaColunas, TituloColunas } = req.body;
  
    try {
      const coluna = await TabelaColunas.findOne({ where: { n_TabelaColunas } });
  
      if (!coluna) {
        return res.status(404).send({ message: 'Tabela Colunas not found' });
      }
  
      coluna.TituloColunas = TituloColunas;
      await coluna.save();
  
      res.status(200).send(coluna);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  };
  
  const deleteTabelaGeral = async (req, res) => {
    const { n_TabelaGeral } = req.body;
  
    try {
      const tabela = await TabelaGeral.findOne({ where: { n_TabelaGeral } });
  
      if (!tabela) {
        return res.status(404).send({ message: 'Tabela Geral not found' });
      }
  
      // Delete the associated colunas first
      await TabelaColunas.destroy({ where: { n_TabelaGeral } });
  
      // Then delete the tabela
      await tabela.destroy();
  
      res.status(200).send({ message: 'Tabela Geral and its colunas deleted' });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  };
  
  
  const deleteTabelaColunas = async (req, res) => {
    const { n_TabelaColunas } = req.body;
  
    try {
      const coluna = await TabelaColunas.findOne({ where: { n_TabelaColunas } });
  
      if (!coluna) {
        return res.status(404).send({ message: 'Tabela Colunas not found' });
      }
  
      await coluna.destroy();
  
      res.status(200).send({ message: 'Tabela Colunas deleted' });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  };

  //este codigo abaixo apaga as colunas todas de uma vez mas pode ser problematico
  //json para ele 
//   {
//     "colunas": [1, 2, 3, 4, 5, 6]
//   }

//   const deleteTabelaColunas = async (req, res) => {
//     const { colunas } = req.body;
  
//     try {
//       for (let i = 0; i < colunas.length; i++) {
//         await TabelaColunas.destroy({
//           where: {
//             n_TabelaColunas: colunas[i]
//           }
//         });
//       }
//       res.status(200).send();
//     } catch (error) {
//       res.status(500).send({ message: error.message });
//     }
//   };
  
  
  module.exports = {
    createTabelaGeral,
    createTabelaColunas,
    listTabelaGeral,
    listTabelaColunas,
    updateTabelaGeral,
    updateTabelaColunas,
    deleteTabelaGeral,
    deleteTabelaColunas,
  };
  
  
  
