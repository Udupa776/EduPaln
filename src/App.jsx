import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import bookImage from './assets/bookimage.jpg';

import Cookies from 'js-cookie'
//dbpass: Supabase@321
import "./index.css"
function App() {
  const navigate=useNavigate()

  return (

    <div className='bg-cyan-100'>
    <div className='flex flex-row justify-between   p-2 text-blue-900 text-3xl font-extrabold border-b-2
     border-blue-500'>
       <div className='flex gap-3'>
       <button className='hover:cursor-pointer p-1 transition-colors duration-300 hover:bg-blue-100 rounded-xl'>Home</button>
       <button className='hover:cursor-pointer p-1 transition-colors duration-300 hover:bg-blue-100 rounded-xl' onClick={()=>{if(Cookies.get("name")) { navigate("/predictor") }else alert("You have to login/signup first");}}>Predictor</button>
       <button className='hover:cursor-pointer p-1 transition-colors duration-300 hover:bg-blue-100 rounded-xl' onClick={()=>{if(Cookies.get("name")){navigate("/roadmap")  }else alert("You have to login/signup first");}}>Roadmap</button>
       <button className='hover:cursor-pointer p-1 transition-colors duration-300 hover:bg-blue-100 rounded-xl'>Quiz</button>
       </div>
       {Cookies.get("name")?(
        <div>
        <button className='border-2 p-1 rounded-2xl hover:bg-blue-100  hover:cursor-pointer duration-200 hover:scale-105 ' onClick={()=>{Cookies.remove("name");window.location.reload()}}>Logout</button> 
      </div>):
      <div className='flex gap-3'>
      <button className='border-2 p-1 rounded-2xl hover:bg-blue-100  hover:cursor-pointer duration-200 hover:scale-105 ' onClick={()=>{navigate("/login")}}>Login</button>
      <button  className='border-2 p-1 rounded-2xl hover:bg-blue-100  hover:cursor-pointer duration-200 hover:scale-105 '  onClick={()=>{navigate("/signup")}}>Sign Up</button> 
      </div>
      
}
    </div>
    <div className=" p-3 m-10 rounded-xl bg-[url('/src/assets/bookimage.jpg')] bg-cover bg-center text-2xl h-[50vh] flex flex-col items-center justify-center">
 <span className='flex font-extrabold justify-center text-4xl fade-in-scale '>Predict. Prepare. Progress.</span>
 <p className='flex p-2 justify-center  '>
 Get college predictions based on your rank and a personalized roadmap to master your chosen branch.
 </p>
 </div>
 <div className='flex flex-row p-5 gap-5 text-2xl align-middle justify-center'>

  <div className='rounded-xl border-2 bg-gradient-to-r from-cyan-300 to-blue-500
      hover:shadow-2xl  duration-300  hover:cursor-pointer p-6 flex flex-col text-bold hover:scale-105 w-72 items-center justify-center gap-5'>
    <p className='text-center font-semibold'>
      Predict the best-fit college based on your rank and preferences
    </p>
   
      <button className='w-full hover:bg-amber-500 bg-amber-300 rounded p-2 hover:cursor-pointer' onClick={()=>{if(Cookies.get("name")){ navigate("/predictor")  }else alert("You have to login/signup first");}}>Predict</button>
    
  </div>

  <div className='rounded-xl border-2 bg-gradient-to-r from-cyan-300 to-blue-500
      hover:shadow-2xl  duration-300 hover:cursor-pointer  hover:scale-105 text-bold w-72 p-6 flex flex-col items-center justify-center gap-5'>
    <p className='text-center font-semibold'>
      Get a personalized roadmap tailored to your chosen branch and goals.
    </p>
    
      <button className= 'w-full hover:bg-amber-500 bg-amber-300 rounded p-2 hover:cursor-pointer' onClick={()=>{if(Cookies.get("name")) {navigate("/roadmap")  }else alert("You have to login/signup first");}}>Generate</button>
    
  </div>

  <div className='rounded-xl border-2 bg-gradient-to-r from-cyan-300 to-blue-500
      hover:shadow-xl hover:cursor-pointer p-6 flex flex-col text-bold duration-300  hover:scale-105 w-72 items-center justify-center gap-5'>
    <p className='text-center font-semibold'>
      Test your knowledge and track your growth with engaging quizzes.
    </p>
      <button className='hover:bg-amber-500 w-full bg-amber-300 rounded p-2 hover:cursor-pointer'>Explore</button>
    
  </div>

</div>
<div className='flex flex-row justify-center items-center gap-10 mt-10 bg-fuchsia-100'>
  <div className='flex flex-col items-center '>
<p className='text-7xl font-extrabold myclass duration-300'>10M+</p>
<p>users</p>
</div>
<div className='flex flex-col  items-center '>
<p className='text-7xl font-extrabold myclass duration-300'>64K+</p>
<p>reviews</p>
</div>
</div>
    </div>
  )
}


export default App
