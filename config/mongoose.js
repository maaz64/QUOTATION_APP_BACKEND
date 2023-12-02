const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MongoURL).then(()=>{
    console.log("Connected to database successfully");
}).catch((err)=>{
    console.log("Error in connecting database",err);
});