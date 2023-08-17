const db = require('../models');
const Maquinas = db.maquinas
const Materia_Prima = db.materia_prima
const Moldes = db.moldes

const ListMaquinas = (req, res) => {
    Maquinas.findAll({
        attributes: ['n_Maquina', 'MarcaModelo'], 
    })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Algum erro ocorreu ao buscar os MarcaModelo."
        });
    });
};



const ListMateria_Prima = (req, res) => {
    Materia_Prima.findAll({
        attributes: ['n_MateriaPrima', 'Descricao' ], 
    })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Ocorreu um erro ao buscar as descrições."
        });
    });
};

const ListMoldes = (req, res) => {
    Moldes.findAll({
        attributes: ['n_Molde', 'Descricao'], 
    })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Ocorreu um erro ao buscar as descrições."
        });
    });
};

const GetMaquinaDetails = (req, res) => {
    const id = req.query.maquina;
    Maquinas.findByPk(id)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: "Erro ao buscar detalhes da máquina com id=" + id
        });
    });
};

const GetMoldeDetails = (req, res) => {
    const id = req.query.molde;
    Moldes.findByPk(id)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: "Erro ao buscar detalhes do molde com id=" + id
        });
    });
};

const GetMateriaPrimaDetails = (req, res) => {
    const id = req.query.materiaPrima;
    Materia_Prima.findByPk(id)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: "Erro ao buscar detalhes da matéria-prima com id=" + id
        });
    });
};


module.exports = {
    ListMaquinas,
    ListMateria_Prima,
    ListMoldes,
    GetMaquinaDetails,
    GetMoldeDetails,
    GetMateriaPrimaDetails
};