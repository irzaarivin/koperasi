const { Op } = require('sequelize')

module.exports = async (Item) => {
    return {
        getItems: async (params) => {
            try {
                const { sold, stock, status } = params;

                let whereClause = {};
                let orderClause = [];
                            
                if (status) {
                    whereClause.status = status;
                }
                            
                if (sold === 'ASC' || sold === 'DESC') {
                    orderClause.push(['total_sold', sold]);
                }

                if (stock === 'ASC' || stock === 'DESC') {
                    orderClause.push(['stock', stock]);
                }

                const items = await Item.findAll({ where: whereClause, order: orderClause });

                return items;
            } catch (error) {
                console.log({error})
                throw new Error(error)
            }
        },

        getOneItem: async (id) => {
            try {
                const item = await Item.findOne({
                    where: { id }
                });
                return item;
            } catch (error) {
                console.error(error);
                throw new Error(error);
            }
        },

        createItem: async (data) => {
            try {
                return await Item.create(data)
            } catch (error) {
                console.log({error})
                throw new Error(error)
            }
        },

        updateItem: async (id, data) => {
            try {
                const [rowsAffected] = await Item.update(data, { where: { id } });
                if (rowsAffected > 0) {
                    const updatedItem = await Item.findOne({ where: { id } });
                    return updatedItem
                } else {
                    throw new Error("Item tidak ditemukan!")
                }
            } catch (error) {
                console.error(error);
                throw new Error(error);
            }
        },

        deleteItem: async (id) => {
            try {
                const rowsAffected = await Item.destroy({ where: { id } });
                if (rowsAffected > 0) {
                    return { message: "Item berhasil dihapus" };
                } else {
                    throw new Error("Item tidak ditemukan")
                }
            } catch (error) {
                console.error(error);
                throw new Error(error);
            }
        }
    }
}