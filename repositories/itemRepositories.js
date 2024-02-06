const itemRepositories = ({ Item }) => {

    return {

        // ============= CRUD Dasar ==============
    
        createItem: async (data) => {
            return await Item.insert(data).into('items')
        },
        
        getItems: async () => {
            return await Item.select('*').from('items')
        },
        
        updateItem: async (id, data) => {
            return await Item('items').where('id', id).update(data)
        },
        
        deleteItem: async (id) => {
            return await Item('items').where('id', id).del()
        },
    
        // ============= CRUD Advance ==============

    }


}

module.exports = itemRepositories
