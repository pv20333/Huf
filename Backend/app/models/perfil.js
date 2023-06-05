module.exports = (sequelize, Sequelize) => {
    const Perfil = sequelize.define("Perfil", {
      n_Perfil: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      Descricao: Sequelize.STRING
    });
  
    return Perfil;
  };
  