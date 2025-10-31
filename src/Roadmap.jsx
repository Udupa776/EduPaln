import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie'

function Roadmap() {
  const [roadmp,setdmp]=useState()
  const [selection,setsel]=useState()
  useEffect(()=>{
async function apicall(){
  if(Cookies.get("name")){
 let res=await fetch(`http://localhost:5000/generator/${localStorage.getItem("Selection")}`)
 console.log(res)
 let data=await res.json()
console.log(data.response.roadmap[1].subtopics[1])
setdmp(await data)
  }
  else{
    alert("You have to login/signup first");
  }
}
  apicall()
  },[])
  
  return (
  <div>   
    {
   roadmp ? (
      <>
        <button
    className="absolute top-4 right-4 px-4 py-2 bg-blue-600 text-white font-semibold 
               rounded-lg shadow-md hover:bg-blue-700 transition"
  >
    📖 Save Roadmap
  </button>
      <div className=' flex flex-col items-center '>
        
      <h1 className='p-7 text-3xl font-extrabold items-center'>Roadmap for <span className='text-blue-500'> {localStorage.getItem("Selection")}</span></h1>
      
        {roadmp.response.roadmap.map((item, index) => (
          <div key={index} 
          className='flex flex-col w-max p-5 align-middle mb-5 shadow-sm bg-blue-100 rounded-xl 
          justify-between text-center  items-center border-2'>
            <h1 onClick={()=>{window.open(item.link)}}
             className='font-bold text-2xl text-blue-400  hover:cursor-pointer'>{item.main_topic}🔗</h1>
            {item.subtopics.map((itm, idx) => (
              <h6 className=" p-3  font-serif text-shadow-black text-shadow-xs"  key={idx}>{itm}</h6>
            ))}    
          </div>
          
        ))}
        
      </div>
      </>
    ) : (
      <h1>Loading....</h1>
    )}
  </div>
);

}

export default Roadmap