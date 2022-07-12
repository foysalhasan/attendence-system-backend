const router = require('express').Router()
const authinticate = require('../middleware/authinticate')
const { registerController, loginController } = require('../controller/authController')

router.post('/register', registerController)
router.post('/login', loginController)

router.get('/private', authinticate, async (req, res) => {
  const { user } = req
  res.status(200).json({ message: 'I am Private Route !', user })
})

module.exports = router
