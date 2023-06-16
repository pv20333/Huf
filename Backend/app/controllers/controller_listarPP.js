const db = require('../models');
const Parametros_Padrao = db.parametros_padrao;
const Historico_Estados = db.historico_estados;


const listParametrosPadrao = async (req, res) => {
    try {
      const tabelas = await Parametros_Padrao.findAll({
        attributes: ['n_ParametroPadrao', 'descricao'],
        include: [
            {
              model: Historico_Estados,
              attributes: ['n_Estados'],
            },
        ],
      });
      res.status(200).send(tabelas);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
};

module.exports = {
    listParametrosPadrao,
    
  };