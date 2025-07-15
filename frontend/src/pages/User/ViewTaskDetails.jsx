import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DateFixing from "../../components/DateFixing";
import UserLayout from "../../components/UserLayout";
import UsersProfilePic from "../../components/UsersProfilePic";
import axiosInstance from "../../utils/axiosInstance";
import { FiExternalLink } from "react-icons/fi";
import toast from "react-hot-toast";
import Spinner from "../../components/Spinner";

const ViewTaskDetails = () => {
  const [task, setTask] = useState([]);
  const [flag,setFlag]=useState(false);
  const taskId = useParams();

  const fetchTaskDetails = async () => {
    try {
      const response = await axiosInstance.get(`/tasks/${taskId.id}`);
      // console.log(response.data);
      setTask(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getProgressColor = (p) => {
    if (p == "Pending") return "text-purple-700 bg-purple-200";
    else if (p == "In Progress") return "text-cyan-600 bg-cyan-100";
    else if (p == "Completed") return "text-green-600 bg-green-100";
  };

  const handleCheckbox=async(e,curr)=>{
    
    
    task.todoChecklist.map((t)=>{
      if(t._id==curr._id) t.completed=e.target.checked;
    })
    const response=await axiosInstance.put(`/tasks/${task._id}/todo`,{
      todoChecklist:task.todoChecklist
    })
    setFlag(prev=>!prev);
  //  console.log("Updated",response);
  }
  
  const isValidUrl = (url) => {
    try {
      new URL(url);
      window.open(url,'_blank');
    } catch (_) {
      toast.error("Invalid Url");
    }
  };

  useEffect(() => {
    // console.log("I M ViewMyTask.jsx");

    fetchTaskDetails();
  }, [flag]);

  return (
    <UserLayout>
      <>
        {" "}
        {Object.entries(task).length <= 0 ? (
          <div className="flex flex-col items-center gap-2 justify-center h-screen">
          <Spinner />
          <p className="text-sm text-gray-500">Loading, please wait...</p>
        </div>
        ) : (
          <div className="flex flex-col p-8 gap-4 w-[80%] bg-white shadow-xl rounded-md">
            <div className="flex justify-between ">
              <p className="font-bold text-xl capitalize">{task.title}</p>
              <p
                className={`${getProgressColor(task.status)} px-4 rounded-md `}
              >
                {task.status}
              </p>
            </div>
            <div>
              <p className="text-lg text-gray-600">Description</p>
              <p className="font-semibold">{task.description}</p>
            </div>
            <div className="flex justify-between w-[80%]">
              <div>
                <p className="text-gray-600">Priority</p>
                <p className="font-semibold">{task.priority}</p>
              </div>
              <div>
                <p className="text-gray-600">Due Date</p>
                <div>
                  <DateFixing date={task.dueDate} />
                </div>
              </div>
              <div className="">
                <p className="text-gray-600">Assigned To</p>
                <div>
                  <UsersProfilePic checkedUsers={task.assignedTo} />
                </div>
              </div>
            </div>
            <div>
              <p className="text-gray-600 font-semibold text-lg">
                Todo Checklist
              </p>
              <div className="px-4 flex flex-col gap-4 py-2">
                {task.todoChecklist.map((curr) => {
                  return (
                    <div className="flex gap-4" key={curr._id}>
                      <input className="w-[18px]" type="checkbox" checked={curr.completed===true} onChange={(e)=>handleCheckbox(e,curr)} />
                      <p>{curr.todo}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div>
              <p className="text-gray-600 font-semibold text-lg">Attachments</p>
              <div className="flex flex-col gap-4 py-2">
                {task.attachments.map((curr, idx) => {
                  return (
                    <div
                      className="flex justify-between bg-gray-100 px-4 py-1"
                      key={idx}
                    >
                      <div className="flex gap-4">
                        <p>{idx < 9 ? "0" + (idx + 1) : idx + 1}</p>
                        <p>{curr}</p>
                      </div>
                      <div className="cursor-pointer">
                        
                          <FiExternalLink onClick={()=>isValidUrl(curr)} />
                        
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </>
    </UserLayout>
  );
};

export default ViewTaskDetails;
