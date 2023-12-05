const express = require('express');
const db = require('./config/mongoose');
const cors = require('cors');
const app = express();
const passport = require('passport');
const passportJWT = require('./config/passport-jwt');

const PORT = 3000;

app.use(cors({
    origin: '*',
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));
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