import React, { useEffect } from "react";
import { FiMenu } from "react-icons/fi";
import { RiVideoAddLine } from "react-icons/ri";
import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";
import { fetchUserInfo } from "../../Redux/Slices/ProfileSlice";
import { useDispatch, useSelector } from "react-redux";

function Navbar({ toggleSidebar }) {
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.profile);
  const { isAuthenticated } = useSelector((state) => state.auth);

  // console.log({ userInfo, isAuthenticated });

  useEffect(() => {
    dispatch(fetchUserInfo());
  }, []);

  // console.log(userInfo);

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
          <a href="/">
            <h1 className="text-2xl font-bold text-red-600">YouTube</h1>
          </a>
        </div>

        {/* Add search input */}
        <div className="w-full hidden md:block">
          <SearchBar />
        </div>

        <div className="w-32 flex items-center justify-between mx-5">
          {isAuthenticated ? (
            <div className="text-red-600">
              <Link to={"/publishvideo"}>
                <RiVideoAddLine size={30} />
              </Link>
            </div>
          ) : (
            <Link to={"/login"}>
              <RiVideoAddLine size={30} />
            </Link>
          )}
          {isAuthenticated ? (
            <Link to={`/profile/${userInfo._id}`}>
              {/* User avatar */}
              <img
                src={
                  userInfo.avatar ||
                  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                }
                alt="User avatar"
                className="rounded-full h-12 w-12 object-cover border"
              />
            </Link>
          ) : (
            <Link to={`/login`}>
              {/* User avatar */}
              <img
                src={
                  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                }
                alt="User avatar"
                className="rounded-full h-12 w-12 object-cover border"
              />
            </Link>
          )}
        </div>
      </nav>

      {/* for mobile devices */}
      <div className=" bg-slate-100 w-full block md:hidden mt-20 py-2 z-0">
        <SearchBar />
      </div>
    </>
  );
}

export default Navbar;
