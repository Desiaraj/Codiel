const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');

const expressSession = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport_local_strategy');

const sassMiddleware = require('node-sass-middleware');

const MongoStore = require('connect-mongo');
const db = require('./config/mongoose');
const flash = require('connect-flash');
const customMiddleware = require('./config/middleware');

app.use(sassMiddleware({
  src: './assets/scss',
  dest: './assets/css',
  debug:true,
  outputStyle:'expanded',
  prefix:'/css'
}))


app.use(express.urlencoded());

app.use(cookieParser());

app.use(express.static('./assets'));

//extract style and scripts form sub pages 

app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

app.use(expressLayouts);

//set viewengine as ejs
app.set('view engine','ejs');

//set out html views
app.set('views','./views');

//mongostore used in store //session
app.use(expressSession({
  name:"Codiel", 
  secret:"SectrctKey",
  saveUninitialized:false,
  resave:false,
  cookie:{
   maxAge: (1000 * 60 *100)
  },
  store:new MongoStore({
    mongooseConnection:db,
    autoRemove:'disabled',
    mongoUrl:'mongodb://0.0.0.0:27017/codiel_development'
  },
  function(err){
   console.log(err);
  })
}));

// //init passport
app.use(passport.initialize());
app.use(passport.session());

//add flash middleware
app.use(flash());
app.use(customMiddleware.settingFlash);

app.use(passport.setAuthenticatedUser);
app.use('/',require('./routes/index'));

app.listen(port,function(err){
   if(err){
    console.log(`error running on server : ${err}`);
   }

   console.log(`successfully connected to sever on ${port}`);
});