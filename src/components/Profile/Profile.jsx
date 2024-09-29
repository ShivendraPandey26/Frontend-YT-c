import React, { useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import { fetchUserInfo } from "../../Redux/Slices/ProfileSlice";
import { useDispatch, useSelector } from "react-redux";
import EditProfile from "./EditProfile";
import Tab from "./Tab";
import axiosInstance from "../../Helper/axiosInstance";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

function Profile() {
  const [isEdit, setIsEdit] = useState(false);
  const { userInfo, isLoading, error } = useSelector((state) => state.profile);
  const [isAdmin, setIsAdmin] = useState(false);
  const dispatch = useDispatch();
  const { userId } = useParams();

  useEffect(() => {
    dispatch(fetchUserInfo());
  }, [dispatch, isEdit]);

  // console.log(userInfo);

  // Handle avatar change
  const handleAvatarChange = async (e) => {
    const avatarFile = e.target.files[0];
    if (!avatarFile) return;

    console.log("Avatar File: ", avatarFile);

    const formData = new FormData();
    formData.append("avatar", avatarFile);

    try {
      const avatarUploadRequest = await axiosInstance.patch(
        "users/update-avatar",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("Updated avatar image file successfully");
    } catch (error) {
      console.error("Error updating avatar:", error);
      toast.error("Failed to update avatar.");
    }
    setIsEdit(!isEdit);
  };

  // Handle cover image change
  const handleCoverImageChange = async (e) => {
    const coverImageFile = e.target.files[0];
    if (!coverImageFile) return;

    // console.log("Cover Image File: ", coverImageFile);

    const formData = new FormData();
    formData.append("coverImage", coverImageFile);

    try {
      await axiosInstance.patch("users/update-coverimage", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Updated cover image file successfully");
    } catch (error) {
      console.error("Error updating cover image:", error);
      toast.error("Failed to update cover image.");
    }
    setIsEdit(!isEdit);
  };

  const checkAdmin = () => {
    if (userId === userInfo._id) {
      setIsAdmin(true);
    }
  };

  useEffect(() => {
    checkAdmin();
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <Layout>
      <div className="bg-white rounded-lg lg:mt-[6.2rem] border-b-2 w-screen">
        {/* Cover Image */}
        <div className="relative h-52 w-full">
          <label htmlFor="cover-image-upload" className="cursor-pointer">
            <img
              src={
                userInfo.coverImage ||
                "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
              }
              alt="Cover"
              className="object-cover w-full h-full rounded-t-lg border"
            />
          </label>
          <input
            type="file"
            id="cover-image-upload"
            className="hidden"
            accept="image/*"
            onChange={handleCoverImageChange}
          />
        </div>

        {/* Avatar and Info */}
        <div className="p-6 py-8">
          <div className="flex items-center space-x-4">
            {/* Avatar */}
            <div>
              <label htmlFor="avatar-upload" className="cursor-pointer">
                <img
                  src={
                    userInfo.avatar ||
                    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                  }
                  alt="User avatar"
                  className="rounded-full h-20 w-20 object-cover border-2 -mt-10"
                />
              </label>
              <input
                type="file"
                id="avatar-upload"
                className="hidden"
                accept="image/*"
                onChange={handleAvatarChange}
              />
            </div>

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
            {isAdmin && <EditProfile user={userInfo} />}
          </div>
        </div>
      </div>
      <Tab />
    </Layout>
  );
}

export default Profile;
