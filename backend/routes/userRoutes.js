const express=require('express');
const { getUsers, getUserById, deleteUser } = require('../controllers/userController');
const { protect, adminOnly } = require('../middlewares/authMiddleware');

const router=express.Router();

//Get User (Admin Only)
router.get("/",protect,adminOnly,getUsers); 
//Get a specific User By Id
router.get("/:id",protect,getUserById);
//Delete User (Admin Only)


module.exports =router; 
