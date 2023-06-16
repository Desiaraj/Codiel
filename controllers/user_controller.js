
const User = require('../models/user');

module.exports.profile = function(req,res){
    var localCookie = req.cookies;
    console.log(localCookie);
    const userId = localCookie.user_id;
    console.log(userId);
    if(userId){
        console.log("inside check");
        User.findById(userId).then((user)=>{
            if(user){
             return res.render('user',{
                 "title":"Profile",
                 "email":user.email,
                 "name":user.name
             });
            }else{
             //user not found
             return res.redirect('/users/signin');
            }
         }).catch((err)=>{
          console.log("Error getting user from database",err);
          return;
         });
    }else{
        return res.redirect('/users/signin');
    }

    
}

//create signUp action
module.exports.signUp = function(req,res){
    return res.render('user_sign_up',{
        title:"SignUp"
    })
}

//create signIn action
module.exports.signIn = function(req,res){
    if(req.cookies.user_id){
        User.findById(req.cookies.user_id).then((user)=>{
           if(user){
            return res.redirect('/users/profile');        
           }else{
            return res.render('user_sign_in',{
                title:"SignIn"
            })
           }
        }).catch((err)=>{
            console.log("error while fetch user info ",err);
            return res.render('user_sign_in',{
                title:"SignIn"
            })
        }) 
    }else{
        return res.render('user_sign_in',{
            title:"SignIn"
        })
    }
    
}

//Get the signUp data

module.exports.create = function(req,res){
    //TODO Validate input and create users in database
    //check password and confirm password is equal
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    User.findOne({email:req.body.email}).then((result)=>{
        if(!result){
            User.create(req.body).then((user)=>{
               console.log("Response",user);
               return res.redirect('/users/signin');
            }).catch((err)=>{
               console.log("error while creating the user",err);
               return;
            });
        }else{
            console.log("user already exists");
            return res.redirect('back');
        }
    }).catch((err)=>{
        console.log("Got error while find the user");
        return;
    });
}

//User signIn
module.exports.createSession = function(req,res){
    //steps to authenticate 
   
    //find a user
    User.findOne({email:req.body.email}).then((response)=>{
        
    if(response){
      //handle user found
      //handle password correct
      if(response.password != req.body.password){
        return res.redirect('back');
      } 
      //handle session
      res.cookie('user_id',response.id);
      return res.redirect('/users/profile');     
    }else{
      //handle cases if user not found
      return res.redirect('back');
    }   
    }).catch((err)=>{
    console.log("Error finding the user in database");
    return;
    });   
}


//signOut the user 
module.exports.signout = function(req,res){
    res.cookie('user_id',"");
    return res.redirect('/users/signin');
}