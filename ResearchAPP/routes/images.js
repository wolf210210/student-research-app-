const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const multer = require('multer');


const storage =  multer.diskStorage({
    destination : function(req,file,cb){
        // console.log(req)
        cb(null , './uploads/');
    },
    filename:function(req,file,cb){
        cb(null,file.originalname);
    }
})



const  upload = multer({storage:storage});




const Image = require('../models/image');

// Resister 
router.post('/add',(req,res,next) => {
 
    
    // console.log(req.body);
    let newImage = new Image({
        title: req.body.title,    
        description : req.body.description
       });

       Image.addImage(newImage,(err,image,)=>{
        if(err){
            res.json({success:false, msg:'failed to add Image'});
        }
        else{
            res.json({success: true , msg:'Image added' , image:image });
        }
       });

 
 });


 // Resister   
router.post('/addImage',upload.single('profileImage'),(req,res,next) => {
 
    
    // console.log(req.file);
    let newImage = new Image({
        title: req.body.title,    
        description : req.body.description,
        ImageImage : req.file.path
       }); 

       Image.addImage(newImage,(err,image,)=>{
        if(err){
            res.json({success:false, msg:'failed to add Image'});
        }
        else{
            res.json({success: true , msg:'Image added' , image:image });
        }
       });

 
 });


   /* request project id from the body and pass project object */ 
router.post('/getImageId',(req,res,next) => {

    const IId = req.body.IId;


    Image.getImageById(IId,(err,Image)=> {
      if(err) throw err;

      if(!Image){
    
      res.json({success:false , msg : 'Project not found'});
    }
      
      if(Image){
        return res.json(Image);
      }     

    })
    
});


 
module.exports = router;