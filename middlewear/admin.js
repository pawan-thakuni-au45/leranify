
const jwt=require('jsonwebtoken')

const {JWT_ADMIN_PASSWORD}=require('../config')

 async function adminMiddlewear(req,res,next){

    const token=req.headers.token
    const decode=jwt.verify(token,JWT_ADMIN_PASSWORD)

    if(decode){
        req.userId=decode.id
        next()
    }
    
 }

 module.exports={
    adminMiddlewear
 }