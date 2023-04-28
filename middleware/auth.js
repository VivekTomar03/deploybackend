const  jwt = require('jsonwebtoken');

const auth = (req,res,next) => {
    const token = req?.headers?.authorization
    if(token){
        try {
            const decoded =   jwt.verify(token.split(" ")[1], 'vivek')
             if(decoded){
                // console.log(decoded);
                req.body.authorID= decoded.authorID;
                req.body.author= decoded.author
                next()
             }
             else{
                res.send({
                    message:"please login"
                })
             }
        } catch (error) {
            res.send({
                err:error.message,
                msg:"unable to login"
            })
        }
     
    }
    else{
        res.send({
            message:"please login"
        })
    }
}

module.exports = {
    auth
}