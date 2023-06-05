module.exports = (sequelize, Sequelize) => {
    const Referencias = sequelize.define("Referencias", {
      n_Referencias: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      Descricao: Sequelize.STRING,
      InseridoReferencias: Sequelize.DATE
    });
  
    return Referencias;
  };
  