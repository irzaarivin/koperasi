const Item = async (Sequelize, sequelize) => {
    return await sequelize.define('Item', {
        name: Sequelize.STRING,
        slug: Sequelize.STRING,
        description: Sequelize.STRING,
        price: Sequelize.INTEGER,
        stock: Sequelize.INTEGER,
        status: Sequelize.STRING,
        total_sold: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        image: Sequelize.STRING
    })
}

module.exports = Item