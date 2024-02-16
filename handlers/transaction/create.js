const Joi = require('joi')
const currentDate = new Date();

const validate = (data) => {
    const schema = Joi.object({
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
        }),
        totalPrice: Joi.number().positive().required().messages({
            'number.base': 'Total price harus berupa angka.',
            'number.positive': 'Total price harus bernilai positif.',
            'any.required': 'Total price diperlukan.'
        })
    });

    const { error } = schema.validate(data);
    return error;
}

const thisTime = async () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');

    const thisTime = `${year}-${month}-${day}`;

    return thisTime;
}

const createTransaction = async (repositories, data) => {
    const { createTransaction } = repositories.transactionRepositories
    const { getOneItem, updateItem } = repositories.itemRepositories
    const { itemId, quantity, totalPrice } = data

    const validation = validate(data)
    if(validation) return { status: "Failed", error: validation.message }

    const updatedData = {}
    const item = await getOneItem(itemId)
    if(!item) return { status: "Failed", message: "Item tidak ditemukan" }
    if(item.status == 'unavailable' && (quantity > item.stock || item.stock == 0)) return { status: "Failed", message: `Stok ${item.stock == 0 ? 'Habis' : 'tersisa ' + item.stock}` }
    if(totalPrice != (item.price * quantity)) return { status: "Failed", message: `Harga tidak sesuai, seharusnya ${item.price * quantity}` }
    updatedData.stock = item.stock - quantity
    updatedData.total_sold = item.total_sold + quantity
    if(item.stock - quantity == 0) updatedData.status = 'unavailable'

    const deplete = await updateItem(itemId, updatedData)
    if(!deplete) return { status: "Failed", message: "Gagal mendeplete stok item" }

    const insertTransaction = await createTransaction({transactionDate: await thisTime(), ...data}).then(result => {
        data.id = result[0]
        return data
    })

    if(insertTransaction) return { status: "Success", data: insertTransaction }
    return { status: "Failed" }
}

module.exports = createTransaction