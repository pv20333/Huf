module.exports = (sequelize, Sequelize) => {
  const TabelaRespostas = sequelize.define("TabelaRespostas", {
    n_TabelaRespostas: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    n_ParametrosPadrao: Sequelize.INTEGER,
    n_TabelaColunas: Sequelize.INTEGER,
    respostas: Sequelize.STRING,
  });

  return TabelaRespostas;
};
