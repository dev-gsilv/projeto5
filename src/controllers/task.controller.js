import { taskStatus } from '../models/task.model.js';
import db from '../models/index.js';
const Task = db.tasks;
const User = db.users;

export const create = async (req, res) => {
    const data = req.body;
    const userId = req.user.userId;

    if (data.status) {
        if (!taskStatus.includes(data.status)) {
            return res.status(400).json({
                message:
                    'Task status must be: pending, in_progress or completed.',
            });
        }
    }

    await Task.create({ ...data, userId: userId })
        .then(data => {
            res.status(201).json(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || 'Some error occurred while creating tasks.',
            });
        });
};

export const findAll = async (req, res) => {
    const userId = req.user.userId;

    await Task.findAll({ where: { userId: userId } })
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
    const userId = req.user.userId;
    let data = null;

    data = await Task.findOne({
        where: {
            id: taskId,
            userId: userId,
        },
        // EagerLoading carregando apenas o nome do user.
        include: {
            model: User,
            attributes: ['name'],
        },
    })
        .then(data => {
            if (data) {
                return res.json({ task: data });
            }
            throw new taskNotFoud(taskId);
        })
        .catch(err => {
            if (err instanceof taskNotFoud) {
                res.status(404).send({
                    message: err.message,
                });
            } else {
                res.status(500).send({
                    message:
                        err.message ||
                        'Some error occurred while retrieving tasks.',
                });
            }
        });
};

export const update = async (req, res) => {
    const data = req.body;
    const id = req.params.id;
    const userId = req.user.userId;

    if (data.status) {
        if (!taskStatus.includes(data.status)) {
            return res.status(400).json({
                message:
                    'Task status must be pending, in_progress or completed. ',
            });
        }
    }

    await Task.update(data, {
        where: { id: id, userId: userId },
    })
        .then(async data => {
            // Valida se o DB atualizou 1 ou mais rows, senão lança uma exceção
            if (data > 0) {
                function findTask() {
                    return Task.findByPk(id);
                }
                const updatedTask = await findTask();
                return res.json({
                    message: `Task updated!`,
                    task: updatedTask,
                });
            }
            throw new taskNotFoud(id);
        })
        .catch(err => {
            if (err instanceof taskNotFoud) {
                res.status(404).send({
                    message: err.message,
                });
            } else {
                res.status(500).send({
                    message:
                        err.message ||
                        'Some error occurred while retrieving tasks.',
                });
            }
        });
};

export const remove = async (req, res) => {
    const id = req.params.id;

    await Task.destroy({ where: { id: id } })
        .then(data => {
            if (data == 1) {
                res.status(200).send({
                    message: `task id: ${id} deleted from DB.`,
                });
            } else {
                res.status(404).send({
                    message: `task id: ${id} not found on DB.`,
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || 'Some error occurred while deleting tasks.',
            });
        });
};

class taskNotFoud extends Error {
    constructor(taskId) {
        super();
        this.name = this.constructor.name;
        this.message = `Task id=${taskId} not found`;
    }
}
