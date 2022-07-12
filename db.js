const mongoose = require('mongoose')
function connectDB(db) {
  return mongoose.connect(db)
}
module.exports = connectDB
