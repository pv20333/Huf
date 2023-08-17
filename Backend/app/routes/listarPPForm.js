module.exports = app => {
    const listarppForm = require('../controllers/controller_ListarPPForm');
  
    var router = require("express").Router();
  
    
    router.get('/ListMaquinas', listarppForm.ListMaquinas);

    router.get('/ListMP', listarppForm.ListMateria_Prima);

    router.get('/ListMoldes', listarppForm.ListMoldes);

    // Detalhes por ID
    router.get('/details/maquina', listarppForm.GetMaquinaDetails);

    router.get('/details/molde', listarppForm.GetMoldeDetails);
    
    router.get('/details/materiaPrima', listarppForm.GetMateriaPrimaDetails);




    app.use('/api/listarppForm', router);
};
