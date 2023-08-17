module.exports = app => {
    const listarseguimentos = require('../controllers/controller_listar_seguimentos');
  
    var router = require("express").Router();
  
    
    router.get('/lista', listarseguimentos.listSeguimentosCompletos);




    app.use('/api/listarseguimentos', router);
};
