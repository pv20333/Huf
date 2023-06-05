const db = require('../models');
const TabelaGeral = db.tabela_geral;
const TabelaColunas = db.tabela_colunas;
const Parametros_Tabelas = db.parametros_tabelas;
const Parametros_Padrao = db.parametros_padrao;


const listTabelaGeralNomes = async (req, res) => {
    try {
      const tabelas = await TabelaGeral.findAll({
        attributes: ['n_TabelaGeral', 'designacao']
      });
      res.status(200).send(tabelas);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
};

const getColunasFromTabelaGeral = async (req, res) => {
    const id = Number(req.params.id);

    try {
      const tabelaGeral = await TabelaGeral.findOne({ where: { n_TabelaGeral: id } });

      if (!tabelaGeral) {
        return res.status(404).send({ message: 'Tabela Geral not found' });
      }

      const colunas = await TabelaColunas.findAll({ where: { n_TabelaGeral: tabelaGeral.n_TabelaGeral } });
      res.status(200).send({ colunas: colunas, numero_linhas: tabelaGeral.numero_linhas });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
};


const guardarOuAtualizarFormulario = async (req, res) => {
  const { nomeFormulario, tabelas } = req.body;
  
  try {
    await db.sequelize.transaction(async (t) => {
      let formulario;
      let versao;

      formulario = await db.formularios.findOne({ where: { designacao: nomeFormulario } });

      if (formulario) { // Atualizar formulário existente
        versao = formulario.n_VersaoFormulario + 1;
        await formulario.update({ n_VersaoFormulario: versao }, { transaction: t });
        // Apagar as tabelas existentes
        await db.formularios_tabelas.destroy({
          where: { n_Formularios: formulario.n_Formularios }
        }, { transaction: t });
      } else { // Criar novo formulário
        versao = 1;
        formulario = await db.formularios.create({ 
          designacao: nomeFormulario, 
          n_VersaoFormulario: versao 
        }, { transaction: t });
      }

      // Adicionar as novas tabelas
      let prioridade = 1;
      for (let tabelaId of tabelas) {
        const tabela = await TabelaGeral.findByPk(tabelaId, { transaction: t });
        if (!tabela) {
          throw new Error('Tabela não encontrada: ' + tabelaId);
        }
        await db.formularios_tabelas.create({
          n_Formularios: formulario.n_Formularios,
          n_TabelaGeral: tabela.n_TabelaGeral,
          prioridade: prioridade++
        }, { transaction: t });
      }
    });

    res.send({ message: 'Formulário guardado com sucesso!' });

  } catch (error) {
    console.error(error);
    res.status(500).send({ message: error.message });
  }
};

const listarFormularios = async (req, res) => {
  try {
    const formularios = await db.formularios.findAll({
      attributes: ['n_Formularios', 'designacao']
    });
    res.status(200).send(formularios);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};


module.exports = {
  listTabelaGeralNomes,
  getColunasFromTabelaGeral,
  guardarOuAtualizarFormulario,
  listarFormularios
};
