import { Sequelize } from 'sequelize';
import { db } from '../database/db.js';

export const User = db.define(
    'user',
    {
        id: {
            type: Sequelize.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        nome: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
        },
    },
    {
        tableName: 'tb_users',
        timeStamps: true,
    },
);
