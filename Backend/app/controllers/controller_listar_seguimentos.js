const db = require('../models');
const Parametros_Padrao = db.parametros_padrao;
const Historico_Estados = db.historico_estados;
const { Op } = require('sequelize');



const listSeguimentosCompletos = async (req, res) => {
  try {
      const estados = [7, 1004, 1005, 2003, 2004, 2005];
      const tabelas = await Parametros_Padrao.findAll({
          attributes: ['n_ParametroPadrao', 'descricao'],
          include: [
              {
                  model: Historico_Estados,
                  attributes: ['n_Estados'],
              },
          ],
          where: {
              '$Historico_Estados.n_Estados$': {
                  [Op.in]: estados
              },
          },
      });
      res.status(200).send(tabelas);
  } catch (error) {
      res.status(500).send({ message: error.message });
  }
};


module.exports = {
    listSeguimentosCompletos,
    
  };