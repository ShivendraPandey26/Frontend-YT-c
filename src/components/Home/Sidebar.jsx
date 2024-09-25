import React from "react";
import { FiMenu } from "react-icons/fi"; 

function Sidebar({ toggleSidebar }) {
  return (
    <div className="bg-white min-h-screen top-0 w-60 fixed md:relative transition-transform duration-500 z-50">
      <div className="flex items-center gap-5 lg:p-7 sm:p-4 p-4">
        <button
          onClick={toggleSidebar}
          className="bg-gray-200 text-black rounded p-2 hover:bg-gray-300 transition duration-200"
        >
          <FiMenu size={25} />
        </button>
        <h1 className="text-2xl font-bold text-red-600">YouTube</h1>
      </div>
      <ul>
        <li className="mb-2">
          <a href="#" className="text-gray-700 hover:text-red-600">
            Home
          </a>
        </li>
        <li className="mb-2">
          <a href="#" className="text-gray-700 hover:text-red-600">
            Trending
          </a>
        </li>
        <li className="mb-2">
          <a href="#" className="text-gray-700 hover:text-red-600">
            Subscriptions
          </a>
        </li>
        <li className="mb-2">
          <a href="#" className="text-gray-700 hover:text-red-600">
            Library
          </a>
        </li>
        <li className="mb-2">
          <a href="#" className="text-gray-700 hover:text-red-600">
            History
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
