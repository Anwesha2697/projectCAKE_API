const express=require('express');
const router=express.Router();
const Customer=require('../models/customerModel');
const jwt=require('jsonwebtoken');



router.post('/login',async(req,res)=>{
    try{
        const{email,password}=req.body;
        const user=await Customer.findOne({email});
        if(!user){
            return res.status(400).json({message:'invaid email'})
           }
        const isPasswordCorrect= await user.comparePassword(password);
        if(!isPasswordCorrect){
            return res.status(400).json({message:'invalid password'})
        }
        const token=jwt.sign({username:user.fname, role:user.role, userid:user._id},process.env.SECRET_KEY,{expiresIn: process.env.JWT_EXPIRATION});
        // const role=user.role;
        res.json({token});

    }catch(err){
        res.status(400).json({message:err.message});
    };
    
    
    

});
module.exports=router;
