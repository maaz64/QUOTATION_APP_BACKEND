const express = require('express');
const app = express();
const db = require('./config/mongoose');
const passport = require('passport');
const passportJWT = require('./config/passport-jwt');

const PORT = 3000;
const routes = require('./routes/index');

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use('/',routes);

app.listen(PORT,(err)=>{
    if(err)
    {
        console.log("Error in running server",err);
    }
    console.log(`Server is up and running on port ${PORT}`);
});