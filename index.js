const express = require('express');

const app = express();
const port = 8000;

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