import React from "react";
import Navbar from "../Navbar";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { USER_API_END_POINT } from "../../utilis/constant";

import axios from "axios"

function Signup() {
  const [input, setinput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: "",
  });
	const navigate=useNavigate();
  const changeEventHandler = (e) => {
    setinput({ ...input, [e.target.name]: e.target.value });
  };
  // const changeFileHandler = (e) => {
  //   setinput({ ...input, file: e.target.file?.[0] });
  // };
	const changeFileHandler = (e) => {
    setinput({ ...input, file: e.target.files[0] });
  };

	const submitHandler =async(e)=>{
		e.preventDefault();
		const formData=new FormData();
		formData.append("fullname",input.fullname);
		formData.append("email",input.email);
		formData.append("phoneNumber",input.phoneNumber);
		formData.append("password",input.password);
			formData.append("role",input.role);
			if(input.file){
				formData.append("file",input.file);
			}
		console.log("Submitting form with:", Object.fromEntries(formData.entries()));


		  try{
				const res=await axios.post(`http://localhost:3000/api/v1/user/register`,formData,{
					headers:{   
						"Content-Type":"multipart/form-data"
					},
					// withCredentials:true,
				});
				if(res.data.success){
					navigate("/login");
					toast.success(res.data.message);
				}

			}
		  catch(err){
				console.log(err);

			}
	}
  return (
    <>
      <Navbar />

      <div className="flex items-center justify-center max-w-7xl mx-auto ">
        <form  onSubmit={submitHandler}className="w-1/2 border border-gray-200 rounded-md p-6 my-10 bg-white shadow">
          <h1 className="font-bold text-2xl mb-5">Sign-up</h1>

          <div className="my-4">
            <Label htmlFor="fullname">Full Name</Label>
            <Input
              id="fullname"
              type="text"
              value={input.fullname}
              name="fullname"
              onChange={changeEventHandler}
              placeholder="Enter your name"
              className="w-full mt-1"
            />
          </div>

          <div className="my-4">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
              placeholder="Enter your email"
              className="w-full mt-1"
            />
          </div>

          <div className="my-4">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
              placeholder="Enter your password"
              className="w-full mt-1"
            />
          </div>
          <div className="my-4">
           <Input
  id="phonenumber"
  type="number"
  value={input.phoneNumber}
  name="phoneNumber"
  onChange={changeEventHandler}
  placeholder="Enter your phone number"
  className="w-full mt-1"
/>

          </div>
          <div className="flex items-center justify-between cursor-pointer">
            <RadioGroup
              defaultValue="option-one"
              className="flex items-center space-x-2"
            >
              <div className="flex items-center space-x-2">
                <Input
								id="option-one"
                  type="radio"
                  name="role"
                  value="student"
									checked={input.role==='student'}
									onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="option-one">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
								id="option-two"
                  type="radio"
                  name="role"
                  value="recruiter"
										checked={input.role==='recruiter'}
									onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="option-two">Recruiter</Label>
              </div>
            </RadioGroup>
            <div className="flex items-center gap-2">
              <Label>
                Profile
                <Input
                  accept="image/*"
                  type="file"
									onChange={changeFileHandler}
                  className="cursor-pointer"
                />
              </Label>
            </div>
          </div>

          <button onClick={submitHandler}   className="mt-4 w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
            Sign Up
          </button>
          <span className="text-sm mt-20 pt-18">
            Aleady have an account?
            <Link to="/login" className="text-blue-400">
              Login
            </Link>
          </span>
        </form>
      </div>
    </>
  );
}

export default Signup;
