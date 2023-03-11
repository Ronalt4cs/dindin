const knex = require('../connect');

async function listAllCategories(req, res) {

    try {
        const categories = await knex.queryBuilder()
            .select('*')
            .from('categorias')

        const result = categories.map((category) => ({
            id: category.id,
            descricao: category.descricao
        }));

        return res.status(200).json(result);

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ "mensagem": "Erro interno do servidor" });
    }
}

module.exports = listAllCategories;