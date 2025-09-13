const express=require('express'); 
const nodemailer=require('nodemailer');
const router=express.Router();
const customer=require('../models/customerModel');


const transporter=nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:'anwesha2697@gmail.com',
        pass:'fgzq poyd jeme mkrd',
    },
});




// router.get('/',async(req,res)=>{
//     const allcust=await customer.find();
    
//     res.json(allcust);
// });

router.get('/',async(req,res)=>{
    const allcust=await customer.find().populate('delarea');
    
    res.json(allcust);
});




router.post('/',async(req,res)=>{
    try{
         const email=req.body.email;
         const to=email;
         const subject='Registration confirmation';
         const text="Thank you for joining Cake Shop! We're excited to have you on board.\n\n\n\nBest regards,\nThe Cake Shop Team";
        const existcust= await customer.findOne({email});
        if(existcust){
            return res.status(400).json({message:'customer already exist'});
        }
        const newcust=new customer(req.body);
        const save=await newcust.save();
        const info=await transporter.sendMail({
            from:'"Cake Shop" anwesha2697@gmail.com',
            to,
            subject,
            text
        })
        res.status(200).json(save)
    }catch(err){
        res.status(400).json({message:err.message});
    }
    
});



router.delete('/:id',async(req,res)=>{
    try{
        
        const result= await Emp.findByIdAndDelete(req.params.id);
        res.status(200).json(result);
        
        
    } catch(err){
        res.status(500).json({message:err.message});
    }

});



router.put("/:id", async (req, res) => {
    try {
        const { name, email, role} = req.body;
        const upd = await cust.findByIdAndUpdate(
            req.params.id,
            { name, email, role},
            { new: true, runValidators: true }
        );

        if (!upd) {
            return res.status(404).json({ message: "record not found" });
        }

        res.status(200).json(upd.toObject()); // Convert Mongoose doc to plain object
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});











module.exports=router;
