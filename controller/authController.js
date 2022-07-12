const { registrationService, loginService } = require('../services/authService')

// ✅ REGISTER NEW USER
const registerController = async (req, res, next) => {
  const { name, email, password } = req.body
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Invalid Data' })
  }
  try {
    const user = await registrationService({ name, email, password })
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
    const token = await loginService({ email, password })
    return res.status(200).json({ message: 'Login Successful', token })
  } catch (e) {
    next(e)
  }
}

module.exports = {
  registerController,
  loginController,
}
