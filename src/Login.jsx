import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie';
function Login() {
const navigate=useNavigate()
const [Mail,setMail]=useState("")
const [pass,Setpass]=useState("")
    async function handlelogin(e)
    {
        e.preventDefault()

        let res=await fetch(`http://localhost:5000/getuser`,{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({
                "mail":Mail,
                "pass":pass
            })
        });
        console.log(res)
        let data=await res.json();
        console.log(data)
        if(data.error===true)
            alert(data.description)
        else
        {
            Cookies.set("name",data.uname,{expires:1,path:"/"})
            navigate("/")
        }
        
    }
  return (
    <>
    <div className='flex flex-col absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 
     gap-5 text-2xl shadow-2xl p-10 rounded-1xl'>
        <h1 className='text-center '><b>Login</b></h1>
    <form onSubmit={handlelogin}className="flex flex-col gap-5">
        <input  className='border-1 focus:border-blue-100 border-blue-100 bg-blue-200 px-3 py-1 rounded-md'
         type="email" placeholder='Enter your registered mail' required onChange={(e)=>{setMail(e.target.value)}}></input>
        <input  className='border-1 focus:border-blue-100 border-blue-100 bg-blue-200 px-3 py-1 rounded-md'
        type="password" placeholder='Enter your password' onChange={(e)=>{Setpass(e.target.value)}} />
        <input type="submit" value={"Submit"}/>
    </form>
    </div>
    </>
  )
}

export default Login