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

module.exports.delete = function(req,res){
       
    Comment.findById(req.params.id).then((comment)=>{
        if(req.user.id == comment.user){

            let postId = comment.post;

            comment.deleteOne();

            Post.findByIdAndUpdate(postId,{$pull:{comments:req.params.id}}).then((response)=>{
                return res.redirect('back');
            }).catch((err)=>{
              console.log("error while update post ",err);
              return res.redirect('back');
            });
           
        }else{

            Post.findById(comment.post).then((post)=>{
                if(req.user.id == post.user){
                     comment.deleteOne();
                     Post.findByIdAndUpdate(post.id,{$pull:{comments:req.params.id}}).then((response)=>{
                        return res.redirect('back');
                    }).catch((err)=>{
                      console.log("error while update post ",err);
                      return res.redirect('back');
                    });
                }else{
                    return res.redirect('back');
                }
            }).catch((err)=>{
               console.log("error while find post");
               return res.redirect('back');
            });


            
        }
    }).catch((err)=>{
      console.log("Comment not exists",err);
      return res.redirect('back');
    });
}