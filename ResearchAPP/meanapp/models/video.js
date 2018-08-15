const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require ('../config/database');

// user schema
const videoSchema =  mongoose.Schema({
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
        type:Number,
        required:true
    }

});

const Video = module.exports = mongoose.model('video',videoSchema );

module.exports.addVideo = function(newVideo , callback){
 
    newVideo.save(callback);

}

// find By Video user ID and pass all the projects on that name
module.exports.finedVideoByuserId = function (lectureName,callback){
    const query = {lectureName:lectureName}
    Video.find(query,callback);
    
}

// get All Project
module.exports.geAllVideo = function(callback){
    Video.find(callback);
}


// get Video By Id
module.exports.getVideoById = function(id, callback){
    Video.findById(id,callback);
}


module.exports.finedVideoUnit = function (unit,callback){
    const query = {unit:unit}
    var mysort = { 'ratings': 1 };
    Video.find(query,callback).sort({ 'ratings': -1 });
    
}
