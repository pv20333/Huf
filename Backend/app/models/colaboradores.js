module.exports = (sequelize, Sequelize) => {
    const Colaboradores = sequelize.define("Colaboradores", {
      n_Colaborador: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      Nome: Sequelize.STRING,
      Departamento: Sequelize.STRING,
      Perfil: Sequelize.STRING,
      Acao: Sequelize.STRING
    });
  
    return Colaboradores;
  };
  