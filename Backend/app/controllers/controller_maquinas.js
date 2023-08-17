const db = require("../models");
const Maquinas = db.maquinas;

const maquinasADD = (req, res) => {
    const maquina = {
        MarcaModelo: req.body.MarcaModelo,
        ForcaFecho: req.body.ForcaFecho,
        DiametroFuso: req.body.DiametroFuso,
        EstadoMaquina: req.body.EstadoMaquina
    };

    Maquinas.create(maquina)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Erro ao adicionar a maquina."
            });
        });
};

const maquinasLIST = (req, res) => {
    Maquinas.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Erro ao recuperar as maquinas."
            });
        });
};

const getMaquinaById = (req, res) => {
    const id = req.params.id;

    Maquinas.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Não foi possível encontrar Máquina com o id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Erro ao recuperar a máquina com o id=" + id
            });
        });
};


const maquinasUPDATE = (req, res) => {
    const id = req.params.id;

    Maquinas.update(req.body, {
        where: { n_Maquina: id }
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "Maquina foi atualizada com sucesso."
            });
        } else {
            res.send({
                message: `Não foi possível atualizar a maquina com id=${id}. Talvez a maquina não tenha sido encontrada ou o body esteja vazio!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Erro ao atualizar a maquina com id=" + id
        });
    });
};

const maquinasDELETE = (req, res) => {
    const id = req.params.id;

    Maquinas.destroy({
        where: { n_Maquina: id }
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "Maquina foi deletada com sucesso!"
            });
        } else {
            res.send({
                message: `Não foi possível deletar a maquina com id=${id}. Talvez a maquina não tenha sido encontrada!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Erro ao deletar a maquina com id=" + id
        });
    });
};

module.exports = {
    maquinasADD,
    maquinasLIST,
    maquinasUPDATE,
    maquinasDELETE,
    getMaquinaById
};