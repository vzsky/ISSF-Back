const express = require("express")
const path = require('path')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const devlog = require('./bin/log')

const app = express()
const PORT = 5000
dotenv.config()

//DB
mongoose.connect( process.env.DB_CONNECT, {useNewUrlParser : true}, () => {
    devlog("connected to mongoDB")
})

app.set('view engine', 'ejs');

app.use(express.json())

const _apirouter = require(path.join(__dirname, 'api', 'urls'))
const _webrouter = require(path.join(__dirname, 'routes', 'urls'))

app.use('/api', _apirouter)
app.use('/', _webrouter)

app.listen(PORT, () => {
    devlog("running on "+PORT)
})
