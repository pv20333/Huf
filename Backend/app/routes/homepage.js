module.exports = app => {
    const homepage = require('../controllers/controller_homepage');
  
    var router = require("express").Router();
  
    router.get('/countPP', homepage.CountPP);

    router.get('/countMP', homepage.CountMP);

    router.get('/countMaquinas', homepage.CountMaquinas);

    router.get('/countMoldes', homepage.CountMoldes);

    router.get('/countSeg', homepage.countSeguimentosCompletos);


    router.get('/countParametrosByMonth', homepage.countParametrosByMonth);


    

    app.use('/api/count', router);
};
