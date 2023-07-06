const Post = require('../models/post');
const Comment = require('../models/comment');
const User = require('../models/user');

module.exports.create = async function(req,res){

    try{
        let post = await Post.create(
                              {
                                content:req.body.content,
                                user:req.user._id
                             });    
        let finalPost = await Post.findById(post.id).populate('user',{name:1});                     
        console.log(finalPost);                      
        // let user = await User.findById(post.user);     
        // console.log(user);                                     
        req.flash('success',"New Post created successfully");   
        //check request is ajax or not
        if(req.xhr){
            return res.status(200).json({
                data:{
                    post: finalPost,
                },
                message:"post created"
            })
        }else{
            // return res.redirect('back');                       
        }                   
             
    }catch(err){
        req.flash('error',"post create error");
        console.log("Error ",err);
        return res.redirect('back');
    }
}


module.exports.delete = async function(req,res){
 
    try{
        let post = await Post.findById(req.params.id);
    
        if(post.user == req.user.id){
            await post.deleteOne();
            
            await Comment.deleteMany({post:req.params.id});
            if(req.xhr){
                req.flash('success',"Post deleted successfully"); 
                return res.status(200).json({
                    data:{
                        post_id:req.params.id
                    },
                    message:"Post Deleted successfully"
                })
            }
            
            return res.redirect('back');
        }else{
            req.flash('error','you cannot access to delete post');
            return res.redirect('back');
        }
    }catch(err){
        req.flash('error',"Please try again later");
        console.log("err",err);
        return res.redirect('back');
    }
}

module.exports.update = function(req,res){
    return res.end("Update method called");
}