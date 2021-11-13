const express = require('express')
const vehicleSchema = require('../schemas/vehicles.schema')

let api = express.Router()

api.get('/consult', async (req, res) => {
    //console.log("El contenido es:", req)
    return res.status(200).send({ messageID : "resp.data"}); 
});

api.post('/create', async (req, res) => {
    console.log(req.body)
    const vehicle = new vehicleSchema(req.body)
    console.log(vehicle);
    await vehicle.save();
    res.status(200).send({message : "Vehículo almacenado correctamente"})
})
module.exports = api;