import React, { useEffect } from "react";
import Layout from "../Layout/Layout";
import { fetchUserInfo } from "../../Redux/Slices/ProfileSlice";
import { useDispatch, useSelector } from "react-redux";
import EditProfile from "./EditProfile";
import Tab from "./Tab";

function Profile() {
  const dispatch = useDispatch();

  const { userInfo, isLoading, error } = useSelector((state) => state.profile);

  useEffect(() => {
    dispatch(fetchUserInfo());
  }, []);

  // console.log(userInfo);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <Layout>
      <div className="bg-white rounded-lg lg:mt-[6.2rem] border-b-2">
        {/* Cover Image */}
        <div className="relative h-52 w-full">
          <img
            src={
              userInfo.coverImage ||
              "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
            }
            alt="Cover"
            className="object-cover w-full h-full rounded-t-lg border"
          />
        </div>

        {/* Avatar and Info */}
        <div className="p-6 py-8">
          <div className="flex items-center space-x-4">
            {/* Avatar */}
            <img
              src={
                userInfo.avatar ||
                "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
              }
              alt="User avatar"
              className="rounded-full h-20 w-20 object-cover border-2 -mt-10"
            />

            {/* User Info */}
            <div>
              <h2 className="text-xl font-bold text-black">
                {userInfo.fullName}
              </h2>
              <p className="text-gray-900">@{userInfo.username}</p>
              <p className="text-sm text-gray-800">{userInfo.email}</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-4 flex justify-end space-x-2">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
              Subscribe
            </button>
            <EditProfile user={userInfo} />
          </div>
        </div>
      </div>
      <Tab />
    </Layout>
  );
}

export default Profile;
