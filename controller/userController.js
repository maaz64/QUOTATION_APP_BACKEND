const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports.signUp =async (req,res)=>{

    try {
        const{name,email,password,confirm_password} = req.body;

        if(password != confirm_password)
        {
            return res.status(422).json({
                message:"password doesn't match",
                data:{}
            });
        }
    
        const user = await User.findOne({email});
    
        if(user)
        {
            return res.status(409).json({
                message:"User already exist!!!",
                data:{}
            }); 
        }
        else{
            const saltRounds = 10;
            const hashPassword = bcrypt.hashSync(password, saltRounds);
    
            const newUser = await User.create({
                name,email,password:hashPassword
            })
    
            return res.status(201).json({
                message:"Success",
                data:{newUser}
            });
        }
        
    } catch (error) {
        return res.status(201).json({
            message:"Internal Server Error",
            data:{},
            error
        });
        
    }

 

}

module.exports.signIn =async (req,res)=>{

    try {
        const {email,password} = req.body;

        const user = await User.findOne({email});
        if(!user)
        {
            return res.status(401).json({
                message:"Invalid credentials",
                data:{}
            })
        }
    
        const isPassMatch = bcrypt.compare(password, user.password);
    
        if(!isPassMatch)
        {
            return res.status(401).json({
                message:"Invalid email/password",
                data:{}
            })
        }
    
        const token = jwt.sign({email},"somethingsecret",{expiresIn:"1h"});
    
        return res.status(200).json({
            message:"Sign in successfully",
            data:{
                name:user.name,
                userId:user._id,
                token
            }
        })
        
    } catch (error) {
        return res.status(201).json({
            message:"Internal Server Error",
            data:{},
            error
        });

        
    }

  

}