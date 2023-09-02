const db = require('../models');
const Parametros_Padrao = db.parametros_padrao;
const Historico_Estados = db.historico_estados;
const Maquinas = db.maquinas;
const Materia_Prima = db.materia_prima;
const Moldes = db.moldes;
const { Sequelize, Op,  fn, col } = require('sequelize');
const moment = require('moment');

const CountPP = async (req, res) => {
    try {
      const count = await Parametros_Padrao.count();
      res.json({ count });
    } catch (error) {
      res.status(500).send({
        message: "Erro ao contar os registros de Parametros_Padrao",
        error: error.message
      });
    }
  };

  const CountMaquinas = async (req, res) => {
    try {
      const count = await Maquinas.count();
      res.json({ count });
    } catch (error) {
      res.status(500).send({
        message: "Erro ao contar os registros de Maquinas",
        error: error.message
      });
    }
  };

  const CountMP = async (req, res) => {
    try {
      const count = await Materia_Prima.count();
      res.json({ count });
    } catch (error) {
      res.status(500).send({
        message: "Erro ao contar os registros de Materia_Prima",
        error: error.message
      });
    }
  };

  const CountMoldes = async (req, res) => {
    try {
      const count = await Moldes.count();
      res.json({ count });
    } catch (error) {
      res.status(500).send({
        message: "Erro ao contar os registros de Moldes",
        error: error.message
      });
    }
  };

  const countSeguimentosCompletos = async (req, res) => {
    try {
      const estados = [7, 1004, 1005, 2003, 2004, 2005];
      const count = await Parametros_Padrao.count({
        include: [
          {
            model: Historico_Estados,
            attributes: [],
          },
        ],
        where: {
          '$Historico_Estados.n_Estados$': {
            [Op.in]: estados
          },
        },
      });
      res.status(200).send({ count });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  };

  const countParametrosByMonth = async (req, res) => {
    try {
        const counts = await Parametros_Padrao.findAll({
            attributes: [
                [Sequelize.fn('FORMAT', Sequelize.col('createdAt'), 'yyyy-MM'), 'month'],
                [Sequelize.fn('COUNT', '*'), 'count']
            ],
            group: [Sequelize.fn('FORMAT', Sequelize.col('createdAt'), 'yyyy-MM')],
            order: [[Sequelize.fn('FORMAT', Sequelize.col('createdAt'), 'yyyy-MM'), 'ASC']]
        });

        const result = counts.map(count => {
            return {
                month: count.getDataValue('month'),
                count: count.getDataValue('count')
            };
        });

        res.status(200).json(result);

    } catch (error) {
        res.status(500).json({
            message: "Erro ao contar Parametros_Padrao por mês",
            error: error.message
        });
    }
};
module.exports = {
    CountPP,
    CountMP,
    CountMaquinas,
    CountMoldes,
    countSeguimentosCompletos,
    countParametrosByMonth
};