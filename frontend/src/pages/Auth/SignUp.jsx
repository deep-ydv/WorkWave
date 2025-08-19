import React, { useRef, useState, useEffect } from 'react';
import AuthLayout from '../../components/AuthLayout';
import Input from '../../components/Input';
import { MdOutlineFileUpload } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';
import { uploadImageToCloudinary } from '../../utils/uploadImage';
import { jwtDecode } from 'jwt-decode';
import axiosInstance from '../../utils/axiosInstance';
import toast from 'react-hot-toast';
import { useAdminContext } from '../../context/AdminContext';
import HowToUse from '../../components/HowToUse'
import { IoIosCloseCircleOutline } from "react-icons/io"
import Loading from '../../components/Loading';

const SignUp = () => {
  const [formData, setFormData] = useState({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adminInviteToken, setAdminInviteToken] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [fileData, setFileData] = useState(null);
  const [errors, setErrors] = useState({});
  const [howToUse,setHowToUse]=useState(false);
  const [signupLoading,setSignupLoading]=useState(false);

  const handleHowToUse=()=>{
    setHowToUse(prev=>!prev)
      }

  const { fetchData } = useAdminContext();
  const navigate = useNavigate();
  const fileInputRef = useRef();

  useEffect(() => {
    // console.log("I M SignUp.jsx");

    const token = localStorage.getItem('token');
    if (token) {
      const decode = jwtDecode(token);
      if (decode.role === "admin") navigate('/admin/dashboard');
      else if (decode.role === "member") navigate('/user/dashboard');
    }
  }, []);

  const validate = () => {
    const newErrors = {};

    if(!imageUrl) newErrors.imageUrl='Profile picture is required';

    if (!name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!password.trim()) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (Object.keys(newErrors).length > 0) {
      toast.error(Object.values(newErrors)[0]);
      setErrors(newErrors);
      return false;
    }
    

    setErrors({});
    return true;
  };

  const handleClick = (e) => {
    e.preventDefault();
    fileInputRef.current.click();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    setFileData(file);

    const image = URL.createObjectURL(file);
    setImageUrl(image);
    URL.revokeObjectURL(file);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;
    setSignupLoading(true);
    try {
      let url = "";
      if (fileData) {
        url = await uploadImageToCloudinary(fileData);
      }

      const newData = {
        name: name.trim(),
        email,
        password,
        adminInviteToken,
        profileImageUrl: url || "",
      };

      setFormData(newData);
      // console.log("Submitting:", newData);

      const response = await axiosInstance.post('/auth/register', newData);
      toast.success("Register Successfully!");

      localStorage.setItem('token', response.data.token);
      // await fetchData();

      if (response.data.role === "admin") navigate("/admin/dashboard");
      else if (response.data.role === "member") navigate("/user/dashboard");
    } catch (error) {
    setSignupLoading(false);

      console.error("Signup Error", error?.response?.data?.message || error.message);
      toast.error(error?.response?.data?.message || "Signup failed");
    }
  };
  if(signupLoading){
    return <Loading/>
  }
  return (
    <AuthLayout>
      <div className='relative flex flex-col w-full justify-center h-full p-8  border-amber-900 md:justify-end border-'>
      {
        <div className={`${howToUse?"block":"hidden"} absolute z-15 flex justify-center`}> <p className="absolute flex  w-[80%] justify-end px-2 py-1"><IoIosCloseCircleOutline className="text-purple-700 text-2xl hover:text-red-600 font-semibold cursor-pointer" onClick={handleHowToUse} /></p> <HowToUse/></div>}
        <div className='leading-tight text-center md:text-left'>
          <h2 className='font-bold text-[18px] sm:text-[22px] text-white'>Create an Account</h2>
          <p className='text-gray-400 text-[10px] sm:text-[14px] '>Join us today by entering your details below.</p>
        </div>

        <div>
          <form className='flex flex-col gap-2 items-center md:items-start'>
            {/* Avatar Upload */}
            <div className='flex justify-center border-0 w-full max-w-[700px]'>
              <div className='relative my-6 w-[70px] h-[70px] rounded-[50%]'>
                <img
                  src={imageUrl || "https://static.vecteezy.com/system/resources/previews/007/167/661/non_2x/user-blue-icon-isolated-on-white-background-free-vector.jpg"}
                  className='w-full h-full rounded-[50%]'
                  alt="profile"
                />
                <button form=''
                  className='rounded-[50%] absolute top-11 left-11 bg-blue-500 p-2'
                  onClick={handleClick}
                >
                  <MdOutlineFileUpload className="text-white" />
                </button>
                <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" form='' />
              </div>
            </div>

            {/* Input Fields */}
            <div className='flex flex-wrap gap-x-8 gap-y-3 justify-center min-w-[300px] w-[100%] max-w-[700px] md:justify-between border-0 '>
              <Input type="text" placeholder='Deep' Label="Full Name" setField={setName} auth="signup" />
              <Input type="email" placeholder='deep@example.com' Label="Email Address" setField={setEmail} auth="signup" />
              <Input type="password" placeholder='Min 8 Characters' Label="Password" setField={setPassword} auth="signup" />
              <Input type="text" placeholder='6 Digit Code' Label="Admin Invite Token" setField={setAdminInviteToken} auth="signup" />
            </div>

            {/* Submit Button */}
            <button
              type='submit'
              className='bg-blue-600 text-white py-1 px-4 text-lg rounded-sm mt-4 md:w-full max-w-[700px]'
              onClick={handleFormSubmit}
            >
              SIGN UP
            </button>

            {/* Redirect to Login */}
            <p className='text-white'>
              Already have an account? <Link to="/login" className='text-blue-400 hover:text-blue-700'>Login</Link>
            </p>
          </form>
          {/* <p className='text-red-300 cursor-pointer w-30 hover:text-red-600' onClick={handleHowToUse}>*How to use</p> */}
        </div>
      </div>
    </AuthLayout>
  );
};

export default SignUp;
