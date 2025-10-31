import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import Signup from "./Signup.jsx";
import Login from "./Login.jsx";
import Predictor from './Predictor.jsx';
import Roadmap from './Roadmap.jsx';
import LanguageSwitcher from './exmple.jsx';

function Routesss() {
  return (
      <Router>
      <Routes>
        <Route path="/" element={<App/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/roadmap" element={<Roadmap/>}/>
        <Route path="/predictor" element={<Predictor/>}/>
      </Routes>
    </Router>
  )
}

export default Routesss