import React, { useEffect } from 'react'


const UsersProfilePic = ({checkedUsers}) => {
  // console.log(checkedUsers);
  // console.log(profileIds);
  let userPics=checkedUsers;
  if(userPics.length>2) userPics = userPics.slice(0,3);

  userPics.map((pics)=>{
    // console.log(pics.profileImageUrl);
  })
  
  if(userPics.length==0) return <div>Kindly assign this task to someone.</div>

  return (
    <div className='w-[90%] items-center  flex h-10 overflow-hidden relative'>

     {  userPics.map((pic,idx)=>{
        return <img style={{marginLeft:`${25*idx}px`}} src={pic.profileImageUrl?pic.profileImageUrl:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTr3jhpAFYpzxx39DRuXIYxNPXc0zI5F6IiMQ&s"} key={idx} alt="" className={`w-[36px] h-[36px] rounded-[50%] absolute border-2  border-white bg-white`}/>
      })}
      {checkedUsers.length>3 && 
        <div className='w-[36px] h-[36px] rounded-[50%] bg-gray-300 border-2 border-white absolute ml-18     text-md flex justify-center items-center '>+{checkedUsers.length-3}</div>
      }

    </div>
  )
}

export default UsersProfilePic