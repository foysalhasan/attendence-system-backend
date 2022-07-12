const { Schema, model } = require('mongoose')

const adminAttendanceSchema = new Schema({
  createdAt: Date,
  timeLimit: Number,
  Status: String,
})

const AdminAttendance = model('AdminAttendance', adminAttendanceSchema)
module.exports = AdminAttendance
