module.exports = app => {
    const listarpp = require('../controllers/controller_listarPP');
  
    var router = require("express").Router();
  
    
    router.get('/parametros_padrao', listarpp.listParametrosPadrao);




    app.use('/api/listarpp', router);
};
