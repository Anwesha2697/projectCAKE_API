const express=require('express');
const router=express.Router();
const upload=require('../middleware/multer');
const cloudinary=require('../config/cloudinary');
const Image=require('../models/imageModel');


//upload image
router.post('/upload',upload.single('image'),async(req,res)=>{
    try{
        const result=await cloudinary.uploader.upload(req.file.path);
        const image=await Image.create({
            name:req.body.name,
            imageURL:result.secure_url,
            cloudinaryID:result.public_id
        });
        res.status(201).json(image)
    }catch(err){
        res.status(500).json({message:err.message});
    }

});

//get all
router.get('/all',async(req,res)=>{
try{
    const images=await Image.find();
    if(!images)return res.status(404).json({message:'image not found'})
        res.json(images)
}catch(err){
    res.status(500).json({message:err.message})
}
});

//delete image
router.delete('/:id',async(req,res)=>{
    try{
       const image=await Image.findByID(Request.params.id);
       if(!image)return res.status(404).json({message:'image not found'});

        //remove from cloudinary
        await cloudinary.uploader.destroy(image.cloudinaryID);

        //remove from mongoDB
        await image.deleteOne();
        res.json({messages:'image delete successfully'}); 
    }catch(err){
        res.status(500).json({message:err.message})
    }
});
//update image
router.put('/:id',upload.single('image'),async(req,res)=>{
    try{
         const image=await Image.findByID(Request.params.id);
       if(!image)return res.status(404).json({message:'image not found'});

       //new file upload
       const result=await cloudinary.uploader.upload(req.file.path);
       image.name=req.body.name||image.name//if new name is not available then old dat will be remain save
       image.imageURL=result.secure_url;
       image.cloudinary=result.public_id;
       //update the data into mongoDB
       await image.save()
       res.json(image);
    }catch(err){
        res.status(500).json({message:err.message})
    }
})

module.exports=router;