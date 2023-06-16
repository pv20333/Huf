module.exports = app => {
    const preencherformulario = require('../controllers/controller_preencher_formulario');
  
    var router = require("express").Router();
  
    
    router.post('/formularios/:id/adicionarrespostas', preencherformulario.addRespostas);

    router.post('/formularios/:id/adicionarparametropadrao', preencherformulario.createOrUpdateParametroPadrao);

    router.post('/formularios/:id/submeter', preencherformulario.submeter);




    app.use('/api/preencherformulario', router);
};
