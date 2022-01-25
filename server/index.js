require('express-async-errors')
require('dotenv').config()
//packages
const express = require('express')
const app = express()
const cors = require('cors')


//import routes
const newsRouter = require('./routes/newsChannels')

//middlewares
app.use(express.json())
app.use(cors())
//routes
app.use('/api/v1', newsRouter)



const port = process.env.PORT || 8080
const start = async ()=>{
    try {
        app.listen(port, ()=>{
            console.log('server is running')
        })
    } catch (error) {
        console.log(error)
    }
}

start()
