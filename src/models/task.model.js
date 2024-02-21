export const taskStatus = ['pending', 'in_progress', 'completed'];

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
                type: DataTypes.ENUM(taskStatus),
                defaultValue: 'pending',
            },
            dueDate: {
                type: DataTypes.DATE,
                allowNull: true,
                defaultValue: getTomorrowDate(),
            },
        },
        {
            tableName: 'tb_task',
            timeStamps: true,
        },
    );
    return Task;
};

function getTomorrowDate() {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow;
}
