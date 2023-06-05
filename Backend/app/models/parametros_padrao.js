module.exports = (sequelize, Sequelize) => {
    const Parametros_Padrao = sequelize.define("Parametros_Padrao", {
      n_ParametroPadrao: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      n_Versao: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      //n_Versao: Sequelize.INTEGER,
      n_Maquina: Sequelize.INTEGER,
      n_Referencia: Sequelize.INTEGER,
      n_Molde: Sequelize.INTEGER,
      n_MateriaPrima: Sequelize.INTEGER,
      autor: Sequelize.INTEGER,
      n_Formularios: Sequelize.INTEGER,
      n_VersaoFormulario: Sequelize.INTEGER,
      data: Sequelize.DATE,
      ultimaUtilizacao: Sequelize.DATE,
      descricao: Sequelize.STRING,
      Homolegado: Sequelize.DATEONLY,
      Motivo: Sequelize.STRING,
      Estado_PP: Sequelize.STRING,
    });
  
    return Parametros_Padrao;
  };
  