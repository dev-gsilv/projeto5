import express from 'express';
import { testing } from '../controllers/health.controller.js';
import { findAll } from '../controllers/user.controller.js';

export const routes = express.Router();

routes.get('/healthcheck', testing);
routes.get('/users', findAll);
