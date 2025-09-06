const express=require('express');
const router=express.Router();
const upload=require('../middleware/multer');
const cloudinary=require('../config/cloudinary');
const Item=require('../models/itemModel');
const authenticate=require('../middleware/authenticate');
const authorize=require('../middleware/authorize');


//add item
router.post('/',authenticate,authorize('admin'), upload.single('image'), async(req,res)=>{
    try{
        const result=await cloudinary.uploader.upload(req.file.path);
        const item=await Item.create({
            title:req.body.title,
            price:req.body.price,
            description:req.body.description,
            specification:req.body.specification,
            category:req.body.category,
            imageUrl:result.secure_url,
            cloudinaryId:result.public_id
        });
        res.status(201).json(item)
    }catch(err){
        res.status(500).json({message:err.message});
    }
});





//get item
router.get('/',  async(req,res)=>{
    const allitem=await Item.find().populate('category');
    res.json(allitem);

});


module.exports=router;
