const express = require('express')
const vehicleSchema = require('../schemas/vehicles.schema')

let api = express.Router()

//Consultar vehículos
api.get('/consult', async (req, res) => {
    try{
        const vehicles = await vehicleSchema.find()
        return res.status(200).send({ vehicles });
    }catch{
        res.status(404).send({ message: "Aún no hay vehiculos registrados" })
    }
     
});

//Consultar vehículo especifico
api.get('/vehicle', async (req, res) =>{
    try{
        const vehicle = await vehicleSchema.findById(req.query.id);
        if(vehicle === null){
            res.status(404).send({ message: 'Vehículo no encontrado' });
        }else{
            res.status(200).send(vehicle);
        } 
    }catch(err){
        res.status(400).send({message: err.message});
    } 
});

//Ingresar vehículos
api.post('/create', async (req, res) => {
    try{
        const vehicle = new vehicleSchema(req.body)
        await vehicle.save();
        res.status(201).send({message : "Vehículo almacenado correctamente"})
    }catch(err) {
        res.status(400).send({message: "Bad request"});
    }
    
})

//Actualizar vehículo
api.put('/updatevehicle', async (req, res) => {
    try{
        const { id } = req.query;
        console.log(id)
        const vehicle = {
            tipo: req.body.tipo,
            placa: req.body.placa,
            ingreso: req.body.ingreso
        }
        const find = await vehicleSchema.findByIdAndUpdate(id, {$set: vehicle}, {new: true});
        if(find === null) {
            res.status(404).send({message : "No se encontro el vehículo"})
        }else{
            res.status(200).send({message : "Vehículo actualizado correctamente"})
        }
    }catch(err){
        res.status(400).send({message: err.message})
    }
})

//Eliminar vehículo
api.delete('/deletevehicle', async (req, res) => {
    try{
        const { id } = req.query;
        console.log(id)
        const find = await vehicleSchema.findByIdAndUpdate(id, {$set: {isActive: false}}, {new: true});
        if(find === null) {
            res.status(404).send({message : "No se encontro el vehículo"})
        }else{
            res.status(200).send({message : "Vehículo eliminado correctamente"})
        }
    }catch(err){
        res.status(400).send({message: err.message})
    }
})
module.exports = api;