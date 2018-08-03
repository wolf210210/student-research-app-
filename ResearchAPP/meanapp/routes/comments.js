
const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

const Comment = require('../models/comment');

// Resister 
router.post('/setComment',(req,res,next) => {
    // res.send('REGISTER');
    
    let newComment = new Comment({
        Vname: req.body.Vname,
        VID: req.body.VID,
        username : req.body.username,  
        comment : req.body.comment,
        CType : req.body.CType
    });
 
    // console.log(req.body);
    Comment.addComment(newComment,(err,comment)=>{
     if(err){
         res.json({success:false, msg:'failed to add comment'});
     }
     else{
         res.json({success: true , msg:'add comment' ,comments:comment});
     }
 
    });
 
 
 });


 router.post('/getCommentByVId',(req,res,next) => {

    
    const VID = req.body.VID;

    Comment.finedCommentByVId(VID,(err,comment)=> {
      if(err) throw err;

      if(!comment){

      res.json({success:false , msg : 'comment not found'});
     }
      
      if(comment){

         return res.json(comment);
        
      }

    })
    
});

/* get user id by using findByIdAndRemove and then delete the user details. Error message will prompt if the is an error else 
   success message pass via JSON object  */
   router.delete('/deleteComment/:id',(req,res,next) => {

 
    Comment.findByIdAndRemove(req.params.id, function(err,deletedProfile){
               if(err){
                 res.send( message = "error deleting ");
               }else{
                //  res.json("successfully deleted");  
              //  console.log('Delete a Profile');
                 res.json({  
                  success:true
                  
                 });
                 
                     
    
               }
             }
     
       ) 
  
  
   });



module.exports = router;