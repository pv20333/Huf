module.exports = (sequelize, Sequelize) => {
    const Colaboradores_Perfil = sequelize.define("Colaboradores_Perfil", {
      n_Colaboradores: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      n_Perfil: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      }
    });
  
    return Colaboradores_Perfil;
  };
  