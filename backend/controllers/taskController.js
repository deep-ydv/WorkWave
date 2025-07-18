const Task =require("../models/Task");

//@desc- Get All Task (Admin: all, User: assigned)
//@route- GET /api/tasks/
//@access- Private

const getTasks=async(req,res)=>{
  try{
    const {status}=req.query;
    let filter={};

    if(status){
      filter.status=status;
    }

    let tasks;

    if(req.user.role === "admin"){
      tasks= await Task.find(filter).populate(
        "assignedTo",
        "name email profileImageUrl",
      );
    } else {
      tasks= await find({...filter,assignedTo: req.user._id}).populate(
        "assignedTo",
        "name email profileImageUrl"
      );
    };

    // Add completed todoChecklist count to each task
      tasks= await Promise.all(
        tasks.map(async(task)=>{
            const completedCount=task.todoChecklist.filter((item)=>item.completed).length;
            return {...task._doc, completedTodoCount: completedCount};
        })
      );

      // Status Summary Counts 
      const allTasks = await Task.countDocuments(
        req.user.role==="admin"?{}:{assignedTo: req.user._id}
      );

      const pendingTasks= await Task.countDocuments({
        ...filter,
        status: "Pending",
        ...(req.user.role !== "admin" && {assignedTo: req.user._id}),
      });

      const inProgressTasks= await Task.countDocuments({
        ...filter,
        status: "In Progress",
        ...(req.user.role !== "admin" && {assignedTo: req.user._id}),
      });

      const completedTasks= await Task.countDocuments({
        ...filter,
        status: "Completed",
        ...(req.user.role !== "admin" && {assignedTo: req.user._id}),
      });

      res.json({
        tasks,
        statusSummary: {
          all: allTasks,
          pendingTasks,
          inProgressTasks,
          completedTasks,
        },
      });

  }
  catch(error){
    res.status(500).json({message:"Server Error",error:error.message});
  }
}

//@desc- Get Tasks By ID 
//@route- GET /api/tasks/:id
//@access- Private

const getTaskById=async(req,res)=>{
  try{
    const id=req.params.id;
    
    const task=await Task.findById(id).populate("assignedTo","name email profileImageUrl");
    
    if(!task) return res.status(404).json({message:"Task Not Found"});
    res.status(200).json(task);
  }
  catch(error){
    res.status(500).json({message:"Server Error",error:error.message});
  }
}

//@desc- Get Dashboard Data
//@route- GET /api/tasks/dashboard-data
//@access- Private

const getDashboardData=async(req,res)=>{
  try{
    //Fetch Statisitcs
    const totalTasks=await Task.countDocuments();
    const pendingTasks=await Task.countDocuments({status:"Pending"});
    const completedTasks=await Task.countDocuments({status:"Completed"});
    const overdueTasks=await Task.countDocuments({
      status:{$ne: "Completed"},
      dueDate:{$lt: new Date()},
    });

    // Ensure all possible status are included
    const taskStatuses=["Pending", "In Progress", "Completed"];
    const taskDistributionRaw= await Task.aggregate([
      {
        $group: {
          _id:"$status", // group by status and count of each status
          count: { $sum: 1}, 
        },
      },
    ]);

    const taskDistribution= taskStatuses.reduce((acc,status)=>{
      formattedKey = status.replace(/\s+/g,""); //Remove spaces for response keys
      acc[formattedKey]= taskDistributionRaw.find((item)=>item._id===status)?.count || 0;
      return acc;
    },{});

    taskDistribution["All"]=totalTasks; // Add total count to taskDistribution

    //Ensure all priority level are included
    const taskPriorities=["Low", "Medium", "High"];
    const taskPriorityLevelsRaw= await Task.aggregate([
      {
        $group: {
          _id:"$priority",
          count: { $sum: 1},
        },
      },
    ]);

    const taskPriorityLevels= taskPriorities.reduce((acc,priority)=>{
    
      acc[priority]= taskPriorityLevelsRaw.find((item)=>item._id===priority)?.count || 0;
      return acc;
    },{});

    //Fetch recent 10 tasks

    const recentTasks= await Task.find().sort({createdAt:-1}).limit(10).select("title status priority dueDate createdAt");

    res.status(200).json({
      statistics:{
        totalTasks,
        pendingTasks,
        completedTasks,
        overdueTasks,
      },
      charts:{
        taskDistribution,
        taskPriorityLevels,
      },
      recentTasks,
    });

  }
  catch(error){
    res.status(500).json({message:"Server Error",error:error.message});
  }
}

//@desc- Get User Dashboard Data
//@route- GET /api/tasks/user-dashboard-data
//@access- Private

