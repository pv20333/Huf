const db = require("../models");
const Formularios = db.formularios;
const Formularios_Tabelas = db.formularios_tabelas;
const TabelaGeral = db.tabela_geral;
const TabelaColunas = db.tabela_colunas;
const Sequelize = require('sequelize');

const listFormularios = (req, res) => {
    Formularios.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "Some error occurred while retrieving Formularios."
            });
        });
};

const getFormularioTabelas = async (req, res) => {
    const id = Number(req.params.id);
  
   // try {
      const formulario = await Formularios.findOne({ where: { n_Formularios: id } });
  
      if (!formulario) {
        return res.status(404).send({ message: 'Formulario not found' });
      }

      const tabelas = await Formularios_Tabelas.findAll({
        where: { n_Formularios: id },
        include: [
          {
            model: db.tabela_geral,
            required: true,
            include: [
              {
                model: db.tabela_colunas,
                as: 'Colunas'
              }
            ],
            order: [[{ model: db.tabela_colunas, as: 'Colunas' }, 'prioridade', 'ASC']] // Order tabela_colunas by 'prioridade' column in ascending order within the nested association
          }
        ],
        order: [['prioridade', 'ASC']] // Order tabela_geral by 'prioridade' column in ascending order
      });
      
      res.status(200).send(tabelas);
      
      
      
  
    //   const tabelas = await formulario.getTabelaGerals();
    //   //console.log(Object.keys(tabelas[0].__proto__));  // Imprime os métodos disponíveis para uma tabela.
      
    //   const tabelasComColunas = await Promise.all(tabelas.map(async (tabela) => {
    //     //console.log("Métodos disponíveis para a tabela:", Object.keys(tabela.__proto__));  // Verifique se 'getColunas' está na lista de métodos disponíveis
    //     const colunas = await tabela.getColunas();
    //     //console.log("Dados das colunas retornados pelo getColunas():", colunas);  // Verifique se os dados das colunas estão sendo retornados corretamente
    //     return {
    //         id: tabela.id,
    //       ...tabela.toJSON(),
    //       colunas: colunas.map((coluna) => ({
    //         title: coluna.TituloColunas,
    //         dataIndex: coluna.TituloColunas,
    //       })),
    //       numero_linhas: tabela.numero_linhas,
    //       prioridade: tabela.prioridade,
    //     };
    //   }));

      
  
    //   res.status(200).send(tabelasComColunas);
    // } catch (error) {
    //   console.error(error);
    //   res.status(500).send({ message: error.message });
    // }
  };
  
  
  
  
  const createTabela = async (req, res) => {
    const id = Number(req.params.id);
  
    try {
      const formulario = await Formularios.findOne({ where: { n_Formularios: id } });
  
      if (!formulario) {
        return res.status(404).send({ message: 'Formulario not found' });
      }
  
      const novaTabela = await formulario.createTabelaGeral(req.body);
  
      res.status(201).send(novaTabela);
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: error.message });
    }
  };
  
  const updateFormulario = async (req, res) => {
    const id = Number(req.params.id);
  
    try {
        console.log(`updateFormulario - Looking for Formulario with id ${id}`);
      const formulario = await Formularios.findOne({ where: { n_Formularios: id } });
  
      if (!formulario) {
        console.log(`updateFormulario - Formulario with id ${id} not found`);
        return res.status(404).send({ message: 'Formulario not found' });
      }

      console.log(`updateFormulario - Updating Formulario with id ${id}`);
  
      const updatedFormulario = await formulario.update({
        n_VersaoFormulario: db.Sequelize.literal('n_VersaoFormulario + 1'),
        ...req.body
      });

      console.log(`updateFormulario - Formulario with id ${id} updated successfully`);
  
      res.status(200).send(updatedFormulario);
    } catch (error) {
        console.error(`updateFormulario - Error updating Formulario with id ${id}: ${error.message}`);
      res.status(500).send({ message: error.message });
    }
  };

  const addTabelaToFormulario = async (req, res) => {
    const id = Number(req.params.id);
    console.log("addtabela reqbody   ", req.body);
    try {
      console.log(`addTabelaToFormulario - Looking for Formulario with id ${id}`);
  
      let formulario = await Formularios.findOne({ where: { n_Formularios: id } });
  
      if (!formulario) {
        console.log(`addTabelaToFormulario - Formulario with id ${id} not found`);
        return res.status(404).send({ message: 'Formulario not found' });
      }
  
      const tabelas = req.body.tabelas;
  
      console.log(`addTabelaToFormulario - Received tabelas: ${JSON.stringify(tabelas)}`);
  
      if (!tabelas) {
        console.log(`addTabelaToFormulario - No tabelas provided for Formulario with id ${id}`);
        return res.status(400).send({ message: 'No tabelas provided' });
      }
  
      console.log(`addTabelaToFormulario - Adding tabelas to Formulario with id ${id}`);
  
      for (const tabela of tabelas) {
        const tabelaId = tabela.id;
        const prioridade = tabela.prioridade;
  
        // Verificar se a tabela já está associada ao formulário
        const isAlreadyAdded = await formulario.hasTabelaGeral(tabelaId);
        if (isAlreadyAdded) {
          console.log(`addTabelaToFormulario - Tabela with id ${tabelaId} already added to Formulario with id ${id}`);
          continue;
        }
        
        console.log(`addTabelaToFormulario - Adding tabela with id ${tabelaId} to Formulario with id ${id}`);
        // Aqui adicione a prioridade como um atributo adicional
        const novaTabela = await formulario.addTabelaGeral(tabelaId, { through: { prioridade } });
  
        if (!novaTabela) {
          console.log(`addTabelaToFormulario - Tabela with id ${tabelaId} not found or already added to Formulario with id ${id}`);
          return res.status(404).send({ message: `Tabela ${tabelaId} not found or already added to the formulario` });
        }
      }
  
      // Incrementando a versão do formulário antes de salvar
      await formulario.increment('n_VersaoFormulario');
  
      // Recarregar o formulário com o novo valor de n_VersaoFormulario
      formulario = await Formularios.findOne({ where: { n_Formularios: id } });
  
      console.log(`addTabelaToFormulario - Tabelas added to Formulario with id ${id} successfully`);
      res.status(201).send({ message: 'Tabelas added to the formulario' });
    } catch (error) {
      console.error(`addTabelaToFormulario - Error adding tabelas to Formulario with id ${id}: ${error.message}`);
      res.status(500).send({ message: error.message });
    }
};

  
  const removeTabelaFromFormulario = async (req, res) => {
    const formularioId = Number(req.params.formularioId);
    const tabelaId = Number(req.params.tabelaId);
  
    try {
      console.log(`removeTabelaFromFormulario - Looking for Formulario with id ${formularioId}`);
  
      let formulario = await Formularios.findOne({ where: { n_Formularios: formularioId } });
  
      if (!formulario) {
        console.log(`removeTabelaFromFormulario - Formulario with id ${formularioId} not found`);
        return res.status(404).send({ message: 'Formulario not found' });
      }
  
      console.log(`removeTabelaFromFormulario - Looking for Tabela with id ${tabelaId} to remove`);
  
      const isTableAdded = await formulario.hasTabelaGeral(tabelaId);
      
      if (!isTableAdded) {
        console.log(`removeTabelaFromFormulario - Tabela with id ${tabelaId} is not associated with Formulario with id ${formularioId}`);
        return res.status(404).send({ message: `Tabela ${tabelaId} not associated with the formulario` });
      }
  
      console.log(`removeTabelaFromFormulario - Removing Tabela with id ${tabelaId} from Formulario with id ${formularioId}`);
  
      await formulario.removeTabelaGeral(tabelaId);
  
      // Incrementando a versão do formulário antes de salvar
      await formulario.increment('n_VersaoFormulario');
  
      // Recarregar o formulário com o novo valor de n_VersaoFormulario
      formulario = await Formularios.findOne({ where: { n_Formularios: formularioId } });
  
      console.log(`removeTabelaFromFormulario - Tabela with id ${tabelaId} removed from Formulario with id ${formularioId} successfully`);
      res.status(200).send({ message: 'Tabela removed from the formulario' });
    } catch (error) {
      console.error(`removeTabelaFromFormulario - Error removing tabela from Formulario with id ${formularioId}: ${error.message}`);
      res.status(500).send({ message: error.message });
    }
  };

  const updatePrioridadesNOVO = async (req, res) => {
    //const { id } = req.params;
    const { nformulario, ntabela, prioridade } = req.body;
  
    console.log('Recebido o seguinte corpo de requisição:');
    console.log("--------------");
    console.log("--------------");
    console.log("--------------");
    console.log("--------------");
    console.log("--------------");
    console.log("--------------");
    console.log("--------------");
    console.log("--------------");
    console.log("--------------");
    console.log("--------------");
    console.log("--------------");
    console.log(req.body);

    const update = await Formularios_Tabelas.update({
        prioridade
      },
      {
        where: {
          n_Formularios: nformulario,
          n_TabelaGeral: ntabela
        }
    });

    res.status(200).send({ message: 'Prioridades atualizadas com sucesso' });
  
    // try {
    //   await db.sequelize.transaction(async (t) => {
    //     for (const { tableId, prioridade } of prioridades) {
    //       // Atualizar a prioridade da tabela
    //       console.log(`Atualizando prioridade da tabela: ${tableId} para ${prioridade}`);
    //       await Formularios_Tabelas.update(
    //         {
    //           prioridade
    //         },
    //         {
    //           where: {
    //             n_Formularios: id,
    //             n_TabelaGeral: tableId
    //           },
    //           transaction: t
    //         }
    //       );
    //     }
  
    //     // Atualizar a versão do formulário
    //     console.log(`Atualizando a versão do formulário com ID: ${id}`);
    //     await Formularios.update(
    //       {
    //         n_VersaoFormulario: Sequelize.literal('n_VersaoFormulario + 1')
    //       },
    //       {
    //         where: {
    //           n_Formularios: id
    //         },
    //         transaction: t
    //       }
    //     );
    //   });
  
    //   console.log('Prioridades atualizadas com sucesso');
    //   res.status(204).send({ message: 'Prioridades atualizadas com sucesso' });
    // } catch (error) {
    //   console.error('Erro ao atualizar as prioridades:', error);
    //   res.status(500).send({ message: error.message });
    // }
  };
  
  

  
  
  module.exports = {
    listFormularios,
    getFormularioTabelas,
    createTabela,
    updateFormulario,
    addTabelaToFormulario,
    removeTabelaFromFormulario,
    updatePrioridadesNOVO
  };
  
