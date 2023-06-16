const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');

const db = require('./config/mongoose');

app.use(express.urlencoded());

app.use(cookieParser());

app.use(express.static('./assets'));

//extract style and scripts form sub pages 

app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

app.use(expressLayouts);

app.use('/',require('./routes/index'));

//set viewengine as ejs
app.set('view engine','ejs');

//set out html views
app.set('views','./views');
app.listen(port,function(err){
   if(err){
    console.log(`error running on server : ${err}`);
   }

   console.log(`successfully connected to sever on ${port}`);
});