const getItems = async (repositories, params) => {
    const { getItems } = repositories.itemRepositories
    let data

    data = await getItems()

    if(data) return { status: "Success", data }
    return { status: "Failed" }
}

module.exports = getItems