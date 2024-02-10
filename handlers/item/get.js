const Joi = require('joi')

const validate = (data) => {
    const schema = Joi.object({
        sold: Joi.string().valid('terlaris', 'tersepi'),
        stock: Joi.string().valid('terbanyak', 'tersedikit'),
        status: Joi.string().valid('available', 'unavailable')
    });

    const { error } = schema.validate(data);
    return error;
}

const getItems = async (repositories, params) => {
    const { getItems } = repositories.itemRepositories

    const validation = validate({ sold: params.sold, stock: params.stock, status: params.status });
    if(validation) return { status: "Failed", error: validation.message }

    const sold = params.sold == 'terlaris' ? 'DESC' : params.sold == 'tersepi' ? 'ASC' : null
    const stock = params.stock == 'terbanyak' ? 'DESC' : params.stock == 'tersedikit' ? 'ASC' : null
    const status = params.status

    const data = await getItems({sold, stock, status})

    if(data) return { status: "Success", data }
    return { status: "Failed" }
}

module.exports = getItems