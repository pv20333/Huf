module.exports = (sequelize, Sequelize) => {
    const Materia_Prima = sequelize.define("Materia_Prima", {
      n_MateriaPrima: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      Descricao: Sequelize.STRING,
      InseridoMateriaPrima: Sequelize.DATE
    });
  
    return Materia_Prima;
  };
  