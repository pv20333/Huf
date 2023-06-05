//const { defaultValueSchemable } = require("sequelize/types/utils.js");
const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  port: dbConfig.PORT,
  dialect: dbConfig.dialect,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
//add models
//db.tutorials = require("./tutorial.model.js")(sequelize, Sequelize);
db.parametros_padrao = require("./parametros_padrao.js")(sequelize, Sequelize);
db.colaboradores = require("./colaboradores.js")(sequelize,Sequelize);
db.colaboradores_perfil = require("./colaboradores_perfil.js")(sequelize,Sequelize);
db.perfil = require("./perfil.js")(sequelize,Sequelize);
db.maquinas = require("./maquinas.js")(sequelize,Sequelize);
db.moldes = require("./molde.js")(sequelize,Sequelize);
db.referencias = require("./referencias.js")(sequelize,Sequelize);
db.materia_prima = require("./materia_prima.js")(sequelize,Sequelize);
db.materia_prima_referencia = require("./materia_prima_referencia")(sequelize,Sequelize);
db.referencias_moldes = require("./referencias_moldes")(sequelize,Sequelize);
db.historico_eventos = require("./historico_eventos")(sequelize,Sequelize);
db.historico_estados = require("./historico_estados")(sequelize,Sequelize);
db.tabela_geral = require("./tabela_geral")(sequelize,Sequelize);
db.tabela_colunas = require("./tabela_colunas")(sequelize,Sequelize);
db.tabela_respostas = require("./tabela_respostas")(sequelize,Sequelize);
db.formularios_tabelas = require("./formularios_tabelas.js")(sequelize, Sequelize);
db.formularios = require("./formularios.js")(sequelize, Sequelize);




db.parametros_padrao.belongsTo(db.maquinas, {
  foreignKey: 'n_Maquina',
  targetKey: 'n_Maquina',
  onUpdate: 'CASCADE'
});

db.parametros_padrao.belongsTo(db.referencias, {
  foreignKey: 'n_Referencia',
  targetKey: 'n_Referencias',
  onUpdate: 'CASCADE'
});

db.parametros_padrao.belongsTo(db.moldes, {
  foreignKey: 'n_Molde',
  targetKey: 'n_Molde',
  onUpdate: 'CASCADE'
});

db.parametros_padrao.belongsTo(db.materia_prima, {
  foreignKey: 'n_MateriaPrima',
  targetKey: 'n_MateriaPrima',
  onUpdate: 'CASCADE'
});

db.parametros_padrao.belongsTo(db.colaboradores, {
  foreignKey: 'autor',
  targetKey: 'n_Colaborador',
  onUpdate: 'CASCADE'
});
db.parametros_padrao.belongsTo(db.formularios, {
  foreignKey: 'n_Formularios',
  targetKey: 'n_Formularios',
  onUpdate: 'CASCADE',
  as: 'Formularios1'
});

db.parametros_padrao.belongsTo(db.formularios, {
  foreignKey: 'n_VersaoFormulario',
  targetKey: 'n_VersaoFormulario',
  onUpdate: 'CASCADE',
  as: 'Formularios2'
});
// db.sequelize.query(`
//   IF NOT EXISTS (
//     SELECT * FROM sys.indexes
//     WHERE name = 'UQ_Formularios_n_VersaoFormulario'
//   )
//   BEGIN
//     ALTER TABLE Formularios
//     ADD CONSTRAINT UQ_Formularios_n_VersaoFormulario UNIQUE (n_VersaoFormulario);
//   END;
// `).then(result => {
//   console.log("done1")

//   db.sequelize.query(`
//   IF NOT EXISTS (
//     SELECT * FROM sys.foreign_keys
//     WHERE name = 'FK_Parametros_Padrao_Formularios2'
//   )
//   BEGIN
//     ALTER TABLE Parametros_Padraos
//     ADD CONSTRAINT FK_Parametros_Padrao_Formularios2
//     FOREIGN KEY (n_VersaoFormulario)
//     REFERENCES Formularios(n_VersaoFormulario)
//     ON DELETE NO ACTION;
//   END;
// `).then(result => {
//   console.log("done2")
// })
// .catch(err => {
//   console.error('Error executing query', err);
// });
// })
// .catch(err => {
//   console.error('Error executing query', err);
// });


// db.sequelize.query(`
//   IF NOT EXISTS (
//     SELECT * FROM sys.indexes
//     WHERE name = 'UQ_Formularios_n_Formulario'
//   )
//   BEGIN
//     ALTER TABLE Formularios
//     ADD CONSTRAINT UQ_Formularios_n_Formulario UNIQUE (n_Formularios);
//   END;
// `).then(result => {
//   console.log("done1")

