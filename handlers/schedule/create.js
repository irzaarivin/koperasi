const Joi = require('joi')

const validate = (data) => {
    const schema = Joi.object({
        staffId: Joi.number().required().messages({
            'any.required': 'Staff ID is required!',
            'number.base': 'Staff ID must be a number!',
        }),
        date: Joi.date().required().messages({
            'any.required': 'Date is required!',
            'date.base': 'Date must be a valid date!'
        }),
        status: Joi.string().valid('pending', 'ongoing', 'complete').required().messages({
            'any.only': 'Status must be "pending", "ongoing", or "complete"!',
            'any.required': 'Status is required!'
        }),
        description: Joi.string().allow(null).optional().messages({
            'string.empty': 'Description cannot be empty!'
        })
    });

    const { error } = schema.validate(data);
    return error;
}

const createSchedule = async (repositories, data) => {
    const { createSchedule } = repositories.scheduleRepositories

    const validation = validate(data);
    if(validation) return { status: "Failed", error: validation.message }

    const callback = await createSchedule(data).then(result => {
        data.id = result[0]
        return data
    })

    if(callback) return { status: "Success", data: callback }
    return { status: "Failed" }
}

module.exports = createSchedule