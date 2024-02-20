import express from 'express';
import 'dotenv/config';
import { router } from './src/routes/router.js';
import db from './src/models/index.js';

const app = express();
app.use(express.json());
app.use(router);

db.sequelize
    .sync({ alter: false })
    .then(() => {
        console.log('Synced db.');
    })
    .catch(err => {
        console.log('Failed to sync db: ' + err.message);
    });

const PORT = process.env.API_DEV_PORT || 3333;
app.listen(PORT, () =>
    console.log(`Server running! http://localhost:${PORT}/healthcheck`),
);
