//create a function to get invoke from index.js file 

module.exports.home = function(req,res){
  console.log(req.cookies);
  res.cookie('user_id',25);
   return res.render('home',{
     'title':"Codiel Home"
   });
}

module.exports.dashboard = function(req,res){
    return res.end("<h1> Dashboard page rendered</h1>");
}
