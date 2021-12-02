const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const connection = require('./connection.json');
const app = require('./app');
const port = process.env.PORT || 3001;

//app.set('port', process.env.PORT || 3000)
app.use(morgan('dev'))
app.use(cors())
app.use(express.json())

//Lista de rutas base
app.use('/consult', require('./routes/vehicle.routes'));
app.use('/vehicle', require('./routes/vehicle.routes'));
app.use('/create', require('./routes/vehicle.routes'));
app.use('/updatevehicle', require('./routes/vehicle.routes'));
app.use('/deletevehicle', require('./routes/vehicle.routes'));


mongoose.connect(connection.URI, {useUnifiedTopology: true, useNewUrlParser: true}).then(() => {
  console.log("successful DB connection")

  app.listen(port, () => {
    console.log(`listening on port: ${port}`)
})
}).catch((err) => {
  console.error("connection error", err.message)
})