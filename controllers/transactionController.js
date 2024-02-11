const { createPublicKey } = require("crypto")
const createBulkTransaction = require("../handlers/transaction/create-bulk")

const transactionController = async (transactionHandler) => {

    const { getTransactions, createTransaction, createBulkTransaction } = await transactionHandler

    const get = async (req) => {
        const params = req.query
        return await getTransactions(params)
    }

    const create = async (req) => {
        const data = req.body
        return await createTransaction(data)
    }

    const createBulk = async (req) => {
        const data = req.body
        return await createBulkTransaction(data)
    }

    return { create, createBulk, get }

}

module.exports = transactionController