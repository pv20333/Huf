module.exports = (sequelize, Sequelize) => {
    const Estados = sequelize.define("Estados", {
        n_Estados: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      designacao: Sequelize.STRING
    });
  
    return Estados;
  };
  