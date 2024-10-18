require('dotenv').config()

const express =require('express')
const mongoose=require('mongoose')
const { userRouter } = require('./routes/user')
const {adminRouter} =require('./routes/admin')

const app=express()
app.use(express.json())

app.use('/api/v1/user',userRouter)
app.use('/api/v1/admin',adminRouter)


app.get('/',(req,res)=>{

    res.json('good to see you again')
})

async function main(){
   await mongoose.connect(process.env.MONGO_URL)
    app.listen(8000)
    console.log('listing on port 8000')
}
main()
