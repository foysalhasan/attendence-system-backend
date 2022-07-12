require('dotenv').config()
const http = require('http')
const app = require('./app/app')
const connectDB = require('./db')

const PORT = process.env.PORT || 8080
const DB = process.env.DB

const server = http.createServer(app)

connectDB(DB)
  .then(() => {
    console.log('✅DB CONNECTED !')
    server.listen(PORT, () => console.log(`🟢SERVER IS RUNNING ON ${PORT} PORT`))
  })
  .catch((e) => console.log(e))
