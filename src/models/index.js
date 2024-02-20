import dbConfig from '../config/db.config.js';
import Sequelize from 'sequelize';
const { DB, USER, PASSWORD, HOST, dialect, pool } = dbConfig;

const sequelize = new Sequelize(DB, USER, PASSWORD, {
    host: HOST,
    dialect: dialect,

    pool: {
        max: pool.max,
        min: pool.min,
        acquire: pool.acquire,
        idle: pool.idle,
    },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

import User from './user.model.js';
db.users = User(sequelize, Sequelize);
import Task from './task.model.js';
db.tasks = Task(sequelize, Sequelize);

db.users.hasMany(db.tasks, { as: "tasks" });
db.tasks.belongsTo(db.users, {
  foreignKey: "userId"
});

export default db;
