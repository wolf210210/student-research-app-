const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require ('../config/database');

// user schema
const shareSchema =  mongoose.Schema({
    title:{
        type :String,
        required :true
    },
    lectureName:{
        type: String,
        required :true
    },
    unit:{
        type :String,
        required:true
    },
    subject:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    url:{
        type:String,
        required:true
    },
    neg:{
        type:String,
        required:true
    },
    pos:{
        type:String,
        required:true
    },
    ratings:{
        type:String,
        required:true
    },
    videoId:{
        type :String,
        required:true
      },
    username:{
        type:String,
        required:true
    }

});

const Share = module.exports = mongoose.model('share',shareSchema );

module.exports.addVideo = function(newVideo , callback){
 
    newVideo.save(callback);

}


module.exports.finedVideoByUsername = function (username,callback){
    const query = {username:username}
    Share.find(query,callback);
    
}