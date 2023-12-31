const JWT = require('jsonwebtoken');

// create a middleware for authorizatin(show onlt that thing which is added to that token)
module.exports = async (req,res,next) => {
    // get the token
    try {
        const token = req.headers['authorization'].split(" ")[1]
    JWT.verify(token, process.env.JWT_SECRET,(err, decode) => {
        if(err){
            return res.status(200).send({
                message: 'Auth Failed',
                success:false
            })
        }else{
            req.body.userId = decode.id
            next()
        }
    })

    } catch (error) {
        console.log(error)
        res.status(401).send({
            message:'Auth Failed',
            success:false
        })
    }
}