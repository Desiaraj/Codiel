module.exports.create = function(req,res){
    return res.end("Create post method called");
}

module.exports.delete = function(req,res){
    return res.end("Delete the post ");
}

module.exports.update = function(req,res){
    return res.end("Update method called");
}