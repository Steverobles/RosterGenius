const mongoose = require('mongoose')

require('./category')
const playerSchema = require('./playerSchema')

module.exports = mongoose.model('Player', playerSchema)