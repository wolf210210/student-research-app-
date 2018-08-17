const express = require('express'); 
const router = express.Router();
const Attachment = require('../models/attachment');


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

router.post('/add',upload.single('attachemntVideo'),(req,res,next) => {


   let newAttachment = new Attachment({ 
    name: req.body.name, 
    subject: req.body.subject,
    description : req.body.description, 
    videoId:req.body.videoId,
    attachmentPath: req.file.originalname, 
    videoTitle:req.body.videoTitle  
   
   });
 
   Attachment.addAttachment(newAttachment,(err,attachment)=>{
    if(err){
        res.json({success:false, msg:'failed to add  Attachment'});
    }
    else{
        res.json({success: true , msg:' add Attachment',attachment:attachment});
    }

   });


 });



 router.post('/getAttachmentByVid',(req,res,next) => {

    
    const videoId = req.body.videoId;

    Attachment.finedAttachByVideoId(videoId,(err,attachment)=> {
      if(err) throw err;

      if(!attachment){

      res.json({success:false , msg : 'Attachment not found'});
     }
      
      if(attachment){

         return res.json({attachment : attachment});
        
      }

    })
    
});


router.delete('/deleteAttachment/:id',(req,res,next) => {

 
    Attachment.findByIdAndRemove(req.params.id, function(err,deletedShare){
               if(err){
                 res.send("error deleting ");
               }else{
                //  res.json("successfully deleted");  
                console.log('Delete a attachments');
                 res.json({  
                  success:true, 
                  deletedShare
                 });
                 
                     
    
               }
             }
     
       ) 
  
  
   });

 

 
 module.exports = router;