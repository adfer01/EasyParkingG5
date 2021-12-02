const mongoose = require('mongoose')
const Schema = mongoose.Schema
const moment = require('moment')

let rateSchema = new Schema({
    tipo : { type: String, required: [true, 'Este campo es obligatorio'] },
    tarifaHora : { type: Number, required: [true, 'Este campo es obligatorio'] },
    tarifaMinuto: { type: Number, required: [true, 'Este campo es obligatorio'] },
    createdAt: { type: Date, immutable: true }
})

vehicleSchema.pre('save', function (next) {
    if (this.isNew) this.createdAt = moment()
    else if (this.isModified) this.updateAt = moment()
    next()
})

module.exports = mongoose.model('Rate', rateSchema)