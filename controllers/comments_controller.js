const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = function(req,res){
     
    Post.findById(req.body.post).then((post)=>{
        Comment.create({
            content:req.body.content,
            post:req.body.post,
            user:req.user._id
        }).then((comment)=>{
            console.log("Response ",comment);
            post.comments.push(comment);
            post.save();
            res.redirect('back');
        }).catch((err)=>{
           console.log("error while create comment ",err);
           res.redirect('back');
        });  
    }).catch((err)=>{
        console.log("There is no post ",err);
        return res.redirect('back');
    });

   
}