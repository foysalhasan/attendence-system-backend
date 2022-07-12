const User = require('../models/User.Model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// ✅ REGISTER NEW USER
const registerController = async (req, res, next) => {
  const { name, email, password } = req.body
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Invalid Data' })
  }
  try {
    let user = await User.findOne({ email })
    if (user) {
      return res.status(400).json({ message: 'User Already Registered' })
    }
    user = new User({ name, email, password })

    //PASSWORD ENCRYPTION
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    user.password = hash

    await user.save()
    return res.status(201).json({ message: 'User Created', user })
  } catch (e) {
    next(e)
  }
}

// ✅ LOGIN A USER
const loginController = async (req, res, next) => {
  const { email, password } = req.body
  if (!email || !password) {
    return res.status(400).json({ message: 'Invalid Data' })
  }
  try {
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ message: 'User Not Registered' })
    }

    //PASSWORD DECRYPTION
    const isMatched = await bcrypt.compare(password, user.password)
    if (!isMatched) {
      return res.status(400).json({ message: 'Invalid Credential' })
    }
    delete user._doc.password
    const token = jwt.sign(user._doc, 'secret', { expiresIn: '24h' })
    return res.status(200).json({ message: 'Login Successful', token })
  } catch (e) {
    next(e)
  }
}

module.exports = {
  registerController,
  loginController,
}