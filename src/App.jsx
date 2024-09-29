import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";

// @Component
import Home from "./components/Home/Home";
import Signup from "./components/Auth/Signup";
import Login from "./components/Auth/Login";
import Watch from "./components/Video/Watch";
import PublishVideo from "./components/Video/PublishVideo";
import Profile from "./components/Profile/Profile";
import Tweets from "./components/Tweets/Tweets";
import ForgotPassword from "./components/Auth/ForgotPassword";
import Subscribe from "./components/Subscribe/Subscribe";
import Trending from "./components/Trending/Trending";

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/watch/:videoId" element={<Watch />} />
      <Route path="/publishvideo" element={<PublishVideo />} />
      <Route path="/profile/:userId" element={<Profile />} />
      <Route path="/tweets" element={<Tweets />} />
      <Route path="/subscribe" element={<Subscribe />} />
      <Route path="/trending" element={<Trending />} />
    </Routes>
  );
}

export default App;
