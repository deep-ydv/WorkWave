import React, { useEffect, useRef, useState } from "react";

import { FaUserCircle } from "react-icons/fa";

import { ImAttachment, ImCancelCircle } from "react-icons/im";
import axios from 'axios'
import {jwtDecode} from 'jwt-decode';
import UsersProfilePic from "./UsersProfilePic";
import AdminLayout from "./AdminLayout";
import { useAdminContext } from "../context/AdminContext";
import axiosInstance from "../utils/axiosInstance";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import Spinner from "./Spinner";

const UpdateTaskDetails = () => {

  const [loading,setLoading]=useState(true)
  const [deleteMessage,setDeleteMessage]=useState(false);
  const [checkedUsers,setCheckedUsers]=useState([]);
  const [hidden, setHidden]=useState(true);
  const [todos,setTodos]=useState([]);
  const [todoText,setTodoText]=useState('');
  const [attach,setAttach]=useState([]);
  const [attachmentText,setAttachmentText]=useState('');
  const [adminId,setAdminId]=useState('');
  const [token,setToken]=useState('');
  const [formData,setFormData]=useState({
    title: '',
    description: '',
    priority: '',
    dueDate: '',
    assignedTo: [],
    todoChecklist: [],
    attachments: []
     
  })
  const {id}=useParams();
  const navigate=useNavigate();
  const fetchingTaskDetails=async()=>{
   
    try {
        const response=await axiosInstance.get(`/tasks/${id}`);
        // console.log(response);
        setFormData(prev=>({...prev,title:response.data.title}))
        setFormData(prev=>({...prev,description:response.data.description}))
        setFormData(prev=>({...prev,priority:response.data.priority}))
        setFormData(prev=>({...prev,dueDate:response.data.dueDate}))
        setFormData(prev=>({...prev,assignedTo:response.data.assignedTo}))
        setFormData(prev=>({...prev,todoChecklist:response.data.todoChecklist}))
        setFormData(prev=>({...prev,attachments:response.data.attachments}))
        setAttach(response.data.attachments)
        setTodos(response.data.todoChecklist)
        setCheckedUsers(response.data.assignedTo)
        setLoading(false);





    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    
    fetchingTaskDetails();
  },[])
  
  const handleDeleteTask=()=>{
    setDeleteMessage(true);
  }
  const handleDeleteCancel=()=>{
    setDeleteMessage(false);
  }
  const handleTaskDelete=async()=>{
    try{
      const response=await axiosInstance.delete(`/tasks/${id}`)
     
        toast.success("Task Deleted Successfully");
      navigate("/admin/tasks");
      // console.log("Task Delete",response);
      
    }
    catch(error){
      console.log(error);
    }
  }
  const handleChange=(e)=>{
    const {name,value}=e.target;
    // console.log(name);
    // console.log(value);
    setFormData(prev=>({...prev,[name]:value}));
  }
  

  const {usersData}=useAdminContext();
  // console.log(usersData);

  const handleTodoEnter=(e)=>{
    if(e.key==='Enter'){
    e.preventDefault();
    handleAddTodo();
    }
  }
  
  const handleAttachmentEnter=(e)=>{
    if(e.key==='Enter'){
    e.preventDefault();
    handleAttachment();
    }
  }
  const handleCheck=(e,user)=>{    
    // console.log(e.target.checked);
    if(e.target.checked)
    setCheckedUsers(prev=>[...prev,user]);
    else {
      // console.log(checkedUsers);
      // console.log(user._id);
      const newArr=checkedUsers.filter(curr=>curr._id != user._id);
      setCheckedUsers(newArr);

      // console.log(newArr);
    }

  }
  const handleCancel=()=>{
    setHidden(prev=>!prev);

  }
 

  const handleAddTodo=()=>{
    if (todoText.trim() !== '') {
      setTodos(prevItems => [...prevItems, {todo:todoText,completed:false}]);
      // let newArrForChecklist=todos;
      // newArrForChecklist.push(todoText);
      // console.log(newArrForChecklist);
      setTodoText('');
      // setFormData(prev=>({...prev,todoChecklist:temp}));
      // console.log(todos)
      
    }
  }
  const handleDeleteTodo=(e,idx)=>{
    // console.log(todos[i])
    let newArr=[];
    for(let i=0; i<todos.length; i++){
      // console.log(todos[i]);
      if(i!=idx) newArr.push(todos[i])
    }
    setTodos(newArr);
    // setFormData(prev=>({...prev,todoChecklist:newArr}));

  }
  const handleAttachment=()=>{
    if (attachmentText.trim() !== '') {
      setAttach(prevItems => [...prevItems, attachmentText]);
      setAttachmentText('');
      
    }
  }
  const handleDeleteAttachment=(e,idx)=>{
    // console.log(todo)
    let newArr=[];
    for(let i=0; i<attach.length; i++){
      // console.log(todos[i]);
      if(i!=idx) newArr.push(attach[i])
    }
    setAttach(newArr);
  }

  const handleCreateTask=async()=>{
    // console.log(formData.title,formData.description,formData.priority,formData.dueDate,formData.assignedTo,formData.attachments,formData.todoChecklist,adminId);
        // Basic validation
        if (!formData.title.trim()) {
          toast.error("Task title is required");
          return;
        }
        if (!formData.description.trim()) {
          toast.error("Description is required");
          return;
        }
        
        if (!formData.dueDate) {
          toast.error("Due date is required");
          return;
        }
        if (checkedUsers.length === 0) {
          toast.error("Please assign the task to at least one member");
          return;
        }
        if(todos.length===0){
          toast.error("Please assign at least one task");
          return;
        }
    try{
      const response=await axios.put(`http://localhost:8000/api/tasks/${id}`,{
        title:formData.title,
        description:formData.description,
        priority:formData.priority || "Low",
        dueDate:formData.dueDate,
        assignedTo:formData.assignedTo,
        attachments:formData.attachments,
        todoChecklist:formData.todoChecklist,
        createdBy:adminId,
      },{
        headers:{
          Authorization:`Bearer ${token}`,
          'Content-Type':'application/json'
        }
      });
      // console.log(response);
    if (response.status==200) {
      toast.success("Task Updated Successfully");
      navigate("/admin/tasks")
    }
    }
    catch(error){
      console.log(error.message);
      toast.error("Failed to create task");
    }
  }
  useEffect(() => {
    // console.log("I M CreateTask.jsx");

    const localtoken=localStorage.getItem('token');
      if(localtoken)
      { 
        setToken(localtoken);
        const decode=jwtDecode(localtoken);
        setAdminId(decode.id);
        // console.log(decode);
      }
      
    // console.log(attach);
    let checkBoxIds=[];
    checkedUsers.map((curr)=>{
        checkBoxIds.push(curr._id);
    })
    setFormData(prev=>({...prev,assignedTo:checkBoxIds}));
    setFormData(prev=>({...prev,todoChecklist:todos}));
    setFormData(prev=>({...prev,attachments:attach}));
  }, [checkedUsers,todos,attach]);

  if(loading) return <div className="flex flex-col items-center gap-2 justify-center h-screen">
  <Spinner />
  <p className="text-sm text-gray-500">Loading, please wait...</p>
</div>

  return (
    <AdminLayout>
      <div className={`absolute p-4 w-[60%] flex justify-center `}>

        {/* Delete message component */}
        <div className={`z-10 ${deleteMessage?"block":"hidden"} w-full  h-[400px]  flex justify-center items-center`}>
        <div className={` rounded-md shadow-2xl bg-red-300 gap-4 flex flex-col justify-center px-8 py-4`}>
          <p className="font-semibold ">Are you sure you want to delete this task?</p> 
          <div className="flex justify-end gap-4 ">
          <button className="px-2 bg-red-100 border-1  font-semibold rounded-md cursor-pointer" onClick={handleDeleteCancel}>Cancel</button>
          <button className="px-2 bg-red-100 border-1 text-red-600 font-semibold rounded-md cursor-pointer" onClick={handleTaskDelete}>Delete</button>
          </div>
          </div>
          </div>
          {/* Finish */}

          {/* Select Users Componwnt */}
      <div className={`w-[50%] p-4 ${hidden?"hidden":"block"} bg-gray-100 rounded-2xl shadow-2xl z-10  `}>
        <div className="flex justify-between px-2 py-1 text-lg border-b-2">
          <p>Select User</p>
          <p onClick={handleCancel} className="cursor-pointer"><ImCancelCircle/></p>
        </div>
        <div className=" h-[420px] overflow-y-scroll">
          { usersData.map((user,idx)=>{
              return <div key={idx} className="flex gap-2  justify-between border-b-1 px-2 py-2 items-center">
        <div className="flex items-center gap-4" >
        <div className="w-[35px] h-[35px]  rounded-[50%]  overflow-hidden justify-center items-center">{user.profileImageUrl?<img src={user.profileImageUrl} alt="profile" />:<FaUserCircle className="w-[35px] h-[35px]"/>} </div>
          <div className="text-sm">
            <p>{user.name}</p>
            <p>{user.email}</p>
          </div>
        </div>
        <div><input type="checkbox" checked={checkedUsers.some((u) => u._id === user._id)}  onChange={(e)=>handleCheck(e,user)}/></div>
              </div>
          })}
          </div>
         
        < div className="flex justify-end gap-4 px-2 py-2 border-t-2">
          
            {/* <p onClick={handleCancel} className="cursor-pointer px-2 py-1 rounded-2xl hover:bg-blue-300 hover:border-blue-500 hover:border-2">Cancel</p> */}
            <p className="cursor-pointer px-2 py-1 rounded-2xl hover:bg-blue-300  border-1" onClick={handleCancel}>Done</p>
          
        </div>
      </div>
      </div>
      {/* Finish */}

      {/* Actual Component */}
      <div className="bg-white  p-4 w-[70%] flex flex-col gap-4  ">
        <div className="flex justify-between">
        <h1 className="text-xl font-semibold">Update Task</h1>
        <button onClick={handleDeleteTask} className="px-2  bg-red-100 border-1 text-red-600 font-semibold rounded-md cursor-pointer">Delete Task</button>

        </div>
        <div>
          <p>Task Title</p>
          <input type="text" className="border-1 w-full px-2 py-1 rounded" placeholder="Enter Task Title" name="title" value={formData.title} onChange={handleChange}  />
        </div>
        <div>
          <p>Description</p>
          <textarea placeholder="Describe Task" className="border-1 w-full p-2 rounded"  name="description" value={formData.description} onChange={handleChange}/>
        </div>
        <div className="flex gap-2">
          <div className="w-[33%]">
            <p>Priority</p>
            <select
              id="status"
              name="priority"
              className="border rounded p-2 w-full"
              value={formData.priority} onChange={handleChange}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
          <div className="w-[33%]">
            <p>Due Date</p>
            <input type="date"   className="border-1 w-full p-2 rounded" name="dueDate" value={formData.dueDate?new Date(formData.dueDate).toISOString().split('T')[0]:""} onChange={handleChange}/>
          </div>
          <div className="w-[33%]">
            <p>Assign To</p>
            <div className="w-full rounded flex  items-center" onClick={handleCancel} >
             {checkedUsers.length>0?<UsersProfilePic checkedUsers={checkedUsers} />:<button className="bg-black  cursor-pointer px-4 py-2 rounded-md text-white">Add Members</button>} 
            </div>
            
          </div>

        </div>
        <div className="w-full">
          <h2>Todo Checklist</h2>
       
           <div className="flex w-full gap-2">
          <input type="text" placeholder="Enter Task" value={todoText} className="border-1 w-[89%] p-2 rounded" onChange={(e)=>setTodoText(e.target.value)} onKeyDown={handleTodoEnter} />
          <button className="border-1 px-4 py-2 rounded-md cursor-pointer  text-white bg-black" onClick={handleAddTodo}>+ Add</button>
          </div>
          <div className="flex flex-col gap-2 mt-2">
          {todos && todos.map((curr,idx)=>{
          return <div className="w-full border-1 px-2 py-1 rounded-md flex justify-between items-center" key={idx}><div className="flex gap-2 items-center"><p className="text-sm">{idx<9? `0${idx+1}`:idx+1}</p><p>{curr.todo}</p></div> <p className="cursor-pointer" onClick={(e)=>handleDeleteTodo(e,idx)} ><ImCancelCircle/></p></div>
        })}
        </div>
        </div>

        <div className="w-full">
          <h2>Add Attachments</h2>
       
           <div className="flex w-full gap-2">
          <input type="text" placeholder="Enter File Link" value={attachmentText} className="border-1 w-[89%] p-2 rounded" onChange={(e)=>setAttachmentText(e.target.value)} onKeyDown={handleAttachmentEnter}/>
          <button className="border-1 px-4 py-2 rounded-md cursor-pointer  text-white bg-black" onClick={handleAttachment} >+ Add</button>
        </div>
        <div className="flex flex-col gap-2 mt-2">
          {attach && attach.map((attachment,idx)=>{
          return <div className="w-full border-1 px-2 py-1 rounded-md flex justify-between items-center" key={idx}><div className="flex gap-2 items-center"><p><ImAttachment className="text-sm"/></p><p>{attachment}</p></div> <p className="cursor-pointer" onClick={(e)=>handleDeleteAttachment(e,idx)}><ImCancelCircle/></p></div>
        })}
        </div>
        </div>

        <button className="bg-blue-100 p-2 rounded text-blue-700 cursor-pointer hover:bg-blue-800 hover:text-white" onClick={handleCreateTask}>Update Task</button>

      </div>
    </AdminLayout>
  );
};

export default UpdateTaskDetails;
