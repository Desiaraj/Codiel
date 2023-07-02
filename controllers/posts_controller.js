const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = async function(req,res){

    try{
        await Post.create(
                              {
                                content:req.body.content,
                                user:req.user._id
                             });
        req.flash('success',"New Post created successfully");                      
                             return res.redirect('back');                       
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
            req.flash('success',"Post deleted successfully"); 
            await Comment.deleteMany({post:req.params.id});
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