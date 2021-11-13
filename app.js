const express = require('express')
const bodyParser = require('body-parser')
const app = express()
let api = require('./routes/vehicle.routes')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/api', api)
app.use(express.json())

module.exports = app