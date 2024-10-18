
const {Router}=require('express')
const {userModel,courseModel,purchaseModel}=require("../db.js")

const userRouter=Router()
const jwt=require('jsonwebtoken')
const {JWT_USER_PASSWORD} =require('../config.js')
userRouter.post('/signup',async function(req,res){
    const {email,password,firstName,lastName}=req.body
    await userModel.create({
        email,
        password,
        firstName,
        lastName
    })
    res.json({
        message:"signup successfully"
    })

})

userRouter.post('/signin',async function(req,res) {
      const {email,password}=req.body

      const user=await userModel.findOne({
        email,password
      })
        if(user){
           const token=jwt.sign({id:user._id},JWT_USER_PASSWORD)
        

        
      
      res.json({
        token
      })
    }
    })


module.exports={
    userRouter
}
