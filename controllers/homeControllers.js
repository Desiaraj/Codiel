const Post = require('../models/post');
const User = require('../models/user');

//create a function to get invoke from index.js file 

module.exports.home = async function(req,res){
  // console.log(req.cookies);
  // res.cookie('user_id',25);

   const posts = await Post.find({})
   .populate('user')
   .populate({
     path:'comments',
     populate:{
       path:'user'
     }
   })
   .exec();

   User.find({}).then((users)=>{
    return res.render('home',{
      'title':"Codiel Home",
      'posts':posts,
      'all_users':users
   });

   }).catch((err)=>{
    console.log("Error while get users list ",err);
    return res.render('home',{
      'title':"Codiel Home",
      'posts':posts,
      'all_users':[]
   });
   });


     //  function(err,posts){
  //   if(err){
  //     return res.render('home',{
  //       'title':"Codiel Home",
  //       'posts':[]
  //     }); 
  //   }
  //   return res.render('home',{
  //     'title':"Codiel Home",
  //     'posts':posts
  //   });      
  // }

  //  .then((posts)=>{
    
  //  }).catch((err)=>{
  //   return res.render('home',{
  //     'title':"Codiel Home"
  //   });
  //  })
  
}

module.exports.dashboard = function(req,res){
    return res.end("<h1> Dashboard page rendered</h1>");
}
