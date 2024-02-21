export default (sequelize, DataTypes) => {
    const User = sequelize.define(
        'user',
        {
            id: {
                type: DataTypes.INTEGER.UNSIGNED,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            salt: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            hashedPassword: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            role: {
                type: DataTypes.ENUM(['admin', 'user']),
                defaultValue: 'user',
            },
        },
        {
            tableName: 'tb_users',
            timeStamps: true,
        },
    );
    return User;
};
