const Schedule = async (Sequelize, sequelize) => {
    return await sequelize.define('Schedule', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        staffId: {
            allowNull: false,
            type: Sequelize.INTEGER
        },
        date: {
            allowNull: false,
            type: Sequelize.DATE
        },
        status: {
            allowNull: false,
            type: Sequelize.STRING
        },
        description: {
            allowNull: true,
            type: Sequelize.STRING
        },
        createdAt: {
            allowNull: false,
            type: Sequelize.DATE
        },
        updatedAt: {
            allowNull: false,
            type: Sequelize.DATE
        }
    })
}

module.exports = Schedule