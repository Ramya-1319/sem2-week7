import jwt from 'jsonwebtoken';
const generateTokenSetCookie=(userId,res)=>{
    const token=jwt.sign({userId},process.env.JWT_SECRET,{
        expiresIn:'1h'
    });
    res.cookie("jwt",token,{
        maxAge:1*60*60*1000,//1hr in milliseconds
        httpOnly:true,//Makes the cookie accessible only through HTTP(S),not javascript
        sameSite:"strict",//ensures the cookie is sent only with requests from the same site
        secure:process.env.NODE_ENV !=="development",//sends the cookie only over HTTPS in production
        domain:new URL(process.env.FRONTEND_URL).hostname//set your domain here
        });
};
export default generateTokenSetCookie;