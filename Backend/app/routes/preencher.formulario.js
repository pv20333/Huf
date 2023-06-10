module.exports = app => {
    const preencherformulario = require('../controllers/controller_preencher_formulario');
  
    var router = require("express").Router();
  
    
    router.post('/formularios/:id/adicionarrespostas', preencherformulario.addRespostas);

    router.post('/formularios/:id/adicionarparametropadrao', preencherformulario.createParametroPadrao);




    app.use('/api/preencherformulario', router);
};
