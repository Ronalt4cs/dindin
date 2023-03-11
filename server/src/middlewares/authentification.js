const jwt = require('jsonwebtoken');
const jwtSignature = require('../jwtSignature');
const knex = require('../connect');

async function verifyLoggedInUser(req, res, next) {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ "mensagem": "Não autorizado" });
    }

    const token = authorization.split(" ")[1];

    try {
        const { id } = jwt.verify(token, jwtSignature);

        const user = await knex.queryBuilder()
            .select('*')
            .from('usuarios')
            .where('id', id)
            .first()

        if (!user) {
            return res.status(401).json({ "mensagem": "Não autorizado" });
        }

        req.user = user;

        next()

    } catch (error) {
        console.log(error.message);
        return res.status(401).json({ "mensagem": "Não autorizado" });
    }
}

module.exports = verifyLoggedInUser;