const passport =require('passport')
const LocalStrategy=require('passport-local').Strategy;
const Person = require('./models/person');

//verification fucntion
passport.use(new LocalStrategy(async(USERNAME , PASSWORD , done) =>{
    //authentication logic
    try {
        console.log("Received credentials :" , USERNAME,PASSWORD);
        const user=await Person.findOne({username : USERNAME})
        if(!user)
        return done(null,fasle , {message :'Incorrect user'})
        const isPasswordMatch=user.password == PASSWORD ? true:false
        if(isPasswordMatch){
            return done(null,user)
        }else{
            return(null,fasle , {message :'Incorrect password'})
        }

    } catch (error) {
        return done(error)
        
    }

}))
module.exports=passport;