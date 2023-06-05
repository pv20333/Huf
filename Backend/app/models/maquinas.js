module.exports = (sequelize, Sequelize) => {
    const Maquinas = sequelize.define("Maquinas", {
      n_Maquina: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      MarcaModelo: Sequelize.STRING,
      ForcaFecho: Sequelize.INTEGER,
      DiametroFuso: Sequelize.INTEGER,
      EstadoMaquina: Sequelize.INTEGER
    });
  
    return Maquinas;
  };
  