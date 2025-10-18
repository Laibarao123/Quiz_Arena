import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Auth from "./pages/Auth";  
import Host from "./pages/Host";
import Player from "./pages/Player";
import Shared from "./pages/Shared";
import Admin from "./pages/Admin";
import Login from "./components/Login";
import Register from "./components/Register";
import Leaderbord from "./components/Leaderbord";
import Footer from "./components/Footer";
import Createquiz from "./components/Createquiz";
import Questionmanager from "./components/Questionmanager";
import Quizroomhostviw from "./components/Quizroomhostviw";
const App = () => {
  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/auth" element={<Auth />} />
      
      {/* <Route path="/register" element={<Register/>} /> */}
      
      <Route path="/quizroomhostviw" element={<Quizroomhostviw />} />
      <Route path="/questionmanager" element={<Questionmanager />} />
      
      <Route path="/player" element={<Player/>} />
      
      {/* <Route path="/hostDashbord" element={<HostDashbord />} /> */}
      <Route path="/createquiz" element={<Createquiz/>} />

      
      <Route path="/register" element={<Register/>} />
      <Route path="/host" element={<Host />} />
      
      <Route path="/admin" element={<Admin />} />
      <Route path="/login" element={<Login/>}/>
      
      <Route path="/shared" element={<Shared />} />
      
      <Route path="/footer" element={<Footer />} />
      
      
      <Route path="/leaderbord" element={<Leaderbord/>} />
    </Routes>
  );
};

export default App;
