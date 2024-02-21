import { passwordHash } from '../utils/hashGenerator.js';
import db from '../models/index.js';
const User = db.users;

export const create = async (req, res) => {
    const { name, email, password } = req.body;
    const { salt, hashedPassword } = passwordHash(password);
    const data = { name, email, salt, hashedPassword };

    await User.create(data, {
        fields: ['name', 'email', 'salt', 'hashedPassword'],
    })
        .then(data => {
            res.status(201).json({ message: 'User created!', id: data.id });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || 'Some error occurred while creating users.',
            });
        });
};

export const findAll = async (req, res) => {
    const userId = req.user.userId;
    const role = req.user.userRole;

    if (role == 'admin') {
        await User.findAll({
            attributes: ['id', 'name', 'email'],
        })
            .then(data => {
                res.json(data);
            })
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message ||
                        'Some error occurred while retrieving users.',
                });
            });
    } else {
        res.status(401).send({
            message: "Ops! You don't have rights to access this resouce.",
        });
    }
};

export const findById = async (req, res) => {
    const userId = req.user.userId;

    await User.findByPk(userId, {
        attributes: ['id', 'name', 'email'],
    })
        .then(data => {
            if (data) {
                res.json(data);
            } else {
                res.status(404).json({
                    error: `No user found with id: ${userId}`,
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message ||
                    'Some error occurred while retrieving user with id=' + id,
            });
        });
};

export const update = async (req, res) => {
    const data = req.body;
    const userId = req.user.userId;

    if (data.password) {
        const { salt, hashedPassword } = passwordHash(data.password);
        data.salt = salt;
        data.hashedPassword = hashedPassword;
    }

    await User.update(data, {
        where: { id: userId },
        fields: ['name', 'email', 'salt', 'hashedPassword'],
    })
        .then(dbData => {
            if (dbData && dbData == 1) {
                res.json({ message: `User updated! User ID: ${userId}` });
            } else {
                res.status(400).json({
                    error: `There was an issue with your request, please try again. User ID: ${userId}`,
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || 'Some error occurred while updating users.',
            });
        });
};

export const remove = async (req, res) => {
    const userId = req.user.userId;

    await User.destroy({ where: { id: userId } })
        .then(data => {
            if (data && data == 1) {
                res.status(200).json({
                    message: `User profile id: ${userId} deleted!`,
                });
            } else {
                res.status(404).json({
                    error: `No user found with id: ${userId}`,
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || 'Some error occurred while deleting users.',
            });
        });
};
