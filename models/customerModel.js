const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const customerSchema = new mongoose.Schema({
  fname: { type: String, required: true, trim: true },
  lname: { type: String, required: true, trim: true },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: { type: String, required: true },
  mobile: {
    type: String,
    required: true,
    match: [/^\d{10}$/, "Invalid mobile number"]
  },
  role: {
    type: String,
    enum: ["customer", "admin"],
    default: "customer"
  }
}, { timestamps: true });



customerSchema.methods.comparePassword=async function(plainPassword){
    return bcrypt.compare(plainPassword, this.password);
};


customerSchema.pre("save", async function(next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});


module.exports=mongoose.model('customer',customerSchema);
