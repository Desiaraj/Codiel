const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

passport.use(new LocalStrategy({
        usernameField:'email'
    },
    function(email,password,done){
        console.log("Find a user");
        //find a user and establish the identity 
        User.findOne({email:email}).then((response)=>{
            if(!response || response.password != password){
                console.log("user not found");
                return done(null,false);
            }else{
                console.log("Return response");
                return done(null,response);
            }
        }).catch((err)=>{
          console.log("Error ",err);
          return done(err);
        });
    }


));


//serializing the user to decide which key is to be kept in cookies
passport.serializeUser(function(user,done){
  done(null,user.id);
});

//deserializing the user from the key in the cookie

passport.deserializeUser(function(id,done){
   User.findById(id).then((user)=>{
      if(user){
       done(null,user);
      }else{
        done(null,false);
      }
   }).catch((err)=>{
     console.log("error while finding the user");
     done(err);
   });
});

//check if the user is authenticated
passport.checkAuthentication = function(req,res,next){
  if(req.isAuthenticated()){
    return next();
  }

  //if user not signed in
  return res.redirect('/users/signin');
}

passport.checkUserSignIn = function(req,res,next){
   if(!req.isAuthenticated()){
     return next();
   }
  
   return res.redirect('/');

}

passport.setAuthenticatedUser = function(req,res,next){
  if(req.isAuthenticated()){
    // req user contains the current signed in user from the session cookie and we are sending this to the locals for views
    res.locals.user = req.user;
  }
  next();
}