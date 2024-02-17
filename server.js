import express from 'express';
import { dbConn } from './src/database/mysql.js';
import { router } from './src/routes/router.js';

const app = express();
app.use(express.json());

dbConn();
router(app);

const PORT = process.env.PORT || 3333;
app.listen(PORT, () =>
    console.log(`Servidor up! Teste aqui http://localhost:${PORT}/healthcheck`),
);
