module.exports = (sequelize, Sequelize) => {
  const Referencias_Moldes = sequelize.define("Referencias_Moldes", {
    n_Referencias: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    n_Moldes: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
  });

  return Referencias_Moldes;
};
