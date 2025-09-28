import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import Page from './page.jsx'
import './App.css'

function App() {
  const [count, setCount] = useState(8)
  const [data,funs]=useState()
async function fun() {
  let res=await fetch("http://localhost:5000/api/data")
  let datas=await res.text();
  let fdata=await JSON.parse(datas)

  console.log(fdata)
    
}
  return (
    <>
    <Page></Page>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1 onClick={()=>{fun()}}>Vite + React </h1>
      
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
