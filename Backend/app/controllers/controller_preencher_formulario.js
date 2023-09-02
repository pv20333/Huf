const db = require('../models');
const TabelaRespostas = db.tabela_respostas;
const Parametros_Padrao = db.parametros_padrao;
const Estados = db.estados;
const Historico_Estados = db.historico_estados;
const Formularios = db.formularios


const addRespostas = async (req, res) => {
  console.log('Corpo da requisição:', req.body);
  const { n_ParametroPadrao, n_TabelaColunas, respostas } = req.body;

  if ( !n_ParametroPadrao || !n_TabelaColunas) {
    return res.status(600).send({ message: "Campos obrigatórios estão faltando" });
  }

  console.log("Got: ")
  console.log("n_ParametroPadrao: " + n_ParametroPadrao)
  console.log("n_TabelaColunas: " + n_TabelaColunas)
  console.log("respostas: " + respostas)
  console.log("------------------\n")

  try {
    const newResposta = await TabelaRespostas.create({
      n_ParametrosPadrao: n_ParametroPadrao,
      n_TabelaColunas,
      respostas
    });

    console.log('Nova resposta criada:', newResposta);
    return res.status(201).send(newResposta);
  } catch (error) {
    console.log('Erro ao adicionar respostas:', error);
    return res.status(500).send({ message: "Erro ao adicionar respostas", error });
  }
};




const createOrUpdateParametroPadrao = async (req, res) => {
    const { n_ParametroPadrao, designacao } = req.body;
    const idFormulario = req.params.id; // obtendo o id do formulário
    //return res.status(200).send({ message: "Campos obrigatórios estão faltando" });
    console.log("id formulario: ", idFormulario);
    if (!designacao) {
      return res.status(300).send({ message: "Campos obrigatórios estão faltando" });
    }

    try {
      // Buscando o registro mais recente da tabela Formularios
      const latestFormulario = await Formularios.findOne({ 
        where: { n_Formularios: idFormulario },
        order: [ ['n_Formularios', 'DESC'] ],
        limit: 1 
      });
      
      // Verifique se o registro do formulário foi encontrado
      if (!latestFormulario) {
        return res.status(404).send({ message: "Não foi encontrado nenhum formulário com o id fornecido" });
      }

      const n_VersaoFormulario = latestFormulario.n_VersaoFormulario; // Pegando a chave primária do registro mais recente
      
      let n_Versao;
      let n_ParametroPadraoAtual;
      if (!n_ParametroPadrao) {
        const newParametroPadrao = await Parametros_Padrao.create({
          n_Versao: 1,
          dataCriacao: new Date(),
          descricao: designacao,
          n_Formularios: idFormulario, // usando o id do formulário ao criar o novo parametro padrao
          n_VersaoFormulario, // adicionando o valor da chave primária do formulário mais recente
        });

        n_Versao = 1;
        n_ParametroPadraoAtual = newParametroPadrao.n_ParametroPadrao;
        console.log('Novo parâmetro padrão criado:', newParametroPadrao);
        res.status(201).send({
          message: "Parâmetro padrão criado com sucesso",
          n_ParametroPadrao: n_ParametroPadraoAtual,
        });
      } else {
        const parametroPadrao = await Parametros_Padrao.findByPk(n_ParametroPadrao);
        
        if (!parametroPadrao) {
          return res.status(404).send({ message: "Não foi encontrado nenhum parâmetro padrão com o id fornecido" });
        }
        
        parametroPadrao.n_Versao += 1;
        n_Versao = parametroPadrao.n_Versao;
        n_ParametroPadraoAtual = n_ParametroPadrao;
        parametroPadrao.descricao = designacao;
        parametroPadrao.n_Formularios = idFormulario; // usando o id do formulário ao atualizar o parametro padrao
        parametroPadrao.n_VersaoFormulario = n_VersaoFormulario; // atualizando a versão do formulário ao atualizar o parametro padrao
        await parametroPadrao.save();
        
        console.log('Parâmetro padrão atualizado:', parametroPadrao);
        
        res.status(200).send({
          message: "Parâmetro padrão atualizado com sucesso",
          n_ParametroPadrao: n_ParametroPadraoAtual,
        });
      }
  
      await Historico_Estados.create({
        n_Estados: 3, // O id para 'Saved'
        n_ParametroPadrao: n_ParametroPadraoAtual,
        n_Versao,
        Data: new Date(), // Adicionando a data atual
      });
  
    } catch (error) {
      console.log('Erro ao criar/atualizar parâmetro padrão:', error);
      return res.status(500).send({ message: "Erro ao adicionar/atualizar parâmetro padrão", error });
    }
};


  

