const express=require('express');
const mongoose =require('mongoose');
const  dotenv=require('dotenv').config();
const app=express ();
app.use(express.json());
const mongoURI=process.env.DATABASE_URL;
const port=process.env.PORT;
mongoose.connect(mongoURI).then(()=>console.log("connection is successful with MongoDB"))
.catch((err)=>console.log('MongoDB connection error',err));

const customer=require('./routes/customerroutes');
const Category=require('./routes/catroutes');
const Image=require('./routes/imageroutes');
const Delarea=require('./routes/delarearoutes');
const Item=require('./routes/itemRoutes');
const auth=require('./routes/authRoutes');
app.use('/cust',customer);
app.use('/cat',Category);
app.use('/image',Image);
app.use('/delarea',Delarea);
app.use('/item',Item);
app.use('/auth',auth);

app.listen(port,()=>console.log(`listening port number is :${port}`));