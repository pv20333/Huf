module.exports = app => {
    const login = require('../../server');
  
    var router = require("express").Router();
  
    
    router.post('/login', login.PostLogin);




    app.use('/api', router);
};
