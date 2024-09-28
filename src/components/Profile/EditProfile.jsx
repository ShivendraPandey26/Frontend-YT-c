import React, { useState } from "react";
import toast from "react-hot-toast";
import axiosInstance from "../../Helper/axiosInstance";

function EditProfile({ user }) {
  const [fullName, setFullName] = useState(user?.fullName);
  const [email, setEmail] = useState(user?.email);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await axiosInstance.patch("/users/update-details", {
        fullName,
        email,
      });

      toast.success("User details updated successfully!");
      //   console.log("Updated user:", response.data);
    } catch (error) {
      toast.error("Failed to update user details.");
      console.error("Error updating user:", error);
    } finally {
      setIsLoading(false);
      document.getElementById("my_modal_3").close();
    }
  };
  return (
    <>
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        onClick={() => document.getElementById("my_modal_3").showModal()}
      >
        Edit Profile
      </button>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">Edit profile</h3>
          <p>
            Make changes to your profile here. Click save when you're done.{" "}
            <br />
            Press ESC key or click on ✕ button to close
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name Field */}
            <div>
              <label
                className="block text-gray-700 font-semibold my-2"
                htmlFor="fullName"
              >
                Full Name
              </label>
              <input
                id="fullName"
                type="text"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>

            {/* Email Field */}
            <div>
              <label
                className="block text-gray-700 font-semibold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className={`w-full py-2 px-4 rounded-lg text-white font-semibold ${
                isLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
              disabled={isLoading}
            >
              {isLoading ? "Updating..." : "Update Details"}
            </button>
          </form>
        </div>
      </dialog>
    </>
  );
}

export default EditProfile;
