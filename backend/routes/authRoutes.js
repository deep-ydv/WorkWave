const express=require('express');
const { registerUser, loginUser, getUserProfile, updateUserProfile } = require('../controllers/authController');
const { protect } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware');

const router=express.Router();

router.post("/register",registerUser); // register user
router.post("/login",loginUser); //login user
router.get("/profile", protect, getUserProfile);
router.put("/profile", protect, updateUserProfile);

//image upload
router.post("/upload-image",upload.single('image'),(req,res)=>{  // the parameter send in upload.single('x') ,x->key in postman
  if(!req.file){
    return res.status(400).json({message:"No file uploaded"});
  }

  const imageUrl= `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;

  res.status(200).json({imageUrl});
})

module.exports=router;
