const jwt = require('jsonwebtoken')

const SECRET = process.env.TOKEN_SECRET

module.exports = function (req,res,next){
    const token = req.cookies.token
    
    if(!token){
        res.status(401)
        res.render('error', {message: `Acess denied.Login to access!`})
    }else{
        try {
            const userVerified = jwt.verify(token,SECRET)
            req.user = userVerified
            next()
        } catch (error) {
            res.status(401)
            res.render('error', {message: `Acess denied.Login to access!`})
        }
    }
}
