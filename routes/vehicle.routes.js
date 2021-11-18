const express = require('express')
const vehicleOperations = require('../operations/vehicles.operations')

let api = express.Router()

//Consultar vehículos
api.get('/consult', async (req, res) =>{
    const resp = await vehicleOperations.consult(req)
    return res.status(resp.code).send({ result: resp.message })
});

//Consultar vehículo especifico
api.get('/vehicle', async (req, res) =>{
    const resp = await vehicleOperations.vehicle(req)
    return res.status(resp.code).send({ result: resp.message })
});

//Ingresar vehículos
api.post('/create', async (req, res) => {
    const resp = await vehicleOperations.create(req)
    return res.status(resp.code).send({ result: resp.message })
});

//Actualizar vehículo
api.put('/updatevehicle', async (req, res) => {
    const resp = await vehicleOperations.updateVehicle(req)
    return res.status(resp.code).send({ result: resp.message })
});

//Eliminar vehículo
api.delete('/deletevehicle', async (req, res) => {
    const resp = await vehicleOperations.deleteVehicle(req)
    return res.status(resp.code).send({ result: resp.message })
});

module.exports = api;