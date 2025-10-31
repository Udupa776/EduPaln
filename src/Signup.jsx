import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
  


function Signup(){
  const navigate=useNavigate()
const [Name,setname]=useState("")
 const [Email,setmail]=useState("")
const [Pass,setpass]=useState("")
const [Cpass,setcpass]=useState("")

async function handleSub(e) {
  e.preventDefault()
  if(Pass!=Cpass)
    alert("Please Enter the both password same ")
  else
    if(Pass.length<9)
      alert("please Eneter password more than 8 character")
  else{

    let res=await fetch("http://localhost:5000/storeuser",{
      method:"Post",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        "Name":Name,
        "email":Email,
        "pass":Pass
      }
      )
    })
    console.log(res)
    let d= await res.json()
    console.log(d)
    alert("Sign Succefully")
    Cookies.set("name",Name,{expires:1,path:"/"})
   navigate("/")
  }
    
} 


  return (
<>
<div className='flex flex-col absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 
     gap-5 text-2xl shadow-2xl p-10 rounded-1xl'>
  <h1 className='text-center'><b>SignUp</b></h1>
<form onSubmit={handleSub} className="flex flex-col gap-5">
  <input className='border-1 focus:border-blue-100 border-blue-100 bg-blue-200 px-3 py-1 rounded-md'
   type='text' placeholder='Enter name ' onChange={(e)=>{setname(e.target.value)}} required ></input>
   <input className='border-1 border-blue-100 bg-blue-200 px-3 py-1 rounded-md' 
   type='email' placeholder='Enter Email' onChange={(e)=>{setmail(e.target.value)}} required></input>
   <input className='border-1 border-blue-100 bg-blue-200 px-3 py-1 rounded-md'
   type='password' placeholder='Enter Password'  required onChange={(e)=>{setpass(e.target.value)}}></input>
   <input className='border-1 border-blue-100 bg-blue-200 px-3 py-1 rounded-md'
   type="password" placeholder='Confirm Password'onChange={(e)=>{setcpass(e.target.value)}} />
   <input type='submit' value='Submit'></input> 
</form>
</div>
</>
  
  );
}

export default Signup;  