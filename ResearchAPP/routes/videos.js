const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

const Video = require('../models/video');

// Resister 
router.post('/add',(req,res,next) => {
 
    
    // console.log(req.body);
    let newVideo = new Video({
        title: req.body.title,
        lectureName: req.body.lectureName,
        unit : req.body.unit,  
        subject : req.body.subject,
        description : req.body.description,
        url : req.body.url,
        neg : req.body.neg,
        pos : req.body.pos,
        ratings : req.body.ratings
       });

       Video.addVideo(newVideo,(err,video,)=>{
        if(err){
            res.json({success:false, msg:'failed to add video'});
        }
        else{
            res.json({success: true , msg:'video added' , Video:video });
        }
    
       });

 
 });


 /* pass the projects details via JSON object which is assigned to the projectName*/ 
router.post('/getVideostByuserId',(req,res,next) => {
      
    const lectureName = req.body.lectureName;
  
    Video.finedVideoByuserId(lectureName,(err,Video)=> {
      if(err) throw err;
  
      if(!Video){
  
      res.json({success:false , msg : 'Video not found'});
     }
      
      if(Video){
  
         return res.json(Video);
        
      }
  
    })
    
  });



  router.get('/getAllVideo',(req,res,next) => {



    Video.geAllVideo((err,Videos)=> {
      if(err) throw err;
  
      if(!Videos){
    
      res.json({success:false , msg : 'Videos not found'});
     }
      
      if(Videos){
         return res.json({Videos:Videos});
      }     
  
    })
    
  });
  

  /* request project id from the body and pass project object */ 
router.post('/getProjectId',(req,res,next) => {

          const Vid = req.body.Vid;


          Video.getVideoById(Vid,(err,Videos)=> {
            if(err) throw err;

            if(!Videos){
          
            res.json({success:false , msg : 'Project not found'});
          }
            
            if(Videos){
              return res.json(Videos);
            }     

          })
          
});



router.put('/UpdateRate',(req,res,next) => {


  Video.findByIdAndUpdate(req.body._id,
      {
      $set:{ 
              neg : req.body.neg,
              pos : req.body.pos,
              ratings : req.body.ratings
            }
      },
        {
           new :true
        },
        function(err,updateProject){
          if(err){
            res.send("error update");
          }else{
            res.json(updateProject);
          }
        }

  ) 

});
  




router.put('/UpdateVideo',(req,res,next) => {


  Video.findByIdAndUpdate(req.body._id,
      {
      $set:{ 
                title: req.body.title,
                subject : req.body.subject,
                description : req.body.description,
                unit : req.body.unit
            
            }
      },
        {
           new :true
        },
        function(err,updateProject){
          if(err){
            res.send("error update");
          }else{
            res.json(updateProject);
          }
        }

  ) 

});




router.delete('/deleteVideo/:id',(req,res,next) => {

 
  Video.findByIdAndRemove(req.params.id,

           function(err,deletedProject){
             if(err){
               res.send("error update");
             }else{
              console.log('Deleting a Project');
               res.json({  
                success:true, 
                deletedProject
               });
               
  
  
             }
           }
   
     ) 


 });


 router.post('/getVideosByUnit',(req,res,next) => {

  const unit = req.body.unit;


  Video.finedVideoUnit(unit,(err,Videos)=> {
    if(err) throw err;

    if(!Videos){
  
    res.json({success:false , msg : 'Videos not found'});
  }
    
    if(Videos){
      return res.json({videos:Videos});
    }     

  })
  
});

  

module.exports = router;