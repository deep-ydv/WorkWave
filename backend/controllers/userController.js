const Task=require("../models/Task");
const User=require("../models/User");

//@desc Get All User(Admin Only)
//@route GET /api/users/
//access Private (Admin)

const getUsers=async(req,res)=>{
  try{
    const users=await User.find({role:"member"}).select("-password");

    const usersWithTaskCounts=await Promise.all(users.map(async(user)=>{
          const pendingTasks=await Task.countDocuments({assignedTo: user._id, status:"Pending"});
          const inProgressTasks=await Task.countDocuments({assignedTo: user._id, status:"In Progress"});
          const completedTasks=await Task.countDocuments({assignedTo: user._id, status:"Completed"});
    

    return{
      //...user._doc->Include all existing data , we use user._doc instead of user because The returned object is a Mongoose document, which is not a plain JavaScript object. It has additional metadata and methods (like .save(), .populate(), etc.). The actual data (i.e., what’s stored in the DB) lives inside the _doc property.
      ...user._doc, 
      pendingTasks,
      inProgressTasks,
      completedTasks,
    };
  }));
  res.json(usersWithTaskCounts);
  }
  catch(error){
    res.status(500).json({message:"Server Error",error:error.message});
  }
}

//@desc Get specific User(By user id)
//@route GET /api/users/:id
//access Private

const getUserById=async(req,res)=>{
  try{
      const id=req.params.id;
      const user= await User.findById(id).select("-password");
      res.json(user);
  }
  catch(error){
    res.status(500).json({message:"Server Error",error:error.message});
  }
}

//@desc Delete a specific user by ID (Admin Only)
//@route DELETE /api/users/:id
//@access Private (Admin)

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    // Check if user exists
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Optional: Remove user from tasks
    await Task.updateMany(
      { assignedTo: userId },
      { $pull: { assignedTo: userId } }
    );

    // Delete the user
    await User.findByIdAndDelete(userId);

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};



module.exports={getUsers,getUserById,deleteUser};