const jwt = require('jsonwebtoken')

function signToken(payload) {
  return jwt.sign(payload, process.env.PRIVATE_KEY || 'privatekey', { expiresIn: '1h' })
}

function verifyToken(token) {
  try {
    return jwt.verify(token, process.env.PRIVATE_KEY || 'privatekey')
  } catch (err) {
    return false
  }
}



module.exports = {
  signToken,
  verifyToken,
}
