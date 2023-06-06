module.exports.profile = function(req,res){
    console.log("<h1> Profile page called</h1>");
    return res.render('user',{
        "title":"User Profile"
    })
}