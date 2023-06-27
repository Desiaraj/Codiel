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


module.exports.delete = function(req,res){
    Post.findById(req.params.id).then((post)=>{
         //check the user 
         //.id means converting object to string 
         if(post.user == req.user.id){
              post.deleteOne();
              
              Comment.deleteMany({post:req.params.id}).then((response)=>{
                  return res.redirect('back');
              }).catch((err)=>{
                 console.log("Error in deleting comments");
                 return res.redirect('back');
              });

         }else{
            return res.redirect('back');
         }
    }).catch((err)=>{
      console.log("Post not there",err);
      return res.redirect('back');
    });
}

module.exports.update = function(req,res){
    return res.end("Update method called");
}