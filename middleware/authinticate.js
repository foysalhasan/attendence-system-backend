const jwt = require('jsonwebtoken')
const User = require('../models/User.Model')

async function authinticate(req, res, next) {
  try {
    let token = req.headers.authorization
    if (!token) {
      res.status(401).json({ message: 'UnAuthorized Access !' })
    }
    token = token?.split(' ')[1]
    const decoded = jwt.verify(token, 'secret')
    const user = await User.findById(decoded._id)
    if (!user) {
      res.status(401).json({ message: 'UnAuthorized Access !' })
    }
    req.user = user
    next()
  } catch (err) {
    next(err)
  }
}

module.exports = authinticate
