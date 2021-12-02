const mongoose = require('mongoose')
const Schema = mongoose.Schema
const moment = require('moment-timezone')

moment.tz('America/Bogota')

let vehicleSchema = new Schema({
    tipo : { type: String, required: [true, 'Este campo es obligatorio'] },
    placa : { type: String, required: [true, 'Este campo es obligatorio'] },
    ingreso: { type: Date, default: Date.now(), required: [true, 'Este campo es obligatorio'] },
    salida: { type: String, required: false },
    isActive: {type: Boolean, required: false},
    createdAt: { type: Date, immutable: true }
})

vehicleSchema.pre('save', function (next) {
    if (this.isNew) this.createdAt = moment()
    else if (this.isModified) this.updateAt = moment()
    next()
})

module.exports = mongoose.model('Vehicle', vehicleSchema)