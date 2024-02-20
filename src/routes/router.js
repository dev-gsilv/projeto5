import express from 'express';
import { loggerMorgan } from '../utils/logger.morgan.js';
import * as user from '../controllers/user.controller.js';
import * as task from '../controllers/task.controller.js';
import * as auth from '../controllers/auth.controller.js';

export const router = express.Router();

loggerMorgan(router);

router.get('/healthcheck', (req, res) => {
    res.json({ message: 'Health check: server online!' });
});

router.post('/login', auth.login);
router.post('/logout', auth.authorization, auth.logout);

// User router
router
    .route('/users')
    .all(auth.authorization)
    .get(user.findById)
    .put(user.update)
    .delete(user.remove)
    // .get(user.findAll) >>> Rota desativada, devido à lógica de negócio
router
    .route('/register')
    .post(user.create)

// task router
router.get('/tasks/all', auth.authorization, task.findAll);
router.route('/tasks').all(auth.authorization).post(task.create);
router
    .route('/tasks/:id')
    .all(auth.authorization)
    .get(task.findById)
    .put(task.update)
    .delete(task.remove);
