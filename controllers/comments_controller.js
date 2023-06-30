const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = async function(req,res){

    try{
        let post = await Post.findById(req.body.post);

        let comment = await Comment.create({
                            content:req.body.content,
                            post:req.body.post,
                            user:req.user._id   
                        });
                        post.comments.push(comment);
                        post.save();
                        res.redirect('back');
        
    }catch(err){
        console.log("error ",err);
        return;
    }
}

module.exports.delete = async function(req,res){
       
    try{
        let comment = await Comment.findById(req.params.id);

        if(req.user.id == comment.user){
            let postId = comment.post;
    
            await comment.deleteOne();
    
            let response = await Post.findByIdAndUpdate(postId,{$pull:{comments:req.params.id}});
            return res.redirect('back'); 
        }else{
            let post = await Post.findById(comment.post);
            if(req.user.id == post.user){
                await comment.deleteOne();
    
                let response = await Post.findByIdAndUpdate(post.id,{$pull:{comments:req.params.id}});
    
                return res.redirect('back');
            }else{
                return res.redirect('back');
            }
        }
    }catch(err){
        console.log("error ",err);
        return res.redirect('back');
    }
}