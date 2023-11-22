import React from "react";

import {Info} from "./components/Info"
import {Login} from "./components/Login"
import {Register} from "./components/Register"
import {Logout} from "./components/Logout"
import {Home} from "./components/Home"
import {BrowserRouter, Routes, Route} from 'react-router-dom'

function App() {
  return (
    <div>
	 <BrowserRouter>
        <Routes>
          <Route path="/" element={<Info/>}/>
          <Route path="/home" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
		  <Route path="/logout" element={<Logout />}/>
        </Routes>
      </BrowserRouter>;
    </div>
  );
}

export default App;