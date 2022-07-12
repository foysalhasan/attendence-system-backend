const router = require('express').Router()
const routes = require('../routes')

router.use(routes)

router.get('/health', (_req, res) => {
  res.status(200).json({ message: 'Success !' })
})

module.exports = router
