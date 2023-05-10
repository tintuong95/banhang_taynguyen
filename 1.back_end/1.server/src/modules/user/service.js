const Cookies = require('cookies')
const { hashSync, compareSync } = require('../../utils/bcrypt.js')
const { signToken, verifyToken } = require('../../utils/jwt.js')
const useQuery = require('../../utils/query.js')
const User = require('./model.js')

//check existed

async function existedUser(req, res, next) {
    try {
        const { username } = req.body
        const { id } = req.params

        let query = new Object()
        if (id) {
            query['id'] = id
        } else {
            query.username = username
        }
        const response = await User.findOne({
            where: query,
        })

        if (response) {
            res.locals.response = await response
            next()
            return
        }
        return res.sendStatus(404)
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
}

//login
async function userLogin(req, res) {
    try {
        const { password } = req.body
        const comparePassword = compareSync(password, res.locals.response.password)
        if (!comparePassword) {
            res.sendStatus(403)
            return
        }
        const { id, username ,status} = res.locals.response
        if (status==0){
            res.sendStatus(401)
            return
        }
      

        const access_token = signToken({ id, username, role: 'user' })
        var cookies = new Cookies(req, res)
        cookies.set('access_token', access_token, {
            httpOnly: true,
        })

        delete res.locals.response.dataValues.password
        res.status(200).json(res.locals.response)
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
}

//sign up
async function userSignup(req, res) {
    try {
        const { password } = req.body
        const hashPassword = hashSync(password)
        const response = await User.create({...req.body, password: hashPassword, type: "website" })
        const { id, username } = response

        const access_token = signToken({ id, username, role: 'user' })
        var cookies = new Cookies(req, res)
        cookies.set('access_token', access_token, {
            httpOnly: true,
        })
        res.sendStatus(201)
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
}

//sign up third party account
async function userLoginThirdParty(req, res) {

    try {
        const { password, username, fullname } = req.body
        let response = await User.findOne({ where: { username } })
    
        if (response) {
            if (response.getDataValue("status")==0){
                res.sendStatus(403)
                return
            }
            const comparePassword = compareSync(password, response.password)
            if (comparePassword) {
                const access_token = signToken({ id: response.id, username: res.username, role: 'user' })
                var cookies = new Cookies(req, res)
                cookies.set('access_token', access_token, {
                    httpOnly: true,
                })
                delete response.dataValues.password

                return res.status(200).json(response)
            } else {
                return res.sendStatus(403)
            }
        } else {

            const hashPassword = hashSync(password)
            const newsUser = await User.create({...req.body, password: hashPassword })
            const access_token = signToken({ id: newsUser.id, username: newsUser.id, role: 'user' })
            var cookies = new Cookies(req, res)
            cookies.set('access_token', access_token, {
                httpOnly: true,
            })
            delete newsUser.dataValues.password
            return res.status(200).json(newsUser)
        }
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
}

//logout
async function userLogout(req, res) {
    try {
        var cookies = new Cookies(req, res)
        cookies.set('access_token')
        res.sendStatus(200)
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
}

//get
async function userGet(req, res) {
    try {
        res.status(200).json({ data: res.locals.response })
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
}

//gets
async function userGets(req, res) {
    try {
        const { offset = 0, limit = 12 } = req.query
        let { where, order } = useQuery(req, 'username')
        const response = await User.findAll({
            where,
            offset: Number(offset),
            limit: Number(limit),
            order: [
                ...order
            ],
            attributes: ['id', 'username', 'fullname', 'phone', 'address', 'type', 'status', 'updatedAt'],
        })

        res.status(200).json({ data: response })
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
}

//change status user
async function userChangeStatus(req, res) {
    try {
        res.locals.response.update({ status: res.locals.response.dataValues.status == 0 ? 1 : 0 })
        res.locals.response.save()
        res.sendStatus(201)
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
}

//update
async function userUpdate(req, res) {
    try {
        const infoUser = {...req.body }
        if (req.body.password) {
            infoUser['password'] = hashSync(req.body.password)
        }
        res.locals.response.update(infoUser)
        res.locals.response.save()
        res.sendStatus(201)
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
}

//remove
async function userRemove(req, res) {
    try {
        res.locals.response.destroy()

        res.sendStatus(200)
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
}

//get profile with token in cookie
async function userCookies(req, res) {
    try {
        var cookies = new Cookies(req, res)
        const cookie = cookies.get('access_token')
        
        if (!cookie) {
            res.sendStatus(401)
            return
        }

        
    
        const response = await User.findOne({
            where: { id: verifyToken(cookie)?.id },
        })

        delete response.dataValues.password

        res.status(200).json(response)
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
}
module.exports = {
    userLoginThirdParty,
    userChangeStatus,
    userCookies,
    existedUser,
    userLogout,
    userSignup,
    userUpdate,
    userLogin,
    userRemove,
    userGets,
    userGet,
}