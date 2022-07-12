const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { findUserByProperty, createUser } = require('./userService')
const error = require('../utils/error')

const registrationService = async function ({ name, email, password }) {
  const user = await findUserByProperty('email', email)
  if (user) throw error('User Already Registered')

  //PASSWORD ENCRYPTION
  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)
  return await createUser({ name, email, password: hash })
}

const loginService = async function ({ email, password }) {
  const user = await findUserByProperty('email', email)
  if (!user) throw error('Wrong Credential')

  //PASSWORD DECRYPTION
  const isMatched = await bcrypt.compare(password, user.password)
  if (!isMatched) throw error('Wrong Credential')

  const userData = {
    _id: user._id,
    name: user.name,
    email: user.email,
    roles: user.roles,
    accountStatus: user.accountStatus,
  }

  return jwt.sign(userData, 'secret', { expiresIn: '24h' })
}

module.exports = {
  registrationService,
  loginService,
}
