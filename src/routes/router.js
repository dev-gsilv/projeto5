import { healthRoutes } from './healthcheck.js';

export const router = app => {
    healthRoutes(app);
};