//   db.sequelize.query(`
//   IF NOT EXISTS (
//     SELECT * FROM sys.foreign_keys
//     WHERE name = 'FK_Parametros_Padrao_Formularios1'
//   )
//   BEGIN
//     ALTER TABLE Parametros_Padraos
//     ADD CONSTRAINT FK_Parametros_Padrao_Formularios1
//     FOREIGN KEY (n_Formularios)
//     REFERENCES Formularios(n_Formularios)
//     ON DELETE NO ACTION;
//   END;
// `).then(result => {
//   console.log("done2")

// })
// .catch(err => {
//   console.error('Error executing query', err);
// });
 
// })
// .catch(err => {
//   console.error('Error executing query', err);
// });




db.colaboradores_perfil.belongsTo(db.colaboradores, {
  foreignKey: 'n_Colaborador',
  targetKey: 'n_Colaborador',
  onUpdate: 'CASCADE'
});

db.colaboradores_perfil.belongsTo(db.perfil, {
  foreignKey: 'n_Perfil',
  targetKey: 'n_Perfil',
  onUpdate: 'CASCADE'
});


db.materia_prima_referencia.belongsTo(db.materia_prima, {
  foreignKey: 'n_MateriaPrima',
  targetKey: 'n_MateriaPrima',
  onUpdate: 'CASCADE'
});

db.materia_prima_referencia.belongsTo(db.referencias, {
  foreignKey: 'n_Referencias',
  targetKey: 'n_Referencias',
  onUpdate: 'CASCADE'
});


db.referencias_moldes.belongsTo(db.referencias, {
  foreignKey: 'n_Referencias',
  targetKey: 'n_Referencias',
  onUpdate: 'CASCADE'
});

db.referencias_moldes.belongsTo(db.moldes, {
  foreignKey: 'n_Moldes',
  targetKey: 'n_Molde',
  onUpdate: 'CASCADE'
});

db.historico_eventos.belongsTo(db.parametros_padrao, {
  foreignKey: 'n_ParametroPadrao',
  targetKey: 'n_ParametroPadrao',
  onUpdate: 'CASCADE'
});

db.historico_eventos.belongsTo(db.parametros_padrao, {
  foreignKey: 'n_Versao',
  targetKey: 'n_Versao',
  onUpdate: 'CASCADE'
});


db.historico_estados.belongsTo(db.parametros_padrao, {
  foreignKey: 'n_ParametroPadrao',
  targetKey: 'n_ParametroPadrao',
  onUpdate: 'CASCADE'
});

db.historico_estados.belongsTo(db.parametros_padrao, {
  foreignKey: 'n_Versao',
  targetKey: 'n_Versao',
  onUpdate: 'CASCADE'
});


db.tabela_colunas.belongsTo(db.tabela_geral, {
  foreignKey: 'n_TabelaGeral',
  targetKey: 'n_TabelaGeral',
  onUpdate: 'CASCADE'
});

db.tabela_respostas.belongsTo(db.parametros_padrao, {
  foreignKey: 'n_ParametrosPadrao',
  targetKey: 'n_ParametroPadrao',
  onUpdate: 'CASCADE'
});

db.tabela_respostas.belongsTo(db.tabela_colunas, {
  foreignKey: 'n_TabelaColunas',
  targetKey: 'n_TabelaColunas',
  onUpdate: 'CASCADE'
});


db.formularios_tabelas.belongsTo(db.formularios, {
  foreignKey: 'n_Formularios',
  targetKey: 'n_Formularios',
  onUpdate: 'CASCADE'
});

db.formularios_tabelas.belongsTo(db.tabela_geral, {
  foreignKey: 'n_TabelaGeral',
  targetKey: 'n_TabelaGeral',
  onUpdate: 'CASCADE'
});

db.formularios.belongsToMany(db.tabela_geral, { 
  through: db.formularios_tabelas,
  foreignKey: 'n_Formularios',
  otherKey: 'n_TabelaGeral'
});

db.tabela_geral.belongsToMany(db.formularios, { 
  through: db.formularios_tabelas,
  foreignKey: 'n_TabelaGeral',
  otherKey: 'n_Formularios'
});

db.tabela_geral.hasMany(db.tabela_colunas, {
  foreignKey: 'n_TabelaGeral',
  targetKey: 'n_TabelaGeral',
  as: 'Colunas'
});







module.exports = db;
