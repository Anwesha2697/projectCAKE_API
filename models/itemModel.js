const mongoose=require('mongoose');
require('./categoryModel');


const itemSchema=new mongoose.Schema({
    title:{type:String},
    price:{type:Number},
    description:{type:String},
    specification:{type:String},
    imageUrl:{type:String},
    cloudinaryId:{type:String},
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'category',
        require:true
    },
},{timestamps:true});

module.exports=mongoose.model('Item',itemSchema);
