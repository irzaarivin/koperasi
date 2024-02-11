const Joi = require('joi')
const currentDate = new Date();

const validate = (data) => {
    const schema = Joi.object({
        totalPrice: Joi.number().positive().required().messages({
            'number.base': 'Total price harus berupa angka.',
            'number.positive': 'Total price harus bernilai positif.',
            'any.required': 'Total price diperlukan.'
        }),
        data: Joi.array().items(
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

    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
    const seconds = String(currentDate.getSeconds()).padStart(2, '0');

    const thisTime = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`;

    return thisTime
}

const createBulkTransaction = async (repositories, data) => {
    const { createTransaction } = repositories.transactionRepositories
    const { getOneItem, updateItem } = repositories.itemRepositories
    const callback = []

    const validation = validate(data)
    if(validation) return { status: "Failed", error: validation.message }

    for(const payload of data.data) {
        const { itemId, quantity } = payload
        const updatedData = {}

        const item = await getOneItem(itemId)
        const totalPrice = item.price * quantity
        if(!item) return { status: "Failed", message: "Item tidak ditemukan" }
        if(item.status == 'unavailable' && (quantity > item.stock || item.stock == 0)) return { status: "Failed", message: `Stok ${item.stock == 0 ? 'Habis' : 'tersisa ' + item.stock}` }

        updatedData.stock = item.stock - quantity
        updatedData.total_sold = item.total_sold + quantity
        if(item.stock - quantity == 0) updatedData.status = 'unavailable'

        const deplete = await updateItem(itemId, updatedData)
        if(!deplete) return { status: "Failed", message: "Gagal mendeplete stok item" }

        const insertTransaction = await createTransaction({transactionDate: await thisTime(), ...payload, totalPrice})

        callback.push(insertTransaction)
    }

    if(callback.length != 0) return { status: "Success", data: callback }
    return { status: "Failed" }
}

module.exports = createBulkTransaction