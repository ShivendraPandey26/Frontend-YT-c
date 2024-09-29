import React, { useEffect } from "react";
import { CgPlayList } from "react-icons/cg";
import { FaHistory, FaHome, FaThumbsUp, FaUsers } from "react-icons/fa";
import { FaUserGear } from "react-icons/fa6";
import { FiMenu } from "react-icons/fi";
import { MdSubscriptions } from "react-icons/md";
import { TbTrendingUp } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logOut } from "../../Redux/Slices/AuthSlice";
import { useNavigate } from "react-router-dom";
import { fetchUserInfo } from "../../Redux/Slices/ProfileSlice";

function Sidebar({ toggleSidebar }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.profile);
  const { isAuthenticated } = useSelector((state) => state.auth);

  const handleLogout = async () => {
    await dispatch(logOut());
    navigate("/login");
  };

  useEffect(() => {
    dispatch(fetchUserInfo());
  }, []);

  return (
    <div className="bg-white min-h-screen top-0 w-60 fixed md:relative transition-transform duration-500 z-50">
      <div className="h-full fixed">
        <div className="flex items-center gap-5 lg:p-7 sm:p-4 p-4">
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
        <ul>
          <li className="w-[90%] mb-2 hover:bg-gray-200 rounded-xl">
            <Link
              to={"/"}
              className="text-gray-700 hover:text-red-600 px-4 py-2 font-medium flex items-center gap-3"
            >
              <FaHome size={25} /> Home
            </Link>
          </li>
          <li className="w-[90%] mb-2 hover:bg-gray-200 rounded-xl">
            <Link
              to={"/trending"}
              className="text-gray-700 hover:text-red-600 px-4 py-2 font-medium flex items-center gap-3"
            >
              <TbTrendingUp size={25} /> Trending
            </Link>
          </li>

          <li className="border-b-2 mb-5"></li>

          {isAuthenticated ? (
            <li className="w-[90%] mb-2 hover:bg-gray-200 rounded-xl">
              <Link
                to={`/profile/${userInfo._id}`}
                className="text-gray-700 hover:text-red-600 px-4 py-2 font-medium flex items-center gap-3"
              >
                <FaUserGear size={25} /> Your Channel
              </Link>
            </li>
          ) : (
            <Link
              to={"/login"}
              className="text-gray-700 hover:text-red-600 px-4 py-2 font-medium flex items-center gap-3"
            >
              <FaUserGear size={25} /> Your Channel
            </Link>
          )}
          <li className="w-[90%] mb-2 hover:bg-gray-200 rounded-xl">
            <Link
              to={"/subscribe"}
              className="text-gray-700 hover:text-red-600 px-4 py-2 font-medium flex items-center gap-3"
            >
              <MdSubscriptions size={25} /> Subscriptions
            </Link>
          </li>
          <li className="w-[90%] mb-2 hover:bg-gray-200 rounded-xl">
            <Link
              to={"/tweets"}
              className="text-gray-700 hover:text-red-600 px-4 py-2 font-medium flex items-center gap-3"
            >
              <FaUsers size={25} /> Tweets
            </Link>
          </li>
          <li className="w-[90%] mb-2 hover:bg-gray-200 rounded-xl">
            <a
              href="#"
              className="text-gray-700 hover:text-red-600 px-4 py-2 font-medium flex items-center gap-3"
            >
              <CgPlayList size={30} /> Playlists
            </a>
          </li>
          <li className="w-[90%] mb-2 hover:bg-gray-200 rounded-xl">
            <a
              href="#"
              className="text-gray-700 hover:text-red-600 px-4 py-2 font-medium flex items-center gap-3"
            >
              <FaThumbsUp size={25} /> Liked Videos
            </a>
          </li>
          <li className="w-[90%] mb-2 hover:bg-gray-200 rounded-xl">
            <a
              href="#"
              className="text-gray-700 hover:text-red-600 px-4 py-2 font-medium flex items-center gap-3"
            >
              <FaHistory size={25} /> History
            </a>
          </li>
        </ul>

        <div className="mt-56 mx-5">
          <button
            onClick={handleLogout}
            className="text-white hover:bg-slate-500 px-8 py-2 rounded-lg bg-slate-600 font-medium"
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
