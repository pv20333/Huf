const db = require('../models');
const Colaboradores = db.colaboradores;

module.exports = {
  async create(req, res) {
    try {
      const colaborador = await Colaboradores.create(req.body);
      return res.status(201).send(colaborador);
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  },

  async list(req, res) {
    try {
      const colaboradores = await Colaboradores.findAll();
      return res.send(colaboradores);
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  },

  async update(req, res) {
    try {
      const { n_Colaborador } = req.params;
      const [updated] = await Colaboradores.update(req.body, {
        where: { n_Colaborador: n_Colaborador },
      });

      if (updated) {
        const updatedColaborador = await Colaboradores.findOne({ where: { n_Colaborador: n_Colaborador } });
        return res.status(200).send(updatedColaborador);
      }

      throw new Error('Colaborador não encontrado');

    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  },

  async delete(req, res) {
    try {
      const { n_Colaborador } = req.params;
      const deleted = await Colaboradores.destroy({
        where: { n_Colaborador: n_Colaborador },
      });

      if (deleted) {
        return res.status(204).send("Colaborador deletado");
      }

      throw new Error('Colaborador não encontrado');

    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  }
};
