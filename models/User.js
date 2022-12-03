const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  Username:{
    type: String,
    require: true,
    min: 3,
    max: 256
  },
  Email:{
    type: String,
    require: true,
    min: 6,
    max: 256
  },
  Password:{
    type: String,
    require: true,
    min: 6,
    max: 1024
  },
  Date:{
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('users',userSchema)