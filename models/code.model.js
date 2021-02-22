const mongoose = require('mongoose')
const Schema = mongoose.Schema

const codeSchema = new Schema({
    code: String,
    used: { type: Boolean, default: false }
}, {
    timestamps: true
})

const Code = mongoose.model('Code', codeSchema)
module.exports = Code