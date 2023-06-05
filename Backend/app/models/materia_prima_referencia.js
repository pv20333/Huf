module.exports = (sequelize, Sequelize) => {
  const MateriaPrima_Referencias = sequelize.define(
    "MateriaPrima_Referencias",
    {
      n_MateriaPrima: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      n_Referencias: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
    }
  );

  return MateriaPrima_Referencias;
};
