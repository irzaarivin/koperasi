const { get } = require('http');
const Joi = require('joi')

const validate = (data) => {
    const schema = Joi.object({
        id: Joi.number().required().messages({
            'number.base': 'id harus berupa angka.',
            'any.required': 'id diperlukan dan tidak boleh kosong.'
        }),
        stock: Joi.number().integer().min(0).optional().messages({
            'number.min': 'Stok barang harus berupa bilangan cacah!'
        })
    });

    const { error } = schema.validate(data);
    return error;
}


const updateStockItem = async (repositories, {id, stock}) => {
    const { updateItem, getOneItem } = repositories.itemRepositories
    id = parseInt(id)
    stock = parseInt(stock)

    const validation = await validate({ id: id, stock: stock });
    if(validation) return { status: "Failed", error: validation.message }

    const latest = await getOneItem(id)
    if(!latest) return { status: "Failed", message: "Item tidak ditemukan" }
    
    const updatedData = {}
    updatedData.stock = latest.stock + stock
    if(latest.status = 'unavailable') updatedData.status = 'available'
    const update = await updateItem(id, updatedData)

    if(update) return { status: "Success", data: update }
    return { status: "Failed" }
}

module.exports = updateStockItem