const express = require("express");
const app = express();
const session = require('express-session');
const cors = require("cors");
const routes = require("./routes/index.js");


//Variables de entorno
require('dotenv').config({
    path:'./src/env/.env'
}) 


const PORT = process.env.PORT || 5500;
app.use(session({
    secret:'inrh-secret',
    resave:true,
    saveUninitialized:true
}))
app.use(express.json())
app.use(cors())
app.use(routes)
app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})

