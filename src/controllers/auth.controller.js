import jwt from 'jsonwebtoken';
import { loginHash } from '../utils/hashGenerator.js';
import db from '../models/index.js';
const User = db.users;

export const login = async (req, res, next) => {
    // Login usando Basic Auth header
    const authHeader = req.headers['authorization'];
    let credentials;

    if (authHeader) {
        // Verifica se o cabeçalho começa com "Basic"
        if (authHeader.startsWith('Basic')) {
            // Remove o prefixo "Basic " e decodifica as credentials Base64
            credentials = Buffer.from(
                authHeader.substring(6),
                'base64',
            ).toString('utf-8');
            credentials = credentials.split(':');
        }
    } else {
        // Error handling quando faltar um auth header
        return res.status(400).json({ message: 'Invalid request headers!' });
    }

    const [email, password] = credentials;
    const user = await User.findOne({ where: { email: email } });

    try {
        // Valida se o Sequelize encontrou um user válido
        if (user) {
            const hashedPassword = loginHash(user.salt, password);
            // Valida se a senha do user está correta
            if (user.hashedPassword == hashedPassword) {
                const secretJwt = process.env.JWT_SECRET;
                const token = jwt.sign({ userId: user._id }, secretJwt, {
                    expiresIn: '1h',
                });
                return res.send({ token });
            }
        }
        // Error handling para user ou senha inválidos
        throw new Error('Invalid credentials.');
    } catch (err) {
        console.error(
            `${new Date().toISOString()} - [AUTH ERROR] ${err.message}`,
        );
        res.status(401).send({ message: err.message });
    }
};

export const logout = (req, res, next) => {
    if (req.user) {
        req.user = undefined;
        return res.json({ message: 'User logged out.' });
    }
    return res.status(204).json({ message: 'No user logged.' });
};

export const authorization = (req, res, next) => {
    const token = req.headers.authorization_token;

    if (!token) {
        return res.status(401).json({ error: 'Login to access this resource.' });
    }

    try {
        const decodedTokenData = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decodedTokenData;
        next();
    } catch (err) {
        return res.status(401).json({ err: 'Invalid session token.' });
    }
};
