const scheduleController = async (scheduleHandler) => {

    const { getSchedules, createSchedule } = await scheduleHandler

    const get = async (req) => {
        const params = req.query
        return await getSchedules(params)
    }

    const create = async (req) => {
        const data = req.body
        return await createSchedule(data)
    }

    return { create, get }

}

module.exports = scheduleController