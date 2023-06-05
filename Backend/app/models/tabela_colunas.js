module.exports = (sequelize, Sequelize) => {
  const TabelaColunas = sequelize.define("TabelaColunas", {
    n_TabelaColunas: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    n_TabelaGeral: Sequelize.INTEGER,
    TituloColunas: Sequelize.STRING,
  });

  return TabelaColunas;
};
