module.exports = (sequelize, Sequelize) => {
    const TabelaGeral = sequelize.define("TabelaGeral", {
    n_TabelaGeral: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
    },
    designacao: Sequelize.STRING,
    numero_linhas: Sequelize.INTEGER
    });
    
    return TabelaGeral;
    };