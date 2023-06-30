const Post = require('../models/post');
const User = require('../models/user');

//create a function to get invoke from index.js file 

module.exports.home = async function(req,res){
  // console.log(req.cookies);
  // res.cookie('user_id',25);
   
    try{
      let posts = await Post.find({})
   .populate('user')
   .populate({
     path:'comments',
     populate:{
       path:'user'
     }
   });

   let users = await User.find({});
      return res.render('home',{
        'title':"Codiel Home",
        'posts':posts,
        'all_users':users
       });

    }catch(err){
      console.log("Error ",err);
      return;
    }
}

module.exports.dashboard = function(req,res){
    return res.end("<h1> Dashboard page rendered</h1>");
}
