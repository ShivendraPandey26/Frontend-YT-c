import React from "react";
import { FiMenu } from "react-icons/fi";
import { RiVideoAddLine } from "react-icons/ri";
import SearchBar from "./SearchBar";

function Navbar({ toggleSidebar }) {
  return (
    <>
      <nav className="fixed top-0 left-0 right-0 flex items-center justify-between bg-white shadow-md p-4 md:p-6 z-40 w-screen">
        {/* Menu icon */}
        <div className="flex items-center gap-5">
          <button
            onClick={toggleSidebar}
            className="bg-gray-200 text-black rounded p-2 hover:bg-gray-300 transition duration-200"
          >
            <FiMenu size={25} />
          </button>
          <h1 className="text-2xl font-bold text-red-600">YouTube</h1>
        </div>

        {/* Add search input */}
        <div className="w-full hidden md:block">
          <SearchBar />
        </div>

        <div className="w-32 flex items-center justify-between mx-5">
          <div>
            <button className="">
              <RiVideoAddLine size={30} />
            </button>
          </div>
          <div>
            {/* User avatar */}
            <img
              src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
              alt="User avatar"
              className="rounded-full h-12 w-12 object-cover"
            />
          </div>
        </div>
      </nav>

      <div className=" bg-slate-100 w-full block md:hidden mt-20 py-2 z-0">
        <SearchBar />
      </div>
    </>
  );
}

export default Navbar;
