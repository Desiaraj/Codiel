const userSchema = require('../models/user');

module.exports.profile = function(req,res){
    console.log("<h1> Profile page called</h1>");
    return res.render('user',{
        "title":"User Profile"
    })
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
    console.log("Redirect to success");
    return res.redirect('/');
}

module.exports.clearSession = function(req,res){
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
      });
}