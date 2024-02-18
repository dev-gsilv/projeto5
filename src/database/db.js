import { Sequelize } from 'sequelize';
import 'dotenv/config';

const { DB_NAME, DB_USER, DB_HOST, DB_PASS } = process.env;

export const db = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
    dialect: 'mysql',
    host: DB_HOST,
});

db.authenticate()
    .then(() => {
        console.log(`Database connected: ${DB_NAME}`);
        db.sync();
    })
    .catch((err) => {
        console.log(`Error trying to connect to DB: ${DB_NAME}.\n >`,err.message);
    });

