const mongoose=require('mongoose');
const bcrypt=require('bcryptjs');


const customerSchema=new mongoose.Schema({
    fname:{type:String},
    lname:{type:String},
    email:{type:String},
    password:{type:String},
    mobile:{type:Number},
    role:{
        type:String,
        enum:['customer','admin'],default:'customer'
    },
   
    
});


customerSchema.methods.comparePassword=async function(plainPassword){
    return bcrypt.compare(plainPassword, this.password);
};


customerSchema.pre('save',async function(next){
    if(this.isModified('password')){
        this.password=await bcrypt.hash(this.password,10)
    }
    next();
});


module.exports=mongoose.model('customer',customerSchema);
