import db from '../models/index.js';
const Task = db.tasks;
const User = db.users;

export const findAll = async (req, res) => {
    await Task.findAll()
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message ||
                    'Some error occurred while retrieving tasks.',
            });
        });
};

export const findById = async (req, res) => {
    const taskId = req.params.id;

    const data = await Task.findOne({
        where: {
            id: taskId,
        },
        // EagerLoading carregando apenas o nome do user.
        include: {
            model: User,
            attributes: ['name'],
        },
    })
        .then(res.json({ data }))
        .catch(err => {
            res.status(500).send({
                message:
                    err.message ||
                    'Some error occurred while retrieving tasks.',
            });
        });
};

export const create = async (req, res) => {
    const data = req.body;
    const userId = req.headers.id_user;

    await Task.create({ ...data, userId: userId })
        .then(data => {
            res.status(201).json(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message ||
                    'Some error occurred while creating tasks.',
            });
        });
};

export const update = async (req, res) => {
    const data = req.body;
    const id = req.params.id;

    await Task.update(data, {
        where: { id: id },
    })
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message ||
                    'Some error occurred while updating tasks.',
            });
        });
};

export const remove = async (req, res) => {
    const id = req.params.id;

    await Task.destroy({ where: { id: id } })
        .then(data => {
            res.status(204).json(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message ||
                    'Some error occurred while deleting tasks.',
            });
        });
};
