module.exports = (sequelize, Sequelize) => {
    const Historico_Estados = sequelize.define("Historico_Estados", {
      n_HistoricoEstados: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      n_ParametroPadrao: Sequelize.INTEGER,
      n_Versao: Sequelize.INTEGER,
      n_Estados: Sequelize.INTEGER,
      Data: Sequelize.DATE,
    });
  
    return Historico_Estados;
  };
  