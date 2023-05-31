const express = require('express');

const app = express();
const port = 8000;

app.use('/',require('./routes/index'));

app.listen(port,function(err){
   if(err){
    console.log(`error running on server : ${err}`);
   }

   console.log(`successfully connected to sever on ${port}`);
});