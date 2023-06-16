module.exports = app => {
    const renderizarpp = require('../controllers/controller_renderizarPP');
  
    var router = require("express").Router();
  
    
    router.get('/parametroPadrao/:n_ParametroPadrao', renderizarpp.getParametroPadrao);




    app.use('/api/renderizarpp', router);
};
