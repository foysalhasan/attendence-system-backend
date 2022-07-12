const User = require('../models/User.Model')

const findUserByProperty = async (key, value) => {
  if (key == '_id') {
    return await User.findById(value)
  }
  return await User.findOne({ [key]: value })
}

const createUser = async ({ name, email, password }) => {
  const user = new User({ name, email, password })
  await user.save()
  return user
}

module.exports = {
  findUserByProperty,
  createUser,
}
