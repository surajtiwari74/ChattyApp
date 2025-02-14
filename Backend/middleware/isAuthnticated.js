const jwt  =  require("jsonwebtoken");

async function isAuthnticated(req,res,next)
{
    try {
        const token = req.cookies.token;
    if(!token){
        return res.status(401).json({message:"User not authenticated."})
    };
    const decode = await jwt.verify(token,process.env.JWT_KEY);
    if(!decode){
        return res.status(401).json({message:"Invalid token"});
    };
    req.id = decode._id;
    next();

    } catch (error) {
      console.log(error)
    }
}

module.exports = isAuthnticated;