const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    //comment belong to the user
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    //include ids of comments 
    comments:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'comment'  
        }
    ]
},
 {
    timestamps:true
 }
);

const Post = mongoose.model('Post',postSchema);

module.exports = Post;