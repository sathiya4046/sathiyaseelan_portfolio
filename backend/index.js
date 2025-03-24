import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser';
import dotenv from 'dotenv'
import mongoose from "mongoose";
import path from 'path'


dotenv.config()
const app = express()
const port = 5000
const dirname = path.resolve()

app.use(express.json({
    limit: "5mb" //default 100kb
  }))

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,
    methods:["POST","GET"]
  }))
app.use(bodyParser.urlencoded({extended:true}))

const connectDB = async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL)
        .then(()=>console.log('Connected'))
    }catch(error){
        console.log(`Error in db ${error}`)
        process.exit(1)
    }
}

const MessageSchema = new mongoose.Schema({
    name: { 
        type: String, 
    },
    email: { 
        type: String, 
    },
    message: { 
        type: String, 
    }
});

const Message = mongoose.model("Message",MessageSchema)

app.post('/message',async (req,res)=>{
    const {name,email,message} = req.body
        await Message.create({
            name,
            email,
            message
        })
        .then(message=>res.json({status:"success"}))
        .catch(err=>console.log(err)) 
})

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(dirname,"/frontend/dist")))
    app.use("*",(req,res)=>{
        res.sendFile(path.resolve(dirname,"frontend","dist","index.html"))
    })
}

app.listen(port,()=>{
    console.log(`running on ${port}`)
    connectDB()
})