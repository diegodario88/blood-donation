const mongoose = require('mongoose')

const { Schema } = mongoose

const requiredString = {
    type: String,
    required: 'this field is required'
}

const DonorsSchema = new Schema({
    name: requiredString,
    email: requiredString,
    bloodType: requiredString,
}, {
    timestamps: true
})

const Donors = mongoose.model('Donors', DonorsSchema)

module.exports = Donors