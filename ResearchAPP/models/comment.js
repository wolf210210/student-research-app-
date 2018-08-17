const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require ('../config/database');

// user schema
const CommentsSchema =  mongoose.Schema({
    Vname:{
        type :String,
        required:true
    },
    VID:{
        type: String,
        required:true
    
    },
    username:{
        type :String,
        required:true

    },
    comment:{
        type:String,
        required:true
    },
    CType:{
        type:String,
        required:true
    },
    rate:{
        type:String,
        required:true
    }

});

const Comment = module.exports = mongoose.model('Comments',CommentsSchema );


module.exports.addComment = function(newComment , callback){
               newComment.save(callback);

}

// find By Leader name
module.exports.finedCommentByVId = function (VID,callback){
    const query = {VID:VID}
    Comment.find(query,callback);
    
}