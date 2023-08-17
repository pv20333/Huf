module.exports = app => {
    const deatlhesSeg = require('../controllers/controller_detalhesSeg');
  
    var router = require("express").Router();
  

    router.post('/SeguimentosRespostas/:n_ParametroPadrao', deatlhesSeg.addRespostas);

    router.put('/SeguimentosRespostas/:n_ParametroPadrao', deatlhesSeg.updateRespostas);

    router.put('/SeguimentosSeg_GuardadotoSeg_Submeter/:n_ParametroPadrao', deatlhesSeg.alterarEstadoParametroPadraoSeg_GuardadotoSeg_Submeter);
    
    router.put('/SeguimentosSeg_SubmetertoSeg_Completo/:n_ParametroPadrao', deatlhesSeg.alterarEstadoParametroPadraoSeg_SubmetertoSeg_Completo);

    router.put('/SeguimentosSeg_CompletotoSeg_Cancelado/:n_ParametroPadrao', deatlhesSeg.alterarEstadoParametroPadraoSeg_CompletotoSeg_Cancelado);

    router.put('/SeguimentosSeg_CompletotoSeg_FimInjecao/:n_ParametroPadrao', deatlhesSeg.alterarEstadoParametroPadraoSeg_CompletotoSeg_FimInjecao);

    router.put('/SeguimentosSeg_SubmetidotoSeg_Saved/:n_ParametroPadrao', deatlhesSeg.alterarEstadoParametroPadraoSeg_SubmetidotoSeg_Saved);


    app.use('/api/DetalhesSeguimentos', router);
};
