import { testing } from '../controllers/health.controller.js';

export const healthRoutes = app => {
    app.get('/healthcheck', testing);
};
