import express from 'express';
import { loggerMorgan } from '../utils/logger.morgan.js';
import * as user from '../controllers/user.controller.js';
import * as task from '../controllers/task.controller.js';
import * as auth from '../controllers/authentication.controller.js'

export const router = express.Router();

loggerMorgan(router);

router.get('/healthcheck', (req, res) => {
    res.json({ message: 'Health check: server online!' });
});

router.post('/login', auth.login);
//router.post('/logout', logout);

// User router
router
    .route('/users')
    .all((req, res, next) => {
        next();
    })
    .get(user.findAll)
    .post(user.create);
router
    .route('/users/:id')
    .all((req, res, next) => {
        next();
    })
    .get(user.findById)
    .put(user.update)
    .delete(user.remove);

// task router
router.get('/tasks/all', task.findAll);
router
    .route('/tasks')
    .all((req, res, next) => {
        next();
    })
    .post(task.create);
router
    .route('/tasks/:id')
    .all((req, res, next) => {
        next();
    })
    .get(task.findById)
    .put(task.update)
    .delete(task.remove);
