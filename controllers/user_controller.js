const userSchema = require('../models/user');

module.exports.profile = function(req,res){
     
    userSchema.findById(req.params.id).then((user)=>{
        return res.render('user',{
            "title":"User Profile",
            'profile_user':user
        })
    }).catch((err)=>{
        console.log("Error while find user",err);
        return res.render('user',{
            "title":"User Profile"
        })
    });

    
}

module.exports.update = function(req,res){
    if(req.user.id == req.params.id){
        userSchema.findByIdAndUpdate(req.params.id,req.body).then((response)=>{
            return res.redirect('back');     
        }).catch((err)=>{
            console.log("Error while update the user");
            return res.redirect('back');    
        });
    }else{
        return res.status(401).send("UnAuthorized");
    }
}

//create signUp action
module.exports.signUp = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_up',{
        title:"SignUp"
    })
}

//create signIn action
module.exports.signIn = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_in',{
        title:"SignIn"
    })
}

//Get the signUp data

module.exports.create = function(req,res){
    //TODO Validate input and create users in database
    //check password and confirm password is equal
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    userSchema.findOne({email:req.body.email}).then((result)=>{
        if(!result){
            userSchema.create(req.body).then((user)=>{
               console.log("Response",user);
               req.flash('success',"Welcome to the Codiel");
               return res.redirect('/users/signin');
            }).catch((err)=>{
               req.flash('error',"can't able to create new user"); 
               console.log("error while creating the user",err);
               return;
            });
        }else{
            console.log("user already exists");
            req.flash('error',"User already exists");
            return res.redirect('back');
        }
    }).catch((err)=>{
        req.flash('error',"Please try again later");
        console.log("Got error while find the user");
        return;
    });
}

//User signIn
module.exports.createSession = function(req,res){
    console.log("Redirect to success");
    req.flash('success',"User LoggedIn successfully");
    return res.redirect('/');
}

module.exports.clearSession = function(req,res){
    req.logout(function(err) {
        if (err) { return next(err); }
        req.flash('success',"You will logged out successfully");
        res.redirect('/');
      });
}