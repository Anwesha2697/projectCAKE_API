const jwt=require('jsonwebtoken');
function authenticate(req, res, next){
    const token=req.header('Authorization')?.split(' ')[1];
    if(!token){
        return res.status(401).json({message:'Access denied, no token provided'})
    }
    try{
        const decode=jwt.verify(token, process.env.SECRET_KEY)
        req.user=decode;
        next();
    }catch(err){
        return res.status(400).json({'message':'Invalid token'})
    }
}
module.exports=authenticate;