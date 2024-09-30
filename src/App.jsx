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
import Soon from "./NotFound/Soon";
import NotFound from "./NotFound/NotFound";

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
      <Route path="/playlists" element={<Soon />} />
      <Route path="/liked" element={<Soon />} />
      <Route path="/history" element={<Soon />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
