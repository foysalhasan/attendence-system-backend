const router = require('express').Router()
const authRoute = require('./authRoute')

router.use('/api/auth', authRoute)

module.exports = router
