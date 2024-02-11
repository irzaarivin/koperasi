const Joi = require('joi')

const validate = (data) => {
    const schema = Joi.object({
        id: Joi.number().required()
    });

    const { error } = schema.validate(data);
    return error;
}

const getItems = async (repositories, id) => {
    const { getOneItem } = repositories.itemRepositories

    const validation = await validate({id});
    if(validation) return { status: "Failed", error: validation.message }

    const data = await getOneItem(id)

    if(data) return { status: "Success", data }
    return { status: "Failed" }
}

module.exports = getItems