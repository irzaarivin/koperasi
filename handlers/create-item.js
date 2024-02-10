const Joi = require('joi')

const validate = (data) => {
    const schema = Joi.object({
        name: Joi.string().required().messages({
            'any.required': 'Nama barang diperlukan!',
            'string.empty': 'Nama barang tidak dapat kosong!'
        }),
        slug: Joi.string().required().messages({
            'any.required': 'Slug barang diperlukan!',
            'string.empty': 'Slug barang tidak boleh kosong!'
        }),
        description: Joi.string().required().messages({
            'any.required': 'Deskripsi barang diperlukan!',
            'string.empty': 'Deskripsi barang tidak boleh kosong!'
        }),
        price: Joi.number().min(0).required().messages({
            'number.min': 'Harga barang harus berupa angka positif!',
            'any.required': 'Harga barang diperlukan!'
        }),
        stock: Joi.number().min(0).required().messages({
            'number.min': 'Stok barang harus berupa bilangan cacah!',
            'any.required': 'Stok barang diperlukan!'
        }),
        status: Joi.string().valid('available', 'unavailable').required().messages({
            'any.only': 'Status barang harus "available" atau "unavailable"!',
            'any.required': 'Status barang diperlukan!'
        }),
        image: Joi.string().uri().allow(null).optional().messages({
            'string.uri': 'Gambar barang harus berupa URL yang valid!'
        })
    });

    const { error } = schema.validate(data);
    return error;
}


const createItem = async (repositories, data) => {
    const { createItem } = repositories.itemRepositories

    const validation = validate(data);
    if(validation) return { status: "Failed", error: validation.message }

    const callback = await createItem(data).then(result => {
        data.id = result[0]
        return data
    })

    if(callback) return { status: "Success", data: callback }
    return { status: "Failed" }
}

module.exports = createItem