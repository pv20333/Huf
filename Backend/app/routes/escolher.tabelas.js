module.exports = app => {
    const tabelaescolherController = require('../controllers/controller_escolher_tabela');
  
    var router = require("express").Router();
  
    router.get('/tabelas-geral', tabelaescolherController.listTabelaGeralNomes);
    router.get('/colunas/:id', tabelaescolherController.getColunasFromTabelaGeral);
    router.post('/guardar', tabelaescolherController.guardarOuAtualizarFormulario);
    router.get('/formularios', tabelaescolherController.listarFormularios);


  
    app.use('/api/escolhertabela', router);
};
