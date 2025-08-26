import { useState } from "react";
import CreateForm from "../pages/CreateForm";
import CreateFormv2 from "./createformv2";
import ResponseForm from "../pages/ResponseForm";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Home from "../pages/Home";

function App() {
  // Check for token to determine admin status
  const isAdmin = !!localStorage.getItem("adminToken");

  return (
    <div>
    
   
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          
          <Route path="/forms/:slug" element={<ResponseForm />} />
          <Route path="/admin/register" element={<Register />} />
          <Route path="/admin/login" element={<Login />} />
          
          <Route path="/admin/create-form" element={<CreateForm />} />
          
        </Routes>
        
      </Router>
         
         

    
      
    </div>
  );
}

export default App;
