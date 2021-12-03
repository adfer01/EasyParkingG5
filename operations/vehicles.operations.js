const vehicleSchema = require('../schemas/vehicles.schema')

exports.consult = async function () {
    try{
        const vehicles = await vehicleSchema.find();
        return {code: 200, message: vehicles}
    }catch{
        return {code: 404, message: 'Aún no hay vehiculos registrados'}
    }

}

exports.vehicle = async function (req) {
    try{
        const vehicle = await vehicleSchema.findById(req.query.id);
        if(vehicle === null){
            return {code: 404, message: 'Vehículo no encontrado' };
        }else{
            return {code: 200, message: vehicle };
        } 
    }catch(err){
        return { code: 400, message: err.message };
    }
}

exports.create = async function (req) {
    try{
        const vehicle = new vehicleSchema(req.body)
        console.log(req.body)
        await vehicle.save();
        return { code: 201, message: 'Vehículo almacenado correctamente' };
    }catch(err) {
        return { code: 400, message: 'Bad request' };
    }
}

exports.updateVehicle = async function (req) {
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
            return { code: 404, message: 'No se encontro el vehículo' };
        }else{
            return { code: 200, message: 'Vehículo actualizado correctamente' };
        }
    }catch(err){
        return { code: 400, message: err.message };
    }
}

exports.deleteVehicle = async function (req) {
    try{
        const { id } = req.query;
        console.log(id)
        const find = await vehicleSchema.findByIdAndUpdate(id, {$set: {isActive: false}}, {new: true});
        if(find === null) {
            return { code: 404, message: 'No se encontro el vehículo' };
        }else{
            return { code: 404, message: 'Vehículo eliminado correctamente' };
        }
    }catch(err){
        return { code: 400, message: err.message };
    }
}