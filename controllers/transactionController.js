const transactionController = async (transactionHandler) => {

    const { getTransactions, createTransaction } = await transactionHandler

    const get = async (req) => {
        const params = req.query
        return await getTransactions(params)
    }

    const create = async (req) => {
        const data = req.body
        return await createTransaction(data)
    }

    return { create, get }

}

module.exports = transactionController