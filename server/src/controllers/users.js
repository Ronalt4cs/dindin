const knex = require('../connect');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const jwtSignature = require('../jwtSignature');

async function signUpUser(req, res) {
    const { nome: name, email, senha: password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ "mensagem": "É necessário preencher todos os campos de cadastro" });
    }

    const isEmailValid = await knex.queryBuilder()
        .select('*')
        .from('usuarios')
        .where('email', email)
        .first()

    if (isEmailValid) {
        return res.status(403).json({ "mensagem": "Já existe usuário cadastrado com o e-mail informado." });
    }

    try {
        const encryptedPassword = await bcrypt.hash(password, 10);

        const newUser = await knex.queryBuilder()
            .insert({
                nome: name,
                email,
                senha: encryptedPassword
            })
            .from('usuarios')
            .returning('*')

        return res.status(201).json(newUser[0]);

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ "mensagem": "Erro interno do servidor" });
    }
}

async function logInUser(req, res) {
    const { email, senha: password } = req.body;

    try {
        const user = await knex.queryBuilder()
            .select('*')
            .from('usuarios')
            .where('email', email)
            .first()

        if (!user) {
            return res.status(404).json({ "mensagem": "E-mail ou senha inválido(s)" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.senha);

        if (!isPasswordValid) {
            return res.status(404).json({ "mensagem": "E-mail ou senha inválido(s)" });
        }

        const token = jwt.sign({ id: user.id }, jwtSignature, { expiresIn: '1d' });

        const { senha: _, ...loggedInUser } = user;

        return res.status(200).json({ "user": loggedInUser, token });

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ "mensagem": "Erro interno do servidor" });
    }
}

async function checkUserProfile(req, res) {
    const { id, nome, email } = req.user
    return res.status(200).json({
        id,
        nome,
        email
    });
}

async function updateUser(req, res) {
    const { nome: name, email, senha: password } = req.body;
    const userId = req.user.id;

    if (!name || !email || !password) {
        return res.status(400).json({ "mensagem": "É necessário preencher todos os campos de cadastro" });
    }

    const isEmailValid = await knex.queryBuilder()
        .select('*')
        .from('usuarios')
        .where('email', email)

    if (isEmailValid.length > 1) {
        return res.status(403).json({ "mensagem": "O e-mail informado já está sendo utilizado por outro usuário." });
    }

    try {
        const encryptedPassword = await bcrypt.hash(password, 10);

        const updatedUser = await knex.queryBuilder()
            .where('id', userId)
            .update(
                {
                    nome: name,
                    email,
                    senha: encryptedPassword
                }
            )
            .from('usuarios')
            .returning('*')


        return res.status(204).json(updatedUser[0]);

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ "mensagem": "Erro interno do servidor" });
    }
}

module.exports = {
    signUpUser,
    logInUser,
    checkUserProfile,
    updateUser
}