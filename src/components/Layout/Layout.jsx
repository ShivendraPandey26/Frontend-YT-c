import React, { useState } from "react";
import Navbar from "../Home/Navbar";
import Sidebar from "../Home/Sidebar";

function Layout({ children }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Toggle the sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };


  return (
    <>
      <Navbar toggleSidebar={toggleSidebar} />
      <div className={`flex transition-all duration-500`}>
        {isSidebarOpen && <Sidebar toggleSidebar={toggleSidebar} />}
        <div className="w-full h-full bg-gray-200">
        {children}
      </div>
      </div>
    </>
  );
}

export default Layout;
