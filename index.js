
const morgan = require('morgan');
const mongoose = require('mongoose');
const connection = require('./connection.json');
const app = require('./app');
const port = process.env.PORT || 3001;

//app.set('port', process.env.PORT || 3000)
app.use(morgan('dev'))

mongoose.connect(connection.URI, {useUnifiedTopology: true, useNewUrlParser: true}).then(() => {
  console.log("successful DB connection")

  app.listen(port, () => {
    console.log(`listening on port: ${port}`)
})
}).catch((err) => {
  console.error("connection error", err.message)
})