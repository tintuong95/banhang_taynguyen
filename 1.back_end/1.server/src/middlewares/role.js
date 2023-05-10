const { verifyToken } = require('../utils/jwt.js')


const Role = {
  Admin: 'admin',
  User: 'user',
  Anonymous: 'anonymous',
}

const roleRouter = (ROLEs) => {
  return (req, res, next) => {
    try {
      let role = Role.Anonymous
     
      if (req.cookies.access_token) {
        role = verifyToken(req.cookies.access_token).role
      } 

      let flag = false
      ROLEs.forEach((item) => {
        console.log("role", item,role)
        if (item === role) {
          res.locals.role = role
          flag = true
        }else if(item==Role.Anonymous){
          flag=true
        }
      })


      if (flag) {
        next()
        return
      }
      

      return res.sendStatus(403)
    } catch (err) {
      console.log(err)
      return res.sendStatus(500)
    }
  }
}


module.exports = {
  roleRouter,
  Role,
}
