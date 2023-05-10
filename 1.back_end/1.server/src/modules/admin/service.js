const Cookies = require('cookies')

const { hashSync, compareSync } = require('../../utils/bcrypt.js')
const { signToken } = require('../../utils/jwt.js')
const Admin = require('./model.js')

//check existed

async function existedAdmin(req, res, next) {
    try {
        const { username } = req.body
        const { id } = req.params
        const query = {}
        if (id) {
            query['id'] = ïd
        } else {
            query.username = username
        }
        const response = await Admin.findOne({
            where: query,
        })

        if (response) {
            res.locals.response = response
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
async function adminLogin(req, res) {
    try {

        const { password } = req.body
        const comparePassword = compareSync(password, res.locals.response.password)
        if (!comparePassword) {
            res.sendStatus(403)
            return
        }
        const { id, username } = res.locals.response
        const access_token = signToken({ id, username, role: 'admin' })
        var cookies = new Cookies(req, res)
        cookies.set('access_token', access_token, {
                httpOnly: true,
            })
            // var cookies = new Cookies(req, res, {
            //   keys: ['ZlnmhYIyjO3ybxYmHZDZA72aIK3ViwJO'],
            //   secure: process.env.NODE_ENV=="development"?false:true,
            // })
            // cookies.set('access_token', access_token, {
            //   httpOnly: true,
            //   sameSite: process.env.NODE_ENV=="development"?false:'none',
            //   secure: process.env.NODE_ENV == 'development' ? false : true,
            // })
        res.sendStatus(200)
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
}

//sign up
async function adminSignup(req, res) {
    try {
        const { password } = req.body
        const hashPassword = hashSync(password)
        const response = await Admin.create({...req.body, password: hashPassword })
        const { id, username } = response
        const access_token = signToken({ id, username, role: 'admin' })
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

//logout
async function adminLogout(req, res) {
    try {
        var cookies = new Cookies(req, res)
        cookies.set('access_token')
        res.sendStatus(200)
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
}

//get profile with token in cookie
async function adminCookies(req, res) {
    try {
        var cookies = new Cookies(req, res)
        const cookie = cookies.get('access_token')
        if (!cookie) {
            res.sendStatus(401)
            return
        }
        res.sendStatus(200)
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
}
module.exports = {
    adminCookies,
    existedAdmin,
    adminLogout,
    adminSignup,
    adminLogin,
}