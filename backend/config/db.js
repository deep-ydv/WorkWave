const mongoose=require('mongoose');

const connectDB=async()=>{
  try {
    await mongoose.connect(process.env.MONGODB_URI,{});
    console.log("MongoDB Connected")
  } catch (error) {
    console.log("Error connecting to MongoDB",error);
    process.exit(1);
  }
};

module.exports= connectDB;