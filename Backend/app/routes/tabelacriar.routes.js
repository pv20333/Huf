module.exports = app => {
    const tabelaController = require('../controllers/controller_tabelacriar');
  
    var router = require("express").Router();
  
    router.post('/geral', tabelaController.createTabelaGeral);
    router.post('/colunas', tabelaController.createTabelaColunas);

    router.get('/geral', tabelaController.listTabelaGeral);
    router.get('/colunas', tabelaController.listTabelaColunas);

    router.put('/geral', tabelaController.updateTabelaGeral);
    router.put('/colunas', tabelaController.updateTabelaColunas);

    router.delete('/geral', tabelaController.deleteTabelaGeral);
    router.delete('/colunas', tabelaController.deleteTabelaColunas);
  
    app.use('/api/tabela', router);
  };
  