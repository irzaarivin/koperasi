module.exports = async (Transaction) => {
    return {
        getTransactions: async () => {
            try {
                return await Transaction.findAll()
            } catch (error) {
                console.log({error})
                throw new Error(error)
            }
        },

        createTransaction: async (data) => {
            try {
                return await Transaction.create(data)
            } catch (error) {
                console.log({error})
                throw new Error(error)
            }
        },

        updateTransaction: async (id, data) => {
            try {
                const [rowsAffected] = await Transaction.update(data, { where: { id } });
                if (rowsAffected > 0) {
                    const updatedItem = await Transaction.findOne({ where: { id } });
                    return updatedItem
                } else {
                    return { error: "Transaction tidak ditemukan!" };
                }
            } catch (error) {
                console.error(error);
                throw new Error(error);
            }
        },

        deleteTransaction: async (id) => {
            try {
                const rowsAffected = await Transaction.destroy({ where: { id } });
                if (rowsAffected > 0) {
                    return { message: "Transaction berhasil dihapus" };
                } else {
                    return { error: "Transaction tidak ditemukan" };
                }
            } catch (error) {
                console.error(error);
                throw new Error(error);
            }
        }
    }
}