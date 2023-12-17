const jwt = require('jsonwebtoken');
const { expressjwt: expressJwt } = require('express-jwt');

exports.login=(req, res)=>{
     // username , password
   const {username, password} = req.body;
   // check if user exist
   if(password === process.env.PASSWORD_ADMIN){
        const jwtToken = jwt.sign({username}, process.env.JWT_SECRET, {expiresIn: '1d'});
        return res.json({jwtToken, username});
   }
    else{
         return res.status(400).json({error:"Invalid password"});
    }
}

// check token
exports.requireLogin = expressJwt({
     secret : process.env.JWT_SECRET,
     algorithms: ['HS256'],
     userProperty: 'auth'

})