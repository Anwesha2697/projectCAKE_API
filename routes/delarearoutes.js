const express=require('express');
const router=express.Router();
const Delarea=require('../models/delareaModel')






router.get('/',async(req,res)=>{
    const alldelarea=await delarea.find();
    
    res.json(alldelarea);
});



router.post('/',async(req,res)=>{
    try{
         const newdelarea=new Delarea(req.body);
        const save=await newdelarea.save();
        res.status(200).json(save)
    }catch(err){
        res.status(400).json({message:err.message});
    }
    
});

module.exports=router;