const Post = require('../models/post');

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

module.exports.delete = function(req,res){
    return res.end("Delete the post ");
}

module.exports.update = function(req,res){
    return res.end("Update method called");
}