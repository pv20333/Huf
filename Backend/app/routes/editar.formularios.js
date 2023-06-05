module.exports = app => {
    const tabelaeditarController = require('../controllers/controlloer_editar_formularios');
  
    var router = require("express").Router();
  
    router.get('/formularios', tabelaeditarController.listFormularios);

    router.get('/formularios/:id', tabelaeditarController.getFormularioTabelas);

    router.post('/formularios/:id/tabela', tabelaeditarController.createTabela);

    router.put('/formularios/:id', tabelaeditarController.updateFormulario);

    router.post('/formularios/:id/adicionar', tabelaeditarController.addTabelaToFormulario);

    router.delete('/formularios/:formularioId/tabelas/:tabelaId', tabelaeditarController.removeTabelaFromFormulario);

    //router.put('/formularios/:id/prioridades', tabelaeditarController.updatePrioridades);
    router.put('/prioridades/update', tabelaeditarController.updatePrioridadesNOVO);


    app.use('/api/editarformulario', router);
};
