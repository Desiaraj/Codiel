const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = function(req,res){

    Post.create({
        content:req.body.content,
        user:req.user._id
    }).then((post)=>{
       console.log("Successfully created post");
       return res.redirect('back');
    }).catch((err)=>{
       console.log("Can't able to create post");
       return res.redirect('back');
    });
}

module.exports.createComment = function(req,res){
     
    Comment.create({
        content:req.body.content,
        post:req.body.post,
        user:req.user._id
    }).then((response)=>{
        console.log("Response ",response);
        res.redirect('back');
    }).catch((err)=>{
       console.log("error while create comment ",err);
       res.redirect('back');
    });
}

module.exports.delete = function(req,res){
    return res.end("Delete the post ");
}

module.exports.update = function(req,res){
    return res.end("Update method called");
}