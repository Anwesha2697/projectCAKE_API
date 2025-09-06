const mongoose=require('mongoose');

const delareaSchema=new mongoose.Schema({
     areaname:{type:String}

});
module.exports=mongoose.model('Delarea',delareaSchema);
