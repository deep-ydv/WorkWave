const dotenv=require('dotenv');
dotenv.config();

const cors=require('cors');

const express=require('express');
const connectDB = require('./config/db');

const authRoutes=require("./routes/authRoutes");

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
app.use("/api/auth",authRoutes)

//Start Server
const PORT=process.env.PORT || 5000;
app.listen(PORT,()=>{
  console.log("Server listening on Port",PORT);
})