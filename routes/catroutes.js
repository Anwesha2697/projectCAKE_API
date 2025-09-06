const express=require('express');
const router=express.Router();
const Category=require('../models/categoryModel')






router.get('/',async(req,res)=>{
    const allcategory=await Category.find();
    
    res.json(allcategory);
});



router.post('/',async(req,res)=>{
    try{
         const name=req.body.name;
        const existcat= await Category.findOne({name});
        if(existcat){
            return res.status(400).json({message:'category already exist'});
        }
        const newcat=new Category(req.body);
        const save=await newcat.save();
        res.status(200).json('saved')
    }catch(err){
        res.status(400).json({message:err.message});
    }
    
});



// router.delete('/:id',async(req,res)=>{
//     try{
        
//         const result= await Emp.findByIdAndDelete(req.params.id);
//         res.status(200).json(result);
        
        
//     } catch(err){
//         res.status(500).json({message:err.message});
//     }

// });



// router.put("/:id", async (req, res) => {
//     try {
//         const { name, email, role} = req.body;
//         const upd = await cust.findByIdAndUpdate(
//             req.params.id,
//             { name, email, role},
//             { new: true, runValidators: true }
//         );

//         if (!upd) {
//             return res.status(404).json({ message: "record not found" });
//         }

//         res.status(200).json(upd.toObject()); // Convert Mongoose doc to plain object
//     } catch (err) {
//         res.status(400).json({ message: err.message });
//     }
// });











module.exports=router;
