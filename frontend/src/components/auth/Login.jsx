

import React from "react"
import Navbar from "../Navbar"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { RadioGroup,RadioGroupItem } from "../ui/radio-group"
import {Button} from "../ui/button"
import {Link} from "react-router-dom";
import { useState } from "react"
import axios from "axios"

function Login() {
	 const [input,setinput]=useState({
		  fullname:"",
			email:"",
			phoneNumber:"",
			password:"",
			role:"",
			file:""
	 })
	 const changeEventHandler=(e)=>{
		    setinput({...input,[e.target.name]:e.target.value});
	 }
	 const changeFileHandler =(e)=>{
		setinput({...input,file:e.target.file?.[0]});
	 }

	 const submitHandler =async(e)=>{
			e.preventDefault();
			
			
	 
				try{
					const res=await axios.post(`${USER_API_END_POINT}/login`,input,{
						headers:{
							"Content-Type":"application/json"
						},
						withCredentials:true,
					});
					if(res.data.success){
						navigate("/");
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
        <form onSubmit={submitHandler()} className="w-1/2 border border-gray-200 rounded-md p-6 my-10 bg-white shadow">
          <h1 className="font-bold text-2xl mb-5">Login</h1>

          

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
					 <div className="flex items-center justify-between cursor-pointer">
						<RadioGroup defaultValue="option-one" className="flex items-center space-x-2">
  <div className="flex items-center space-x-2">
     
											<Input
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
   

					 </div>

          <button className="mt-4 w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          Login
          </button>
					<span className="text-sm mt-20 pt-18">Don't have an account?<Link to="/signup" className="text-blue-400">Signup</Link></span>
        </form>
      </div>
		
    </>
	)
}

export default Login
