const mongoose = require('mongoose');


// Define the Person schema
const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age:{
        type: Number
    },
    work:{
        type: String,
        enum: ['chef', 'waiter', 'manager'],
        required: true
    },
    mobile:{
        type: String,
        required: true
    },
   
    username: {
        required: true,
        type: String
    },
    password: {
        required: true,
        type: String
    }
});
const Person = mongoose.model('Person', personSchema)
module.exports = Person
