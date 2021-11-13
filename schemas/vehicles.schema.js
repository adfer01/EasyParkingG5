const mongoose = require('mongoose')
const Schema = mongoose.Schema
const moment = require('moment')

let vehicleSchema = new Schema({
    tipo : { type: String, required: [true, 'Este campo es obligatorio'] },
    placa : { type: String, required: [true, 'Este campo es obligatorio'] },
    ingreso: { type: Date, required: [true, 'Este campo es obligatorio'] },
    salida: { type: String, required: false },
    createdAt: { type: Date, immutable: true }
})

vehicleSchema.pre('save', function (next) {
    if (this.isNew) this.createdAt = moment()
    else if (this.isModified) this.updateAt = moment()
    next()
})

module.exports = mongoose.model('Vehicle', vehicleSchema)