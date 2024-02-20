import { Task } from '../models/task.model.js';

async function findAll(req, res) {
    Task.findAll().then(result => {
        res.json(result);
    });
}

async function findById(req, res) {
    const taskId = req.query.id;

    const data = await Task.findOne({
        where: {
            id: taskId,
        },
        include: UserModel,
    });
    console.log(data);

    res.status(200).json({ data });
}

async function create(req, res) {
    const data = req.body;
    const userId = req.headers.id_user;
    Task.create({ ...data, userId: userId }).then(result => {
        res.json(result);
    });
}

async function update(req, res) {
    const data = req.body;
    const id = req.params.id;

    Task.update(data, {
        where: { id: id },
    }).then(result => {
        res.json(result);
    });
}

async function remove(req, res) {
    const id = req.params.id;

    Task.destroy({ where: { id: id } }).then(result => {
        res.json(result);
    });
}
