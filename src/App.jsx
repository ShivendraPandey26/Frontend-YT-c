import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";

// @Component
import Home from "./components/Home/Home";
import Signup from "./components/Auth/Signup";
import Login from "./components/Auth/Login";
import Watch from "./components/video/Watch";
import PublishVideo from "./components/Video/PublishVideo";

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/watch/:videoId" element={<Watch />} />
      <Route path="/publish-video" element={<PublishVideo />} />
    </Routes>
  );
}

export default App;
