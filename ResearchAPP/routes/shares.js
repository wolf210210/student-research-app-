const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

const Share = require('../models/share');

// Resister 
router.post('/add',(req,res,next) => {
 
    
    // console.log(req.body);
    let newShare = new Share({
        title: req.body.title,
        lectureName: req.body.lectureName,
        unit : req.body.unit,  
        subject : req.body.subject,
        description : req.body.description,
        url : req.body.url,
        neg : req.body.neg,
        pos : req.body.pos,
        ratings : req.body.ratings,
        videoId :req.body.videoId,
        username : req.body.username
       });

       Share.addVideo(newShare,(err,share,)=>{
        if(err){
            res.json({success:false, msg:'failed to add share'});
        }
        else{
            res.json({success: true , msg:'share added' , share:share });
        }
    
       });

 
 });


 /* pass the projects details via JSON object which is assigned to the projectName*/ 
router.post('/getShareShareByusername',(req,res,next) => {
      
    const username = req.body.username;
  
    Share.finedVideoByUsername(username,(err,share)=> {
      if(err) throw err;
  
      if(!share){
  
      res.json({success:false , msg : 'share not found'});
     }
      
      if(share){
  
         return res.json({success:false, share:share});
        
      }
  
    })
    
  });





router.delete('/deleteshare/:id',(req,res,next) => {

 
  Share.findByIdAndRemove(req.params.id, function(err,deletedShare){
             if(err){
               res.send( message = "error deleting ");
             }else{
     
               res.json({  
                success:true,
                deletedShare :deletedShare
                
               });
               
                   
  
             }
           }
   
     ) 


 });

  

module.exports = router;