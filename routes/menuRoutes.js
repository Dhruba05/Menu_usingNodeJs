const express=require('express')
const router=express.Router()
const menuItem = require('./../models/menuItem')
router.post('/', async (req, res) => {
    try {
        const menuData = req.body;
        const newMenuItem = new menuItem(menuData)
        const response = await newMenuItem.save()
        console.log("Menu data is saved");
        res.status(200).json(response)
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" })
    }
})

router.get('/', async (req, res) => {
    try {
        const menuData = await menuItem.find()
        console.log("Data fetched");
        res.status(200).json(menuData)
    } catch (error) {
        console.log(error);
    }
})

router.get('/:tasteType', async(req, res) => {//tastetype is the variable
    try {
        const tasteType = req.params.tasteType;
        if (tasteType == 'sweet' || tasteType == 'sour' || tasteType == 'spicy') { 
            const response=await menuItem.find({taste:tasteType}); //taste is coming from menuItem model
            console.log('Response fetched');
            res.status(200).json(response)
        }
    } catch (error) {
        res.status(404).json({error:"Invalid taste"})
    }
})


router.put('/:id' ,async(req,res)=>{
    try {
        const menuItemId=req.params.id; 
        const updatedMenuItemData=req.body //data sent by client is saved in req body by body parser , the updated data we want to send
        //id is sent by parameter , data in body is sent by json
        const response=await menuItem.findByIdAndUpdate(menuItemId , updatedMenuItemData,{
            new:true, //after updating we need the new updated data which is sent to response
            runValidators:true
        })

        if(!response){
            return res.status(404).json({error:'Person not found'})
        }
        console.log("Data update");
        res.status(200).json(response)


    } catch (error) {
        res.status(500).json({error:"Error"})
    }
})
router.delete('/:id' , async(req,res)=>{
    try {
        const menuItemId=req.params.id; 
        const response=await menuItem.findByIdAndDelete(menuItemId)
        if(!response){
            return res.status(404).json({error:'Person not found'})
        }
        console.log("Data deleted");
        res.status(200).json({message:'Item Deleted'})
    } catch (error) {
        res.status(500).json({error:"Error"})
    }
})
module.exports=router
//comment