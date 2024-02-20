import jwt from 'jsonwebtoken'
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
        }
    
        const [email, password] = credentials;
        const user = await User.findOne({ email });
    
        try {
            if (user) {
                const hashedPassword = loginHash(user.salt, password);
                if (user.hashedPassword == hashedPassword) {
                    const secretJwt = process.env.JWT_SECRET;
                    const token = jwt.sign({ userId: user._id }, secretJwt, {
                        expiresIn: '1h',
                    });
                    res.send({ token });
                } else throw new Error('Invalid credentials.');
            } else throw new Error('Invalid credentials.');
        } catch (err) {
            console.error(`${new Date().toISOString()} - [ERROR] ${err.message}`);
            res.status(401).send(err.message);
        }
    };

export const logout = () => {};
