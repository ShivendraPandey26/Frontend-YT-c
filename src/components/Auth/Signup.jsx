import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signUpCreating } from "../../Redux/Slices/AuthSlice";

const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    avatar: null,
    coverImage: null,
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handle change for inputs
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "avatar" || name === "coverImage") {
      setFormData((prevState) => ({ ...prevState, [name]: files[0] }));
    } else {
      setFormData((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  // Form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { fullName, username, email, password, avatar, coverImage } =
      formData;

    if (!fullName || !username || !email || !password || !avatar) {
      toast.error("Please fill all required fields");
      return;
    }

    const response = await dispatch(signUpCreating(formData));

    if (response.payload?.error) {
      toast.error(response.payload.error || "Signup failed");
    } else {
      toast.success("Signup successful!");
      navigate("/login");
    }
  };

  // Generate object URLs for images
  const [previewAvatar, setPreviewAvatar] = useState(null);
  const [previewCoverImage, setPreviewCoverImage] = useState(null);

  useEffect(() => {
    if (formData.avatar) {
      const objectUrl = URL.createObjectURL(formData.avatar);
      setPreviewAvatar(objectUrl);
      return () => URL.revokeObjectURL(objectUrl); // Clean up
    } else {
      setPreviewAvatar(
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
      );
    }
  }, [formData.avatar]);

  useEffect(() => {
    if (formData.coverImage) {
      const objectUrl = URL.createObjectURL(formData.coverImage);
      setPreviewCoverImage(objectUrl);
      return () => URL.revokeObjectURL(objectUrl); // Clean up
    } else {
      setPreviewCoverImage(
        "https://via.placeholder.com/800x200.png?text=Cover+Image"
      );
    }
  }, [formData.coverImage]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-10">
      <div className="w-full max-w-2xl bg-white p-6 shadow-2xl rounded-lg">
        {/* Cover Image Section */}
        <div className="relative">
          <div className="h-48 w-full bg-gray-300 rounded-lg overflow-hidden">
            <img
              src={previewCoverImage}
              alt="Cover"
              className="w-full h-full object-cover"
            />
          </div>
          <label className="absolute bottom-3 right-3 bg-white py-2 px-4 rounded-full shadow cursor-pointer text-blue-500 hover:bg-blue-100 transition-all">
            <input
              type="file"
              name="coverImage"
              accept="image/*"
              onChange={handleChange}
              className="hidden"
            />
            Change Cover Image
          </label>

          {/* Avatar Image Section */}
          <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
            <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg">
              <img
                src={previewAvatar}
                alt="Avatar"
                className="w-full h-full object-cover"
              />
            </div>
            <label className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow cursor-pointer text-blue-500 hover:bg-blue-100 transition-all">
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={handleChange}
                className="hidden"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </label>
          </div>
        </div>

        {/* Profile Information Form */}
        <div className="mt-16 px-6">
          <h2 className="text-2xl font-bold text-center mb-6">
            Create Profile
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name */}
            <div>
              <label
                className="block text-gray-700 font-semibold mb-2"
                htmlFor="fullName"
              >
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                id="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your full name"
                required
              />
            </div>

            {/* Username */}
            <div>
              <label
                className="block text-gray-700 font-semibold mb-2"
                htmlFor="username"
              >
                Username
              </label>
              <input
                type="text"
                name="username"
                id="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Choose a username"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label
                className="block text-gray-700 font-semibold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label
                className="block text-gray-700 font-semibold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Create a password"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-3 rounded-lg shadow-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 ease-in-out"
            >
              Sign Up
            </button>
          </form>
        </div>
        <div className="flex items-center justify-center mt-6">
          <p className="text-sm text-gray-500">
            Already have an account?{" "}
            <Link to={"/login"} className="text-blue-500">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
