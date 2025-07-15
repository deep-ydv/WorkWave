import React from 'react'

import { FaUser } from "react-icons/fa6";

const ProfilePicWithId = ({ProfileIds}) => {
  // console.log(ProfileIds[0].profileImageUrl);
  return (
    <img className='rounded-[50%] w-[30px]' src={ProfileIds[0].profileImageUrl?ProfileIds[0].profileImageUrl:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTr3jhpAFYpzxx39DRuXIYxNPXc0zI5F6IiMQ&s"} alt="" />
  )
}

export default ProfilePicWithId