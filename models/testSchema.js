const mongoose = require('mongoose')

// mongoose.connect(url, { useNewUrlParser: true })
const Schema = mongoose.Schema

const testSchema = new Schema({
    name: String,
    email: String
})

module.exports = mongoose.model('Test',testSchema)