const getUserDashboardData=async(req,res)=>{
  try{

    const userId=req.user._id;
    
    //Fetch data for individual user
    const totalTasks=await Task.countDocuments({assignedTo:userId});
    const pendingTasks=await Task.countDocuments({assignedTo:userId,status:"Pending"});
    const completedTasks=await Task.countDocuments({assignedTo:userId,status:"Completed"});
    const overdueTasks=await Task.countDocuments({
      assignedTo:userId,
      status:{$ne:"Completed"},
      dueDate:{$lt: new Date()},
    });

    const taskStatuses= ["Pending", "In Progress", "Completed"];
    const taskDistributionRaw= await Task.aggregate([
      {$match:{assignedTo:userId}},
      {
        $group: {
          _id:"$status", // group by status and count of each status
          count: { $sum: 1}, 
        },
      },
    ]);
    const taskDistribution= taskStatuses.reduce((acc,status)=>{
      formattedKey = status.replace(/\s+/g,""); //Remove spaces for response keys
      acc[formattedKey]= taskDistributionRaw.find((item)=>item._id===status)?.count || 0;
      return acc;
    },{});

    taskDistribution["All"]=totalTasks; // Add total count to taskDistribution
    const taskPriorities=["Low", "Medium", "High"];
    const taskPriorityLevelsRaw= await Task.aggregate([
      {$match:{assignedTo:userId}},
      {
        $group: {
          _id:"$priority",
          count: { $sum: 1},
        },
      },
    ]);

    const taskPriorityLevels= taskPriorities.reduce((acc,priority)=>{
    
      acc[priority]= taskPriorityLevelsRaw.find((item)=>item._id===priority)?.count || 0;
      return acc;
    },{});

    const recentTasks= await Task.find({assignedTo:userId}).sort({createdAt:-1}).limit(10).select("title status priority dueDate createdAt");

    res.status(200).json({
      statistics:{
        totalTasks,
        pendingTasks,
        completedTasks,
        overdueTasks,
      },
      charts:{
        taskDistribution,
        taskPriorityLevels,
      },
      recentTasks,
    });

  }
  catch(error){
    res.status(500).json({message:"Server Error",error:error.message});
  }
}

//@desc- Create a task
//@route- POST /api/tasks/
//@access- Private

const createTask=async(req,res)=>{
  try{
    const {
      title,
      description,
      priority,
      dueDate,
      assignedTo,
      createdBy,
      attachments,
      todoChecklist,
    }=req.body;

    if(!Array.isArray(assignedTo)){
      return res.status(400).json({message:"assignedTo must be an array of User IDs"});
    }

    const task=await Task.create({
      title,
      description,
      priority,
      dueDate,
      assignedTo,
      createdBy,
      attachments,
      todoChecklist,
    })
    res.status(201).json({message:"Task Created Successfully", task});
  }
  catch(error){
    console.error("Create Task Error:", error); // Add this
    res.status(500).json({message:"Server Error",error:error.message});
  }
}

//@desc- Update task details
//@route- PUT /api/tasks/:id
//@access- Private

const updateTask=async(req,res)=>{
  try{
    const task=await Task.findById(req.params.id);
    if(!task) return res.status(404).json({message:"Task Not Found"});

    task.title= req.body.title || task.title;
    task.description= req.body.description || task.title;
    task.priority= req.body.priority || task.priority;
    task.dueDate= req.body.dueDate || task.dueDate;
    task.todoChecklist= req.body.todoChecklist || task.todoChecklist;
    task.attachments= req.body.attachments || task.attachments;

    if(req.body.assignedTo){
      if(!Array.isArray(req.body.assignedTo)){
        return res.status(400).json({message:"assignedTo must be an array of User IDs"});
      }
      task.assignedTo= req.body.assignedTo;
    }

    const updatedTask=await task.save();
    res.json({message:"Task Updated Successfully",updatedTask});


    
  }
  catch(error){
    res.status(500).json({message:"Server Error",error:error.message});
  }
}

//@desc- Update Task Status
//@route- PUT /api/tasks/:id/status
//@access- Private

const updateTaskStatus=async(req,res)=>{
  try{
    const task=await Task.findById(req.params.id);
    if(!task) return res.status(404).json({message:"Task Not Found"});

    const isAssigned=task.assignedTo.some((userId)=>userId.toString()=== req.user._id.toString());

    if(!isAssigned && req.user.role!=="admin"){
      return res.status(403).json({message:"Not Authorized"});
    }

    task.status= req.body.status || task.status;

    if(task.status==="Completed"){
      task.todoChecklist.forEach((item)=>(item.completed=true));
      task.progress=100;
    }

    await task.save();
    res.json({message:"Task Status Updated Successfully",task});

  }
  catch(error){
    res.status(500).json({message:"Server Error",error:error.message});
  }
}

//@desc- Update Task Checklist(todo checklist)
//@route- PUT /api/tasks/:id/todo
//@access- Private

const updateTaskChecklist=async(req,res)=>{
  try{
    const { todoChecklist }=req.body;
    const task=await Task.findById(req.params.id);

    if(!task) return res.status(404).json({message:"Task Not Found"});

    if(!task.assignedTo.includes(req.user._id) && req.user.role!=="admin"){
      return res.status(403).json({message:"Not Authorized"});
    }

    task.todoChecklist= todoChecklist;

    const completedCount=task.todoChecklist.filter((item)=>item.completed).length;
    const totalItems=task.todoChecklist.length;
    
    task.progress=totalItems>0? Math.round((completedCount/totalItems)*100) : 0;

    if(task.progress==100){
      task.status="Completed";
    }
    else if(task.progress>0){
      task.status="In Progress";
    }
    else {
      task.status="Pending";
    }
    await task.save();

    const updatedTask=await Task.findById(req.params.id).populate("assignedTo","name email profileImageUrl");

    res.json({message:"Task Checklist Updated",task:updatedTask});



  }
  catch(error){
    res.status(500).json({message:"Server Error",error:error.message});
  }
}
 
//@desc- Delete a Task (Admin Only)
//@route- DELETE /api/tasks/:id
//@access- Private

const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task Not Found" });

    await Task.findByIdAndDelete(req.params.id); // ✅ Correct delete
    res.json({ message: "Task Deleted Successfully" });

  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

module.exports={
  getTasks,
  getTaskById,
  getDashboardData,
  getUserDashboardData,
  createTask,
  updateTask,
  updateTaskStatus,
  updateTaskChecklist,
  deleteTask,
};