const { Op } = require('sequelize')

module.exports = async (Schedule) => {
    return {
        getSchedules: async (params) => {
            try {
                const { sold, stock, status } = params;

                let whereClause = {};
                let orderClause = [];
                            
                if (status) {
                    whereClause.status = status;
                }
                            
                if (sold === 'ASC' || sold === 'DESC') {
                    orderClause.push(['total_sold', sold]);
                }

                if (stock === 'ASC' || stock === 'DESC') {
                    orderClause.push(['stock', stock]);
                }

                const transactions = await Schedule.findAll({ where: whereClause, order: orderClause });

                return transactions;
            } catch (error) {
                console.log({error})
                throw new Error(error)
            }
        },

        createSchedule: async (data) => {
            try {
                return await Schedule.create(data)
            } catch (error) {
                console.log({error})
                throw new Error(error)
            }
        }
    }
}