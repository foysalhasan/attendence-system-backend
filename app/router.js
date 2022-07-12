const router = require('express').Router()

router.use('/auth/', require('../routes/users'))

router.get('/health', (_req, res) => {
  res.status(200).json({ message: 'Success !' })
})

module.exports = router
