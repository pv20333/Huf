module.exports = (sequelize, Sequelize) => {
    const Historico_Eventos = sequelize.define("Historico_Eventos", {
      n_HistoricoEventos: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      n_ParametroPadrao: Sequelize.INTEGER,
      n_Versao: Sequelize.INTEGER, //tem que ser pk esta para poder ser uma fk da outra 8=Dhummm
      Data: Sequelize.DATE,
      n_autor: Sequelize.INTEGER,
      Titulo: Sequelize.STRING,
      Mensagem: Sequelize.STRING,
    });
  
    return Historico_Eventos;
  };
  