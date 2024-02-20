export default (sequelize, DataTypes) => {
    const Task = sequelize.define(
        'task',
        {
            id: {
                type: DataTypes.INTEGER.UNSIGNED,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            description: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            status: {
                type: DataTypes.ENUM('pending', 'in_progress', 'completed'),
                defaultValue: 'pending',
            },
            dueDate: {
                type: DataTypes.DATE,
                allowNull: true,
            },
        },
        {
            tableName: 'tb_task',
            timeStamps: true,
        },
    );
    return Task;
};
