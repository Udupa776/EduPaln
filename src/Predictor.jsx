import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
function Predictor() {
  const navigate=useNavigate()
const [Exam,setExam]=useState("")
const [Select,setSelect]=useState("")
const [rank,setrank]=useState("")
const [d,setd]=useState()
let data;
async function handleSelect(e){
   e.preventDefault()
   console.log(e.target.sub.className)
   
   let res=await fetch("http://localhost:5000/predict",{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({
      "select":Select,
      "rank":rank
    })
 
    
   })
localStorage.setItem("Selection",Select)
   data=await res.json()
   console.log(data)
   let m=data.result.split("\r\n")
   setd(m)
   e.target.sub.className+=" hidden";
   e.target.generate.className= `hover:cursor-pointer border-2 border-blue-300 
      bg-blue-100 hover:bg-blue-200 transition-all 
      w-fit px-4 py-1 text-center rounded-md self-center `;

  
  }
async function handleExam(e)
{
  const value=await e.target.value
  setExam(value)
}

async function handleselect(e)
{
  const value=await e.target.value
  setSelect(value)
}

async function handlerank(e)
{
  const value=await e.target.value
  setrank(value)
}

  return (
   <div
  className="flex flex-col absolute left-1/2 top-1/2 transform 
  -translate-x-1/2 -translate-y-1/2 gap-5 text-2xl shadow-2xl 
  p-10 rounded-2xl w-fit bg-white"
>
  <h1 className="text-center font-semibold">
    College Predictor 2026 for CET, JEE and other Top Universities and Exams
  </h1>

  <form onSubmit={handleSelect} className="flex flex-col gap-5">
    
    <label
      htmlFor="select"
      className="flex items-center gap-3 flex-wrap text-lg"
    >
      <span className="whitespace-nowrap">Select College:</span>
      <select
        id="select"
        onChange={handleExam}
        className="border border-blue-200 bg-blue-200 focus:border-blue-400 
        px-3 py-1 rounded-md w-52 truncate"
      >
        <option value="" disabled selected>
          Select College
        </option>
        <option value="Cet">Cet</option>
        <option value="JEE">JEE</option>
        <option value="KCet">KCet</option>
        <option value="MH-Cet">MH-Cet</option>
        <option value="Comed-k">Comed-k</option>
      </select>
    </label>
  <label htmlFor="Rank"  className="flex items-center gap-3 flex-wrap text-lg">Enter Rank: 
    <input
    id="Rank"
      type="number"
      placeholder='Enter Rank'
      onChange={handlerank}
      className="border border-blue-200 bg-blue-200 focus:border-blue-400 
      px-3 py-1 rounded-md "
    />
    </label>
    <label
      htmlFor="branch-select"
      className="flex items-center gap-3 flex-wrap text-lg"
    >
      <span className="whitespace-nowrap">Select Branch:</span>
      <select
        id="branch-select"
        onChange={handleselect}
        className="border border-blue-200 bg-blue-200 focus:border-blue-400 
        px-3 py-1 rounded-md w-60 truncate"
      >
        <option disabled selected>
          Select Branch
        </option>
        <option>Computer Science</option>
        <option>Information Science</option>
        <option>Civil</option>
        <option>Artificial Intelligence</option>
        <option>Mechanical Engineering</option>
        <option>Aero Space Engineering</option>
      </select>
    </label>

    <input
      type="submit"
      id='sub'
      value="Submit"
      className="hover:cursor-pointer border-2 border-blue-300 
      bg-blue-100 hover:bg-blue-200 transition-all 
      w-fit px-4 py-1 text-center rounded-md self-center"
    />
    
  {d&&
    d.map((item,index)=>
    (
      <h1 key={index}>{index+1}.{item}</h1>
    ))
  }
<button id="generate"  className="hover:cursor-pointer border-2 border-blue-300 
      bg-blue-100 hover:bg-blue-200 transition-all 
      w-fit px-4 py-1 text-center rounded-md self-center hidden" onClick={()=>{navigate("/roadmap")}}>Generate Road Map</button>
  </form>
</div>

  )
}

export default Predictor