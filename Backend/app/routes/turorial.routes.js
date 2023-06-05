module.exports = app => {
  const tutorials = require("../controllers/tutorial.controller.js");
  const controller_colaboradores = require('../controllers/controller_colaboradores.js');


  var router = require("express").Router();

  // Create a new Tutorial
  //router.post("/", tutorials.create);

  // Retrieve all Tutorials
  //router.get("/", tutorials.findAll);

  // Retrieve all published Tutorials
  // router.get("/published", tutorials.findAllPublished);

  // // Retrieve a single Tutorial with id
  // router.get("/:id", tutorials.findOne);

  // // Update a Tutorial with id
  // router.put("/:id", tutorials.update);

  // // Delete a Tutorial with id
  // router.delete("/:id", tutorials.delete);

  // // Delete all Tutorials
  // router.delete("/", tutorials.deleteAll);

  router.post("/", controller_colaboradores.create);
  router.get("/", controller_colaboradores.list);
  router.put("/:n_Colaborador", controller_colaboradores.update);
  router.delete("/:n_Colaborador", controller_colaboradores.delete);


  app.use('/api/tutorials', router);
};
