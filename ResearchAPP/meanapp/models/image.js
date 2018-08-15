const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require ('../config/database');

// user schema
const imageSchema =  mongoose.Schema({
    title:{
        type :String,
        required :true
    },
    description:{
        type:String,
        required:true
    },
    ImageImage :  {
        type:String,
        required:true
    }

});

const Video = module.exports = mongoose.model('image',imageSchema );

module.exports.addImage = function(newImage , callback){
 
    newImage.save(callback);

}

// get Video By Id
module.exports.getImageById = function(id, callback){
    Video.findById(id,callback);
}
