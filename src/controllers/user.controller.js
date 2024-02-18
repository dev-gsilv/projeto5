import { User } from '../models/user.model.js';

export async function findAll(req, res) {
    User.findAll().then((result) => {res.json(result)})
}
