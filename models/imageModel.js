const mongoose=require ('mongoose');
const imageSchema=new mongoose.Schema({
    name:String,
    imageURL:String,
    cloudinaryID:String,
},{timestamps:true});
module.exports=mongoose.model('Image',imageSchema);