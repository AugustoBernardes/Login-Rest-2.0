const express = require('express')
const mongoose = require('mongoose')
const homeRoute = require('./routes/userRoute')
const path = require('path')
require('dotenv').config()
// ------------------------------------------------
const app = express()
const cookieParser = require('cookie-parser')
app.use(cookieParser())


// Dote Env variables
const DB_KEY = process.env.DB_KEY
const PORT = process.env.PORT

// Data Base connection
mongoose.connect(DB_KEY,{
    useNewUrlParser: true , 
    useUnifiedTopology: true  
})

let db = mongoose.connection

db.on('error',() => {{console.log(`Can't load the Data Base !`)}})
db.once('open', () => {console.log(`Data Base Loaded !`)})




// Template Engine
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname,'templates'))

// Route
app.use('/', homeRoute)

app.listen(PORT, () => {console.log(`App running on PORT: ${PORT}`)})