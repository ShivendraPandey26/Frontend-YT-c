import React, { useState } from "react";
import Layout from "../Layout/Layout";
import axiosInstance from "../../Helper/axiosInstance";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const PublishVideo = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("videoFile", videoFile);
    formData.append("thumbnail", thumbnail);

    try {
      const response = await axiosInstance.post("/video", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(response.data);

      toast.success("Video published successfully!");

      navigate('/');
      setTitle("");
      setDescription("");
      setVideoFile(null);
      setThumbnail(null);
    } catch (error) {
      console.error("Error publishing video:", error);

      toast.error("Failed to publish video. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="flex flex-col items-center bg-gray-50 rounded-lg shadow-lg p-6 max-w-xl mx-auto mt-32">
        <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">
          Publish Video
        </h2>
        <form onSubmit={handleSubmit} className="w-full">
          {/* Title Input */}
          <div className="mb-4">
            <label
              className="block text-sm font-medium mb-1 text-gray-700"
              htmlFor="title"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Description Input */}
          <div className="mb-4">
            <label
              className="block text-sm font-medium mb-1 text-gray-700"
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
              required
            />
          </div>

          {/* Video File Input */}
          <div className="mb-4">
            <label
              className="block text-sm font-medium mb-1 text-gray-700"
              htmlFor="videoFile"
            >
              Video File
            </label>
            <input
              type="file"
              id="videoFile"
              accept="video/*"
              onChange={(e) => setVideoFile(e.target.files[0])}
              className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Thumbnail Input */}
          <div className="mb-4">
            <label
              className="block text-sm font-medium mb-1 text-gray-700"
              htmlFor="thumbnail"
            >
              Thumbnail Image
            </label>
            <input
              type="file"
              id="thumbnail"
              accept="image/*"
              onChange={(e) => setThumbnail(e.target.files[0])}
              className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full bg-blue-600 text-white rounded-md p-2 transition duration-300 ease-in-out transform hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isLoading}
          >
            {isLoading ? "Publishing..." : "Publish Video"}
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default PublishVideo;
