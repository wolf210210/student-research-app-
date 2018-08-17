//import { isMaster } from 'cluster';

const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

const multer = require('multer');
const bcrypt = require('bcryptjs');

const storage =  multer.diskStorage({
    destination : function(req,file,cb){
        cb(null , './uploads/');
    },
    filename:function(req,file,cb){
        cb(null,file.originalname);
    }
})



const  upload = multer({storage:storage});

const User = require('../models/user');


// Resister 
router.post('/register',(req,res,next) => {
   // res.send('REGISTER');
   
   let newUser = new User({
    name: req.body.name,
    email: req.body.email,
    username : req.body.username,  
    password : req.body.password,
    occupation : req.body.occupation
   });

   User.addUser(newUser,(err,user)=>{
    if(err){
        res.json({success:false, msg:'failed to register user'});
    }
    else{
        res.json({success: true , msg:'User registered'});
    }

   });


});

  


// Resister 
router.post('/register2',upload.single('profileImage'),(req,res,next) => {
    // res.send('REGISTER');
    // console.log(req.file);
    let newUser = new User({
     name: req.body.name,
     email: req.body.email,
     username : req.body.username,  
     password : req.body.password,
     occupation : req.body.occupation
    });
 
    User.addUser(newUser,(err,user)=>{
     if(err){
         res.json({success:false, msg:'failed to register user'});
     }
     else{
         res.json({success: true , msg:'User registered'});
     }
 
    });
 
 
 });

// Authenticate
router.post('/authenticate',(req,res,next) => {
    //res.send('AUTHENDTICATE');
 
    const username = req.body.username;
    const password = req.body.password;

    User.getUserByUsername(username,(err,user)=> {
        if(err) throw err;
        if(!user){
            return res.json({success:false , msg : 'User not found'});
        }
 
        User.comparePassword(password , user.password,(err,isMatch)=>{
            if(err) throw err;
            if(isMatch){
                const token = jwt.sign(user.toJSON(),config.secret,{
                    // i week login time
                    expiresIn : 604800
                });

                res.json({  
                     success:true, 
                    token: 'JWT '+token,
                     user:{ 
                         id:user._id,
                         name: user.name,
                         username:user.username,
                         email:user.email,
                         occupation:user.occupation
                     }
                });

            }
            else{
                return res.json({success: false , msg :'Wrong password'})
            }
        });

    });

});

// profile
router.get('/profile',passport.authenticate('jwt',{session:false}) , (req,res,next) => {
  //  res.send('PROFILE');
    res.json({user:req.user});

});



/* Once user request for the update. request user details from the id then let the user to change the name and the email address
   if that callback fails then pormpt an error message. if the user detail update properly then user details send via JSON object*/
   router.put('/Updateprofile',(req,res,next) => {

    //  console.log(req.body);
   
    User.findByIdAndUpdate(req.body._id,
         {
        $set:{  name:req.body.name,
                email: req.body.email,
                occupation :req.body.occupation
                
               }
         },
           {
              new :true
           },
           function(err,upUser){
             if(err){
               res.send("error update");
             }else{
               res.json(upUser);
             }
           }
   
     ) 
   
   });



   router.post('/chakePassword',(req,res,next) => {

    //console.log(req.body);

    User.comparePassword(req.body.password , req.body.userPassword,(err,isMatch)=>{ 
    
       if(err) throw err;
       if(isMatch){
           return res.json({success: true , msg :' password Match'})

       }
       else{
           return res.json({success: false , msg :'Wrong password'})
       }
   });
 
  });


  /* get the newly added password and then decrypt that password and add that password to the data collection */
  router.put('/UpdatePassword',(req,res,next) => {
    let  ChPassword  = {
        NewChPassword : ""
                            }
            //  console.log(req.body);
            bcrypt.genSalt(10,(err,salt)=>{
            bcrypt.hash(req.body.newpassword,salt,(err,hash)=>{
                if(err) throw err;
                ChPassword.NewChPassword = hash;
                

            User.findByIdAndUpdate(req.body._id,
            {
            $set:{  password:ChPassword.NewChPassword

                }
            },
            {
                new :true
            },
                function(err,upUser){
                    if(err){
                    res.send("error update");
                    }else{
                    res.json(upUser);
                    }
                }

            ) 

          });

     });

});

   


module.exports = router;