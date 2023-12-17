const jwt = require('jsonwebtoken');

exports.login=(req, res)=>{
   const {username, password} = req.body;
   if(password === process.env.PASSWORD_ADMIN){
        const jwtToken = jwt.sign({username}, process.env.JWT_SECRET, {expiresIn: '1d'});
        return res.json({jwtToken, username});
   }
    else{
         return res.status(400).json({error:"Invalid password"});
    }
}