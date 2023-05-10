const { Op } = require('sequelize')

function useQuery(req, name, role) {

    let where = {}
    let order = []
    Object.entries(req.query).forEach((item) => {
        if (item[0] !== 'limit' && item[0] !== 'offset') {
            if (item[0] === 'search') {
                where = {
                    [name]: {
                        [Op.like]: `%${item[1]}%`,
                    },
                }
                return
            }
            if (item[1] === "ASC" || item[1] === "DESC") {
                order.push([item[0], item[1]])
                return
            }
            where[item[0]] = item[1]
        }
    })

    //role gets to user
    if (role === 'user' || role === 'anonymous') {
        where.status = 1
    }
    return { where, order }
}

module.exports = useQuery