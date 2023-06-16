const db = require('../models');
const Parametros_Padrao = db.parametros_padrao;
const Historico_Estados = db.historico_estados;

const getParametroPadrao = async (req, res) => {
    try {
        const id = req.params.n_ParametroPadrao; // Pegando o ID da URL
        const parametroPadrao = await Parametros_Padrao.findOne({
            where: { n_ParametroPadrao: id }, // Buscando pelo ID
            attributes: ['n_ParametroPadrao', 'n_Versao', 'descricao'],
            include: [
                {
                    model: Historico_Estados,
                    attributes: ['n_Estados'],
                },
            ],
        });

        // Se não encontrar nenhum ParametroPadrao com o ID fornecido
        if (!parametroPadrao) {
            return res.status(404).send({ message: 'ParametroPadrao não encontrado' });
        }

        res.status(200).send(parametroPadrao);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

module.exports = {
    getParametroPadrao,
};
