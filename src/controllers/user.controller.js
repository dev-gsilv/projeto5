import db from '../models/index.js';
const User = db.users;

export const findAll = (req, res) => {
    User.findAll()
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

export const findById = (req, res) => {
    const id = req.params.id;
    User.findByPk(id)
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.status(500).send({
                message: 'Error retrieving Tutorial with id=' + id,
            });
        });
};

export const create = (req, res) => {
    const data = req.body;
    return User.create(data).then(data => {
        res.json(data);
    });
}

export const update = (req, res) => {
    const data = req.body;
    const id = req.params.id;

    User.update(data, {
        where: { id: id },
    }).then(data => {
        res.json(data);
    });
}

export const remove = (req, res) => {
    const id = req.params.id;

    User.destroy({ where: { id: id } }).then(data => {
        res.json(data);
    });
}
