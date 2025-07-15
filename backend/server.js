const dotenv=require('dotenv');
dotenv.config();

const cors=require('cors');

const express=require('express');
const connectDB = require('./config/db');

const authRoutes=require("./routes/authRoutes");
const userRoutes=require("./routes/userRoutes");
const taskRoutes=require("./routes/taskRoutes");
const reportRoutes=require("./routes/reportRoutes");


const app=express();
app.use(express.json());

//MiddleWare to handle CORS
app.use(cors({
  origin:process.env.CLIENT_URL || "*",
  methods: ["GET","POST","PUT","DELETE"],
  allowedHeaders: ["Content-Type","Authorization"],
}))

//Connect DB
connectDB();

//Routes
app.use("/api/auth",authRoutes);
app.use("/api/users",userRoutes);
app.use("/api/tasks",taskRoutes);
app.use("/api/reports",reportRoutes);

//for deployment
app.get("/",(req,res)=>{
  res.send({
    activeStatus:true,
    error:false,
  })
})

//Start Server
const PORT=process.env.PORT || 5000;
app.listen(PORT,'0.0.0.0',()=>{
  console.log("Server listening on Port",PORT);
})