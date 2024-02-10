const Transaction = async (Sequelize, sequelize) => {
    return await sequelize.define('Transaction', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        itemId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'Items',
                key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        },
        quantity: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        totalPrice: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        transactionDate: {
            type: Sequelize.DATE,
            allowNull: false
        },
        createdAt: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        },
        updatedAt: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        }
    })
}

module.exports = Transaction