const submeter = async (req, res) => {
    console.log("\n\n\n\n\n------------------>>>>>>>")
    const { n_ParametroPadrao, designacao } = req.body;
    const idFormulario = req.params.id; // obtendo o id do formulário

    console.log("id formulario: ", idFormulario);
    if (!designacao) {
      return res.status(400).send({ message: "Campos obrigatórios estão faltando" });
    }

    try {
      // Buscando o registro mais recente da tabela Formularios
      const latestFormulario = await Formularios.findOne({ 
        where: { n_Formularios: idFormulario },
        order: [ ['n_Formularios', 'DESC'] ],
        limit: 1 
      });
      
      // Verifique se o registro do formulário foi encontrado
      if (!latestFormulario) {
        return res.status(404).send({ message: "Não foi encontrado nenhum formulário com o id fornecido" });
      }

      const n_VersaoFormulario = latestFormulario.n_VersaoFormulario; // Pegando a chave primária do registro mais recente
      
      let n_Versao;
      let n_ParametroPadraoAtual;
      console.log(n_ParametroPadrao)
      console.log(n_ParametroPadrao)
      console.log(n_ParametroPadrao)
      console.log(n_ParametroPadrao)
      console.log(n_ParametroPadrao)
      console.log(n_ParametroPadrao)
      if (!n_ParametroPadrao) {

          const newParametroPadrao = await Parametros_Padrao.create({
            n_Versao: 1,
            dataCriacao: new Date(),
            descricao: designacao,
            n_Formularios: idFormulario, // usando o id do formulário ao criar o novo parametro padrao
            n_VersaoFormulario, // adicionando o valor da chave primária do formulário mais recente
          });
  
          n_Versao = 1;
          n_ParametroPadraoAtual = newParametroPadrao.n_ParametroPadrao;
          console.log('Novo parâmetro padrão criado:', newParametroPadrao);
          res.status(201).send({
            message: "Parâmetro padrão criado com sucesso",
            n_ParametroPadrao: n_ParametroPadraoAtual,
          });


      } else {
        const parametroPadrao = await Parametros_Padrao.findByPk(n_ParametroPadrao);
        
        if (!parametroPadrao) {
          return res.status(404).send({ message: "Não foi encontrado nenhum parâmetro padrão com o id fornecido" });
        }
        
        parametroPadrao.n_Versao += 1;
        n_Versao = parametroPadrao.n_Versao;
        n_ParametroPadraoAtual = n_ParametroPadrao;
        parametroPadrao.descricao = designacao;
        parametroPadrao.n_Formularios = idFormulario; // usando o id do formulário ao atualizar o parametro padrao
        parametroPadrao.n_VersaoFormulario = n_VersaoFormulario; // atualizando a versão do formulário ao atualizar o parametro padrao
        await parametroPadrao.save();
        
        console.log('Parâmetro padrão atualizado:', parametroPadrao);
        
        res.status(200).send({
          message: "Parâmetro padrão atualizado com sucesso",
          n_ParametroPadrao: n_ParametroPadraoAtual,
        });
      }
      console.log("Trying to exdecute update")
      console.log("Trying to exdecute update")
      console.log("Trying to exdecute update")
      console.log("Trying to exdecute update")
      console.log("Trying to exdecute update")
      console.log("Trying to exdecute update")
      await Historico_Estados.update({
        n_Estados: 4, // O id para 'submited'
      }, {where: {n_ParametroPadrao: n_ParametroPadrao}});
  
    } catch (error) {
      console.log('Erro ao criar/atualizar parâmetro padrão:', error);
      return res.status(500).send({ message: "Erro ao adicionar/atualizar parâmetro padrão", error });
    }
    console.log("\n\n\n\n\n------------------<<<<<<<<")

};

  

module.exports = { 
  addRespostas,
  createOrUpdateParametroPadrao,
  submeter
};


// const createParametroPadrao = async (req, res) => {
//   const { designacao } = req.body;
//   const n_Versao = 1;
//   const dataCriacao = new Date();

//   if (!designacao) {
//     return res.status(400).send({ message: "Campos obrigatórios estão faltando" });
//   }

//   try {
//     console.log('Criando novo parâmetro padrão:', { n_Versao, dataCriacao, descricao: designacao });

//     const newParametroPadrao = await Parametros_Padrao.create({
//       n_Versao,
//       dataCriacao,
//       descricao: designacao,
//     });

//     console.log('Novo parâmetro padrão criado:', newParametroPadrao);

//     return res.status(201).send({
//       message: "Parâmetro padrão criado com sucesso",
//       n_ParametroPadrao: newParametroPadrao.n_ParametroPadrao,
//     });
//   } catch (error) {
//     console.log('Erro ao criar parâmetro padrão:', error);
//     return res.status(500).send({ message: "Erro ao adicionar parâmetro padrão", error });
//   }
// };

//   const submeter = async (req, res) => {
//     const { n_ParametroPadrao, designacao } = req.body;
  
//     if (!designacao) {
//       return res.status(400).send({ message: "Campos obrigatórios estão faltando" });
//     }
  
//     try {
//       console.log('Submetendo com:', { n_ParametroPadrao, designacao });
//       const parametroPadrao = await Parametros_Padrao.findByPk(n_ParametroPadrao);
      
//       if (!parametroPadrao) {
//         console.log('Parâmetro padrão não encontrado para:', n_ParametroPadrao);
//         return res.status(404).send({ message: "Não foi encontrado nenhum parâmetro padrão com o id fornecido" });
//       }
      
//       parametroPadrao.n_Versao += 1;
//       parametroPadrao.descricao = designacao;
//       await parametroPadrao.save();
      
//       console.log('Parâmetro padrão submetido:', parametroPadrao);
      
//       await Historico_Estados.create({
//         n_Estados: 4, // O id para 'Submitted'
//         n_ParametroPadrao,
//         n_Versao: parametroPadrao.n_Versao,
//         Data: new Date(), // Adicionando a data atual
//       });
  
//       return res.status(200).send({
//         message: "Parâmetro padrão submetido com sucesso",
//         n_ParametroPadrao: parametroPadrao.n_ParametroPadrao,
//       });
//     } catch (error) {
//       console.error('Erro ao submeter:', error);
//       return res.status(500).send({ message: 'Erro ao submeter', error });
//     }
//   };