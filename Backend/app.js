const express  = require("express");
const dotenv = require('dotenv');
const   mongoose = require("mongoose");
const userRouter = require("./routes/User");
const cors = require('cors')
const cookieParser = require("cookie-parser");
const messgeRouter = require("./routes/Messege");
const {app,server} = require('./socket/socket')
dotenv.config();

const corsOption={
    origin:'http://localhost:5173',
    credentials:true
};
app.use(cors(corsOption)); 

app.use(cookieParser())
app.use(express.json())

 app.use('/api/v1/chatty/user',userRouter)
 app.use("/api/v1/chatty/messege",messgeRouter)
mongoose.connect(process.env.MONGODB_URI).then(()=>{
    console.log("database is connected")
    server.listen(process.env.PORT||5000,()=>{
        console.log(`server is runing on the port ${process.env.PORT}`)
    })
}).catch((err)=>{
    console.log(err)
})
