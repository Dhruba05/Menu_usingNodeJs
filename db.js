const mongoose=require('mongoose')
require('dotenv').config();
//onst mongoURL='mongodb://localhost:27017/restaurant'; //local URL
//const mongoURL = 'mongodb+srv://gdhruba636:Dhruba636@cluster0.4evzexl.mongodb.net/'
const mongoURL=process.env.DB_URL;

const connectDB = async()=>{
    try {
        await mongoose.connect(mongoURL);
        console.log("Connection Successful");
    } catch (error) {
        console.log("Connection failed");
        process.exit(0)
        }
}
const db=mongoose.connection;
db.on('connected' , ()=>{
    console.log("Connected");
})
db.on('disconnected' , ()=>{
    console.log("Disonnected");
})
db.on('error' , ()=>{
    console.log("Error");
})

module.exports=connectDB;
