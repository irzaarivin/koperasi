const Joi = require('joi')
const currentDate = new Date();

const validate = (data) => {
    const schema = Joi.object({
        prices: Joi.number().positive().required().messages({
            'number.base': 'Total price harus berupa angka.',
            'number.positive': 'Total price harus bernilai positif.',
            'any.required': 'Total price diperlukan.'
        }),
        items: Joi.array().items(
            Joi.object({
                itemId: Joi.number().integer().positive().required().messages({
                    'number.base': 'Item ID harus berupa angka.',
                    'number.integer': 'Item ID harus berupa bilangan bulat.',
                    'number.positive': 'Item ID harus bernilai positif.',
                    'any.required': 'Item ID diperlukan.'
                }),
                quantity: Joi.number().integer().positive().required().messages({
                    'number.base': 'Quantity harus berupa angka.',
                    'number.integer': 'Quantity harus berupa bilangan bulat.',
                    'number.positive': 'Quantity harus bernilai positif.',
                    'any.required': 'Quantity diperlukan.'
                })
            })
        )
    });

    const { error } = schema.validate(data);
    return error;
}

const thisTime = async () => {
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');

    const thisTime = `${year}-${month}-${day}`;

    return thisTime;
}

const createBulkTransaction = async (repositories, data) => {
    const { createTransaction } = repositories.transactionRepositories
    const { getOneItem, updateItem } = repositories.itemRepositories
    const error = []

    const validation = validate(data)
    if(validation) return { status: "Failed", error: validation.message }

    for (const payload of data.items) {
        const { itemId, quantity } = payload
        const updatedData = {}

        const item = await getOneItem(itemId)

        if(!item) return { status: "Failed", message: "Item tidak ditemukan" }
        if(item.status == 'unavailable' && (quantity > item.stock || item.stock == 0)) return { status: "Failed", message: `Stok ${item.stock == 0 ? 'Habis' : 'tersisa ' + item.stock}` }

        updatedData.stock = item.stock - quantity
        updatedData.total_sold = item.total_sold + quantity
        if(item.stock - quantity == 0) updatedData.status = 'unavailable'

        const deplete = await updateItem(itemId, updatedData)
        if(!deplete) error.push({ status: "Failed", message: "Gagal mendeplete stok item" })

        payload.detail = {}
        payload.detail.id = deplete.id
        payload.detail.name = deplete.name
        payload.detail.description = deplete.description
        payload.detail.price = deplete.price
        payload.detail.status = deplete.status
        payload.detail.image = deplete.image
    }

    data.date = await thisTime()

    const callback = await createTransaction(data)

    if(callback.length != 0) return { status: "Success", data: callback }
    return { status: "Failed" }
}

module.exports = createBulkTransaction