mongoose = require('mongoose')

EmailSchema = new mongoose.Schema
    email:
      type: 'string'
      required: true
    created:
      type: Date
      default: Date.now

mongoose.model('Email', EmailSchema)
