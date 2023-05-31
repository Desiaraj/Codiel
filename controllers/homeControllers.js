//create a function to get invoke from index.js file 

module.exports.home = function(req,res){
    return res.end("<h1>Codiel app up </h1>");
}

module.exports.dashboard = function(req,res){
    return res.end("<h1> Dashboard page rendered</h1>");
}
