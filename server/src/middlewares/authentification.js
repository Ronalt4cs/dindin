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

        const query = "SELECT * FROM usuarios WHERE id = $1";
        const { rows, rowCount } = await pool.query(query, [id]);

        const user = await knex.queryBuilder()
            .select('*')
            .from('ususario')
            .where('id', id)

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