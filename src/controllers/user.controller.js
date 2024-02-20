import { passwordHash } from '../utils/hashGenerator.js';
import db from '../models/index.js';
const User = db.users;

export const findAll = async (req, res) => {
    await User.findAll()
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
};

export const findById = async (req, res) => {
    const id = req.params.id;
    await User.findByPk(id)
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message ||
                    'Some error occurred while retrieving user with id=' + id,
            });
        });
};

export const create = async (req, res) => {
    const { name, email, password } = req.body;
    const { salt, hashedPassword } = passwordHash(password);
    const data = { name, email, salt, hashedPassword };

    await User.create(data)
        .then(data => {
            res.status(201).json(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || 'Some error occurred while creating users.',
            });
        });
};

export const update = async (req, res) => {
    const data = req.body;
    const id = req.params.id;

    await User.update(data, {
        where: { id: id },
    })
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || 'Some error occurred while updating users.',
            });
        });
};

export const remove = async (req, res) => {
    const id = req.params.id;

    await User.destroy({ where: { id: id } })
        .then(data => {
            res.status(204).json(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || 'Some error occurred while deleting users.',
            });
        });
};
