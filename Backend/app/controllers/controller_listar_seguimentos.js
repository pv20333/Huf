const db = require('../models');
const Parametros_Padrao = db.parametros_padrao;
const Historico_Estados = db.historico_estados;


const listSeguimentosCompletos = async (req, res) => {
    try {
      const tabelas = await Parametros_Padrao.findAll({
        attributes: ['n_ParametroPadrao', 'descricao'],
        include: [
          {
            model: Historico_Estados,
            attributes: ['n_Estados'],
          },
        ],
        where: {
          '$Historico_Estados.n_Estados$': 7, 
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