module.exports = async (Item) => {
    return {
        getItems: async () => {
            try {
                return await Item.findAll()
            } catch (error) {
                console.log({error})
                throw new Error(error)
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
                    return { error: "Item tidak ditemukan!" };
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
                    return { error: "Item tidak ditemukan" };
                }
            } catch (error) {
                console.error(error);
                throw new Error(error);
            }
        }
    }
}