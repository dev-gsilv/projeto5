import { User } from '../models/user.model.js';

export async function findAll(req, res) {
    User.findAll().then(result => {
        res.json(result);
    });
}

export async function findById(req, res) {
    const id = req.params.id;
    User.findByPk(id).then(result => {
        res.json(result);
    });
}

export async function create(req, res) {
    const data = req.body;
    User.create(data).then(result => {
        res.json(result);
    });
}

export async function update(req, res) {
    const data = req.body;
    const id = req.params.id;

    User.update(data, {
        where: { id: id },
    }).then(result => {
        res.json(result);
    });
}

export async function remove(req, res) {
    const id = req.params.id;

    User.destroy({ where: { id: id } }).then(result => {
        res.json(result);
    });
}
