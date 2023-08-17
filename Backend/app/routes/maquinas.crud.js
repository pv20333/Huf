// rotas

module.exports = app => {
    const controller_maquinas = require('../controllers/controller_maquinas');
  
    var router = require("express").Router();
  
    router.post("/adicionar", controller_maquinas.maquinasADD);

    router.get("/listar", controller_maquinas.maquinasLIST);

    router.get("/listar/:id", controller_maquinas.getMaquinaById);


    router.put("/update/:id", controller_maquinas.maquinasUPDATE);

    router.delete("/delete/:id", controller_maquinas.maquinasDELETE);

    app.use('/api/maquinas', router);
};
