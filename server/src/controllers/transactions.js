const knex = require('../connect');

async function listUserTransactions(req, res) {
    const userId = req.user.id;

    try {
        const transactions = await knex.queryBuilder()
            .select(
                'transacoes.id',
                'transacoes.tipo',
                'transacoes.descricao',
                'transacoes.valor',
                'transacoes.data',
                'transacoes.usuario_id',
                'transacoes.categoria_id',
                'categorias.descricao AS categoria_nome'
            )
            .from('transacoes')
            .join(
                'categorias',
                'transacoes.categoria_id',
                '=',
                'categorias.id'
            )
            .where('transacoes.usuario_id', userId)

        return res.status(200).json(transactions)

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ "mensagem": "Erro interno do servidor" });
    }
}

async function checkUserTransactionById(req, res) {
    const transactionId = req.params.id;
    const userId = req.user.id;

    const isTransactionValid = await knex.queryBuilder()
        .select('*')
        .from('transacoes')
        .where('id', transactionId)
        .first()

    if (!isTransactionValid) {
        return res.status(404).json({ "mensagem": "Transação não encontrada no banco de dados" });
    }

    try {
        const transactions = await knex.queryBuilder()
            .select('*')
            .from('transacoes')
            .where('id', transactionId)
            .andWhere('usuario_id', userId)
            .first()

        return res.status(200).json(transactions);

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ "mensagem": "Erro interno do servidor" });
    }
}

async function registerUserTransaction(req, res) {
    const {
        descricao: description,
        valor: value,
        data: date,
        categoria_id: categoryId,
        tipo: type
    } = req.body;
    const userId = req.user.id;

    if (!description || !value || !date || !categoryId || !type) {
        return res.status(400).json({ "mensagem": "Todos os campos obrigatórios devem ser informados." });
    }

    try {
        const isCategoryValid = await knex.queryBuilder()
            .select('*')
            .from('categorias')
            .where('id', categoryId)
            .first()

        if (!isCategoryValid) {
            return res.status(404).json({ "mensagem": "Categoria de transação não encontrada no banco de dados" });
        }

        if (type !== "entrada" && type !== "saida") {
            return res.status(400).json({ "mensagem": "Tipo de transação não reconhecido" });
        }

        const query = `INSERT INTO transacoes (descricao, valor, data, categoria_id, usuario_id, tipo)
                        VALUES ($1, $2, $3, $4, $5, $6)
                        RETURNING *`;

        const newTransaction = await knex.queryBuilder()
            .insert({
                descricao: description,
                valor: value,
                data: date,
                categoria_id: categoryId,
                usuario_id: userId,
                tipo: type
            })
            .from('transacoes')
            .returning('*')

        return res.status(201).json(newTransaction[0]);

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ "mensagem": "Erro interno do servidor" });
    }
}

async function updateUserTransaction(req, res) {
    const {
        descricao: description,
        valor: value,
        data: date,
        categoria_id: categoryId,
        tipo: type
    } = req.body;
    const transactionId = req.params.id;
    const userId = req.user.id;

    if (!description || !value || !date || !categoryId || !type) {
        return res.status(400).json({ "mensagem": "Todos os campos obrigatórios devem ser informados." });
    }

    if (type !== "entrada" && type !== "saida") {
        return res.status(400).json({ "mensagem": "Tipo de transação não reconhecido" });
    }

    const isTransactionValid = await knex.queryBuilder()
        .select('*')
        .from('transacoes')
        .where('id', transactionId)
        .andWhere('usuario_id', userId)
        .first()

    if (!isTransactionValid) {
        return res.status(404).json({ "mensagem": "Transação não encontrada no banco de dados" });
    }

    try {
        const updatedTransaction = await knex.queryBuilder()
            .update({
                descricao: description,
                valor: value,
                data: date,
                categoria_id: categoryId,
                tipo: type,
                id: transactionId
            })
            .from('transacoes')
            .where('id', transactionId)
            .returning('*')

        return res.status(204).json(updatedTransaction[0]);

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ "mensagem": "Erro interno do servidor" });
    }
}

async function deleteUserTransaction(req, res) {
    const transactionId = req.params.id;
    const userId = req.user.id;

    const isTransactionValid = await knex.queryBuilder()
        .select('*')
        .from('transacoes')
        .where('id', transactionId)
        .andWhere('usuario_id', userId)
        .first()

    if (!isTransactionValid) {
        return res.status(404).json({ "mensagem": "Transação não encontrada no banco de dados" });
    }

    try {
        const result = await knex.queryBuilder()
            .del()
            .from('transacoes')
            .where('id', transactionId)
            .andWhere('usuario_id', userId)
            .returning('*')

        if (result.length === 0) {
            return res.status(400).json({ "mensagem": "Erro ao deletar transação" });
        }

        return res.status(204).send();

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ "mensagem": "Erro interno do servidor" });
    }
}

async function getAllTransactionStatement(req, res) {
    const userId = req.user.id;

    try {
        const statementArray = await knex.queryBuilder()
            .select(
                'usuario_id',
                'tipo',
                knex.raw('SUM(valor) AS total')
            )
            .from('transacoes')
            .where('usuario_id', userId)
            .groupBy('usuario_id', 'tipo')


        const statementObj = {
            "entrada": Number(statementArray[0].total),
            "saida": Number(statementArray[1].total)
        };

        return res.status(200).json(statementObj);

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ "mensagem": "Erro interno do servidor" });
    }

}

module.exports = {
    listUserTransactions,
    checkUserTransactionById,
    registerUserTransaction,
    updateUserTransaction,
    deleteUserTransaction,
    getAllTransactionStatement
};