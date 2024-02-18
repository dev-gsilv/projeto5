import express from 'express';
import 'dotenv/config';
import { routes } from './src/routes/routes.js';
import { db } from './src/database/db.js';
import { loggerMorgan } from './src/utils/logger.morgan.js';

const app = express();
app.use(express.json());
app.use(routes);
loggerMorgan(app);

const PORT = process.env.API_DEV_PORT || 3333;
app.listen(PORT, () =>
    console.log(`Servidor up! http://localhost:${PORT}/healthcheck`),
);
