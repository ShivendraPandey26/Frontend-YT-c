import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const Home = () => {
  // Sample video data
  const videos = [
    {
      id: 1,
      title: "Learn React in 30 Minutes",
      channel: "React Academy",
      views: "1.2M views",
      date: "1 week ago",
      thumbnail: "https://via.placeholder.com/320x180.png?text=Video+1",
    },
    {
      id: 2,
      title: "JavaScript for Beginners",
      channel: "Coding Ninjas",
      views: "500K views",
      date: "2 weeks ago",
      thumbnail: "https://via.placeholder.com/320x180.png?text=Video+2",
    },
    {
      id: 3,
      title: "CSS Flexbox Tutorial",
      channel: "Design Master",
      views: "800K views",
      date: "3 weeks ago",
      thumbnail: "https://via.placeholder.com/320x180.png?text=Video+3",
    },
    {
      id: 4,
      title: "Introduction to TypeScript",
      channel: "TypeScript Academy",
      views: "600K views",
      date: "1 month ago",
      thumbnail: "https://via.placeholder.com/320x180.png?text=Video+4",
    },
    {
      id: 5,
      title: "Mastering Git and GitHub",
      channel: "Version Control Mastery",
      views: "750K views",
      date: "2 months ago",
      thumbnail: "https://via.placeholder.com/320x180.png?text=Video+5",
    },
    {
      id: 6,
      title: "Building REST APIs with Node.js",
      channel: "Node.js Tutorials",
      views: "900K views",
      date: "2 weeks ago",
      thumbnail: "https://via.placeholder.com/320x180.png?text=Video+6",
    },
    {
      id: 7,
      title: "Understanding React Hooks",
      channel: "React Guru",
      views: "1.5M views",
      date: "1 month ago",
      thumbnail: "https://via.placeholder.com/320x180.png?text=Video+7",
    },
    {
      id: 8,
      title: "JavaScript ES6 Features",
      channel: "JavaScript Simplified",
      views: "300K views",
      date: "3 weeks ago",
      thumbnail: "https://via.placeholder.com/320x180.png?text=Video+8",
    },
    {
      id: 9,
      title: "CSS Grid Layout Tutorial",
      channel: "Web Design Essentials",
      views: "550K views",
      date: "1 month ago",
      thumbnail: "https://via.placeholder.com/320x180.png?text=Video+9",
    },
    {
      id: 10,
      title: "Building a Simple Todo App with React",
      channel: "React Development",
      views: "2M views",
      date: "2 weeks ago",
      thumbnail: "https://via.placeholder.com/320x180.png?text=Video+10",
    },
  ];

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <>
      <Navbar toggleSidebar={toggleSidebar} />
      <div className={`flex transition-all duration-500`}>
        {isSidebarOpen && <Sidebar toggleSidebar={toggleSidebar} />}

        <div className="flex-grow bg-gray-100 p-4 md:p-6 lg:p-8 lg:mt-20 sm:mt-0 md:mt-20 mt-0">
          {/* Video Grid */}
          <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video) => (
              <div
                key={video.id}
                className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-200"
              >
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2">{video.title}</h3>
                  <p className="text-gray-700 mb-1">{video.channel}</p>
                  <p className="text-gray-500 text-sm">
                    {video.views} • {video.date}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
