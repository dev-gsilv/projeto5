import express from 'express';
import { loggerMorgan } from '../utils/logger.morgan.js';
import { testing } from '../controllers/health.controller.js';
import * as user from '../controllers/user.controller.js';
// import { Task } from '../models/task.model.js';

export const router = express.Router();

loggerMorgan(router);

router.get('/healthcheck', testing);

//router.post('/login', login);
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

// Task router
// router.get('/tasks/all', Task.findAll.bind(Task));

// router
//     .route('/tasks')
//     .all((req, res, next) => {
//         next();
//     })
//     .get(Task.findById.bind(User))
//     .post(Task.create.bind(User));

// router
//     .route('/task/:id')
//     .all((req, res, next) => {
//         next();
//     })
//     .put(Task.update.bind(User))
//     .delete(Task.remove.bind(User));
