const mongoose=require('mongoose')
const mongoURL='mongodb://localhost:27017/restaurant';
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
