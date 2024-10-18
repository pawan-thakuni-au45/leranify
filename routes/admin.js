const {Router}=require('express')
const jwt=require('jsonwebtoken')
const {JWT_ADMIN_PASSWORD}=require('../config.js')

const {userModel,courseModel,PurchaseModel, adminModel} =require('../db')
const { adminMiddlewear } = require('../middlewear/admin')

const adminRouter=Router()

adminRouter.post('/signup',async function(req,res){
    const {email,password,firstName,lastName}=req.body

    await adminModel.create({
        email,password,firstName,lastName
    })
    res.json({
        message:"admin created succefully"
    })
})

adminRouter.post('/signin',async function (req,res){
    const{email,password}=req.body

    const admin=await adminModel.findOne({
        email,password
    })
    if(admin){
        token = jwt.sign({id:admin._id},JWT_ADMIN_PASSWORD)
        res.json({
            token
        })
    }
})

adminRouter.post('/course',adminMiddlewear,async function (req,res){
    const adminId=req.userId
    

    const{title,description,price,imageUrl,creatorId}=req.body

    const course=await courseModel.create({
        title,description,price,imageUrl,
        creatorId:adminId
    })
    res.json({
        message:"course created",
        courseId:course._id
    })
})

adminRouter.put("/course", adminMiddlewear, async function(req, res) {
    const adminId = req.userId;

    const { title, description, imageUrl, price, courseId } = req.body;

    // creating a web3 saas in 6 hours
    const course = await courseModel.updateOne({
        id: courseId, 
        creatorId: adminId 
    }, {
        title: title, 
        description: description, 
        imageUrl: imageUrl, 
        price: price
    })

    res.json({
        message: "Course updated",
        courseId: course._id
    })
})

adminRouter.get('/course/bulk',adminMiddlewear,async function(req,res){
    const adminId=req.userId
    const courses=await courseModel.find({
        creatorId:adminId
    })
res.json({
    courses
})
})

module.exports={
    adminRouter
}