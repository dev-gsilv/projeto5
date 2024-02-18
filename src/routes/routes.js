import express from 'express';
import { testing } from '../controllers/health.controller.js';

export const routes = express.Router();

routes.get('/healthcheck', testing);
