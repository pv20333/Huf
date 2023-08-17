module.exports = app => {
    const renderizarpp = require('../controllers/controller_renderizarPP');
  
    var router = require("express").Router();
  
    
    router.get('/parametroPadrao/:n_ParametroPadrao', renderizarpp.getParametroPadrao);

    router.get('/parametroPadraoDetalhado/:n_ParametroPadrao', renderizarpp.getParametroPadraoComDetalhes);

    router.put('/parametroPadraoDeviated/:n_ParametroPadrao', renderizarpp.alterarEstadoParametroPadraoDeviated);

    router.put('/parametroPadraoDeviatedtoSaved/:n_ParametroPadrao', renderizarpp.alterarEstadoParametroPadraoDeviatedtoSaved);

    //router.put('/updateRespostas/:n_ParametroPadrao', renderizarpp.updateRespostas);

    router.post('/parametroPadraoRespostas/:n_ParametroPadrao', renderizarpp.addRespostas);

    router.put('/parametroPadraoRespostas/:n_ParametroPadrao', renderizarpp.updateRespostas);

    router.put('/parametroPadraoCancelar/:n_ParametroPadrao', renderizarpp.alterarEstadoParametroPadraoCancelar);

    router.get('/historicoeventos/:n_ParametroPadrao', renderizarpp.buscarHistoricoEventosPorParametroPadrao);

    router.put('/parametroPadraoSubmited/:n_ParametroPadrao', renderizarpp.alterarEstadoParametroPadraoSubmited);

    router.put('/parametroPadraoSubmitedtoSaved/:n_ParametroPadrao', renderizarpp.alterarEstadoParametroPadraoSubmitedtoSaved);

    router.put('/parametroPadraoCompleto/:n_ParametroPadrao', renderizarpp.alterarEstadoParametroPadraoCompleto);



    app.use('/api/renderizarpp', router);
};
