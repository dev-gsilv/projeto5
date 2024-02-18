import express from 'express';
import { testing } from '../controllers/health.controller.js';
import { findAll, findById, create, update, remove } from '../controllers/user.controller.js';

export const routes = express.Router();

routes.get('/healthcheck', testing);
routes.get('/users', findAll);
routes.get('/users/:id', findById);
routes.post('/users', create);
routes.put('/users/:id', update);
routes.delete('/users/:id', remove);
