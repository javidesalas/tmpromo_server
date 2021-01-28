const mongoose = require('mongoose')
const Schema = mongoose.Schema

const entrySchema = new Schema({
    name: String,
    lastName: String,
    birthDate: Date,
    zipCode: Number,
    email: String,
    phone: String,
    code: String,
    buyedAt: {
        type: String,
        enum: ['Alcampo', 'Carrefour']
    },
    imageUrl: String,
}, {
    timestamps: true
})

const Entry = mongoose.model('Entry', entrySchema)
module.exports = Entry