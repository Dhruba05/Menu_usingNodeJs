const express = require('express')
const path = require('path')
const app = express()
const os = require('os')
const bodyParser = require('body-parser');
app.use(bodyParser.json())
const connectDB = require('./db');


app.get('/', (req, res) => {
    const user = os.userInfo().username;
    res.send(`Welcome Mr.${user} in our restaurant`)
})

//import router files
const menuRoutes=require('./routes/menuRoutes');
//use the routers
app.use('/menu' , menuRoutes)

connectDB().then(() => {
    app.listen(3000, () => {
        console.log("Listening to Port 3000");
    })
})