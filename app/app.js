require('dotenv').config('../.env')
const express = require('express')
const { notFound, errHandler } = require('./error')

const app = express()

app.use(require('./middleware'))
app.use(require('./router'))
app.use(notFound)
app.use(errHandler)

module.exports = app
