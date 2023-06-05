// module.exports = (sequelize, Sequelize) => {
//     const Formularios = sequelize.define("Formularios", {
//         n_Formularios: {
//             type: Sequelize.INTEGER,
//             primaryKey: true,
//             autoIncrement: true

//         },
//         n_VersaoFormulario: {
//             type: Sequelize.INTEGER,
//             primaryKey: true,

//         },
//         designacao: {
//             type: Sequelize.STRING,
//         },
        
//     });

//     return Formularios;
// };

module.exports = (sequelize, DataTypes) => {
    const Formularios = sequelize.define('Formularios', {
      n_Formularios: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      n_VersaoFormulario: {
        type: DataTypes.INTEGER,
        primaryKey: true
      },
      designacao: {
        type: DataTypes.STRING
      }
    });
  
    Formularios.associate = (models) => {
      Formularios.belongsToMany(models.TabelaGeral, {
        through: 'Formularios_Tabelas',
        foreignKey: 'n_Formularios',
        otherKey: 'n_TabelaGeral'
      });
    };
  
    return Formularios;
  };