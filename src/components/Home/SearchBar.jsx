import React from "react";
import { FaSearch } from "react-icons/fa";

function SearchBar() {
  return (
    <div className="flex items-center justify-between border border-gray-300 rounded-full bg-white shadow-md w-full max-w-xs sm:max-w-md lg:max-w-lg xl:max-w-2xl mx-auto">
      <input
        type="text"
        placeholder="Search..."
        className="flex-grow h-12 pl-4 border-none outline-none text-gray-700 placeholder-gray-400 bg-transparent"
      />
      <button className="w-auto h-12 px-6 ms-4 text-gray-600 border bg-slate-200 focus:outline-none rounded-e-full">
        <FaSearch size={18} />
      </button>
    </div>
  );
}

export default SearchBar;
