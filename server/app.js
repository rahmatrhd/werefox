const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
mongoose.connect('mongodb://rahmat:rahmat@cluster0-shard-00-00-gkut7.mongodb.net:27017,cluster0-shard-00-01-gkut7.mongodb.net:27017,cluster0-shard-00-02-gkut7.mongodb.net:27017/werefox?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin')

const app = express()

var user = require('./models/users');

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

//routes
const index = require('./routes/index')

app.use('/', user)

app.listen(process.env.PORT || 3000, () => {
  console.log('listening..')
})
