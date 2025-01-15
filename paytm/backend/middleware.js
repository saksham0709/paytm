const JWT_SECRET=require("./config");
const jwt =require("jsonwebtoken");
const authmiddleware=(req,res,next)=>{
    const authHeaders=req.headers.authorization

    if(!authHeaders||!authHeaders.startsWith("Bearer ")){
        return res.status(403).json({msg:"authorization starting error"})
    }
    const token = authHeaders.split(' ')[1];
try {
    const decoded=jwt.verify(token,JWT_SECRET);
    console.log(decoded.userid);
    
    req.userid=decoded.userid;
    next();
} catch (error) {
    console.log("error");
    
    return res.status(403).json({msg:"authorization ending error"})
}

}
module.exports={authmiddleware};