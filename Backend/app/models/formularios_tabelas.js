module.exports = (sequelize, Sequelize) => {
    const Formularios_Tabelas = sequelize.define("Formularios_Tabelas", {
        n_Formularios: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        n_TabelaGeral: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        prioridade: {
            type: Sequelize.INTEGER,
        }
        
    });

    return Formularios_Tabelas;
};