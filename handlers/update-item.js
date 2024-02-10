const Joi = require('joi')

const validate = (data) => {
    const schema = Joi.object({
        id: Joi.number().required().messages({
            'number.base': 'id harus berupa angka.',
            'any.required': 'id diperlukan dan tidak boleh kosong.'
        }),
        name: Joi.string().allow('').optional().messages({
            'string.empty': 'Nama barang tidak dapat kosong!'
        }),
        slug: Joi.string().allow('').optional().messages({
            'string.empty': 'Slug barang tidak boleh kosong!'
        }),
        description: Joi.string().allow('').optional().messages({
            'string.empty': 'Deskripsi barang tidak boleh kosong!'
        }),
        price: Joi.number().integer().min(0).optional().messages({
            'number.min': 'Harga barang harus berupa angka positif!'
        }),
        stock: Joi.number().integer().min(0).optional().messages({
            'number.min': 'Stok barang harus berupa bilangan cacah!'
        }),
        status: Joi.string().valid('available', 'unavailable').optional().messages({
            'any.only': 'Status barang harus "available" atau "unavailable"!'
        }),
        image: Joi.string().uri().allow(null, '').optional().messages({
            'string.uri': 'Gambar barang harus berupa URL yang valid!'
        })
    });

    const { error } = schema.validate(data);
    return error;
}


const updateItem = async (repositories, { id, data }) => {
    const { updateItem } = repositories.itemRepositories

    console.log({id, ...data})

    const validation = validate({id, ...data});
    if(validation) return { status: "Failed", error: validation.message }

    const callback = await updateItem(id, data).then(result => {
        data.id = result[0]
        return data
    })

    if(callback) return { status: "Success", data: callback }
    return { status: "Failed" }
}

module.exports = updateItem