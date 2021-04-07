const Log = require('../models/logs') 

exports.PostLogs = (req,res,next)=>{
    const post = new Log({
        task:req.body.task,
    })
    console.log("done");
    post.save()
}