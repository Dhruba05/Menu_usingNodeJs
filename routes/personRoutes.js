const express=require('express')
const router=express.Router()
const Person = require('./../models/person')

router.post('/' , async (req,res)=>{
    try {
        const personData = req.body;
        const newPerson = new Person(personData)
        const response = await newPerson.save()
        console.log("Person data is saved");
        res.status(200).json(response)

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" })
    }
})
router.get('/', async (req, res) => {
    try {
        const personData = await Person.find()
        console.log("Data fetched");
        res.status(200).json(personData)
    } catch (error) {
        console.log(error);
    }
})
module.exports=router