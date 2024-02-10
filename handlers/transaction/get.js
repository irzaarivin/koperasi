const getTransactions = async (repositories, params) => {
    const { getTransactions } = repositories.transactionRepositories
    let data

    data = await getTransactions()

    if(data) return { status: "Success", data }
    return { status: "Failed" }
}

module.exports = getTransactions