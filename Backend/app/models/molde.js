module.exports = (sequelize, Sequelize) => {
    const moldes = sequelize.define("Moldes", {
      n_Molde: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      Descricao: Sequelize.STRING,
      InseridoMolde: Sequelize.DATE
    });
  
    return moldes;
  };
  