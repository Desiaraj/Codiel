const mongoose = require('mongoose');

//connect mongoose
//Connecting to localhost 
mongoose.connect('mongodb://0.0.0.0:27017/codiel_development');

//check connection
const db= mongoose.connection;

db.on('error',console.log.bind(console,"Error connecting to database"));

db.once('open',function(){
   console.log("Successfully connected to mongoDb ");
});



module.exports = db;