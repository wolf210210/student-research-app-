const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require ('../config/database');


const AttachmentSchema =  mongoose.Schema({
    name:{
        type :String,
        required:true
    },
    subject:{
        type: String,
        required:true
     
    },
    description:{
        type :String,
        required:true
    },
    videoId:{
        type :String,
        required:true
      },
    attachmentPath:{
        type :String,
        required:true
      },
    videoTitle:{
        type :String,
        required:true
      }


});
// module
const Attachment = module.exports = mongoose.model('Attachmen',AttachmentSchema );
// add Project
module.exports.addAttachment = function(newAttachment , callback){
                     newAttachment.save(callback);
};

// find By Projects name and pass all the projects on that name
module.exports.finedAttachByVideoId = function (videoId,callback){
    const query = {videoId:videoId}
    Attachment.find(query,callback);
    
}