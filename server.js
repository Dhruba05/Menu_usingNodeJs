const express = require('express')
const path = require('path')
const app = express()
const os = require('os')
const bodyParser = require('body-parser');
app.use(bodyParser.json())
const connectDB = require('./db');
require('dotenv').config();
const passport=require('./auth')



//middlewear
const logRequest = (req,res,next) =>{
    console.log(`[${new Date().toLocaleString()}] Request made to  : ${req.originalUrl}`);
    next();  //current middlewear is fiished ,move to next
}
app.use(logRequest);
//middlewear


app.use(passport.initialize())
const localAuthMiddleware = passport.authenticate('local' , {session:false})

app.get('/', localAuthMiddleware, (req, res) => {
    const user = os.userInfo().username;
    res.send(`Welcome Mr.${user} in our restaurant`)
})

//import router files
const menuRoutes=require('./routes/menuRoutes');
const personRoutes = require('./routes/personRoutes');

//use the routers
app.use('/menu' , menuRoutes)
app.use('/person' , personRoutes)
//app.use('/person' , localAuthMiddleware,personRoutes) //use for authenticating menu routes

const PORT=process.env.PORT || 3000
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Listening to Port 3000");
    })
})