const {protect,adminOnly} =require("../middlewares/authMiddleware");

const express=require('express');
const { getTasks, getTaskById, getDashboardData, getUserDashboardData, createTask, updateTask, deleteTask, updateTaskStatus, updateTaskChecklist } = require("../controllers/taskController");

const router=express.Router();

//Task Management Routes
router.get("/",protect,getTasks); // Get All Tasks (for Admin-All Tasks, User-Assigned Tasks)


router.get("/dashboard-data",protect,getDashboardData);

router.get("/user-dashboard-data",protect,getUserDashboardData);

router.get("/:id",protect,getTaskById) // Get Task By Id


router.post("/",protect,adminOnly,createTask); // create a task (Admin Only)

router.put("/:id",protect,updateTask); //Update Task Details

router.delete("/:id",protect,adminOnly,deleteTask) //Delete a task (Admin Only)

router.put("/:id/status",protect,updateTaskStatus) //Update Task Status

router.put("/:id/todo",protect,updateTaskChecklist);  //Update Task checklist

module.exports=router;