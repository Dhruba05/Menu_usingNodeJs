const express = require('express')
const path = require('path')
const app = express()
const os = require('os')
const bodyParser = require('body-parser');
app.use(bodyParser.json())
const connectDB = require('./db');
require('dotenv').config();


app.get('/', (req, res) => {
    const user = os.userInfo().username;
    res.send(`Welcome Mr.${user} in our restaurant`)
})

//import router files
const menuRoutes=require('./routes/menuRoutes');
//use the routers
app.use('/menu' , menuRoutes)

const PORT=process.env.PORT || 3000
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Listening to Port 3000");
    })
})