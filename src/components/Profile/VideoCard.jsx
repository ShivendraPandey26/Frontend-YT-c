import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash, FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../Helper/axiosInstance";
import toast from "react-hot-toast";

const VideoCard = ({ videos, onEdit, onDelete, setIsEditing, isEditing }) => {
  // Convert video duration into minutes and seconds format
  const formatDuration = (duration) => {
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const navigate = useNavigate();
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnailFile, setThumbnailFile] = useState(null);

  const playVideo = (videoId) => {
    navigate(`/watch/${videoId}`, { replace: true });
  };

  //   const handleThumbnailChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setThumbnailFile(reader.result); // Set the data URL for the thumbnail
  //     };
  //     reader.readAsDataURL(file);
  //   } else {
  //     setThumbnailFile(null); // Reset if no file is selected
  //   }
  // };

  const openEditModal = (video) => {
    setSelectedVideo(video);
    setTitle(video.title);
    setDescription(video.description);
    setThumbnailFile(video.thumbnail);
    document.getElementById("my_modal_2").showModal();
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedVideo = {
      ...selectedVideo,
      title,
      description,
      thumbnail: thumbnailFile,
    };
    onEdit(updatedVideo);
    document.getElementById("my_modal_2").close();
    setIsEditing(!isEditing);
  };

  const handleIsPublished = async (videoId) => {
    try {
      const loadingToast = toast.loading("Toggling publish status...");
      const response = await axiosInstance.patch(
        `/video/toggle/publish/${videoId}`
      );
      const updatedPublishStatus = response.data.data.isPublished;

      // console.log("Updated publish status:", updatedPublishStatus);
      if (updatedPublishStatus) {
        toast.success("Video published successfully!", { id: loadingToast });
      } else {
        toast.success("Video set to private successfully!", {
          id: loadingToast,
        });
      }
    } catch (error) {
      console.error("Error toggling video publish status: ", error.message);
      toast.error(`Error toggling publish status: ${error.message}`);
    }
    setIsEditing(!isEditing);
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {videos.map((video) => (
          <div
            key={video._id}
            className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white hover:shadow-2xl transition-shadow duration-300"
            onClick={() => playVideo(video._id)}
          >
            {/* Video Thumbnail */}
            <div className="relative">
              <img
                src={video.thumbnail}
                alt={`Thumbnail for ${video.title}`}
                className="w-full h-48 object-cover"
              />
              {/* Video Duration */}
              <span className="absolute bottom-2 right-2 bg-black text-white text-xs font-semibold p-1 rounded">
                {formatDuration(video.duration)}
              </span>
            </div>

            {/* Video Details */}
            <div className="p-4">
              <div className="flex items-center gap-3 mb-2">
                <img
                  src={video.videoBy?.avatar}
                  alt={`${video.videoBy?.fullName}'s avatar`}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {video.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {video.videoBy?.fullName}
                  </p>
                </div>
              </div>

              <p className="text-gray-700 mb-1">{video.description}</p>
              <p className="text-gray-500 text-sm">
                {video.views} views •{" "}
                {video.isPublished ? "Published" : "Not Published"}
              </p>

              {/* Action Buttons */}
              <div className="flex justify-between mt-4">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    openEditModal(video);
                  }}
                  className="flex items-center text-blue-500 hover:text-blue-700"
                >
                  <FaEdit className="mr-2" /> Edit
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(video?._id);
                  }}
                  className="flex items-center text-red-500 hover:text-red-700"
                >
                  <FaTrash className="mr-2" /> Delete
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleIsPublished(video?._id);
                  }}
                  className="flex items-center text-red-500 hover:text-red-700"
                >
                  {video.isPublished ? (
                    <span className="flex items-center">
                      <FaRegEyeSlash className="mr-2" /> Private
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <FaRegEye className="mr-2" /> Public
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Video Modal */}
      <dialog id="my_modal_2" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">Edit Video</h3>
          <p>
            Make changes to your video here. Click save when you're done. <br />
            Press ESC key or click on ✕ button to close
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Title Field */}
            <div>
              <label
                className="block text-gray-700 font-semibold mb-2"
                htmlFor="title"
              >
                Title
              </label>
              <input
                id="title"
                type="text"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            {/* Description Field */}
            <div>
              <label
                className="block text-gray-700 font-semibold mb-2"
                htmlFor="description"
              >
                Description
              </label>
              <textarea
                id="description"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            {/* Thumbnail File Field */}
            {/* <div>
              <label className="block text-gray-700 font-semibold mb-2" htmlFor="thumbnail">
                Thumbnail File
              </label>
              <input
                id="thumbnail"
                type="file"
                accept="image/*"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                onChange={handleThumbnailChange} 
              />
              {thumbnailFile && (
                <img
                  src={thumbnailFile}
                  alt="Thumbnail Preview"
                  className="mt-4 w-32 h-32 object-cover rounded"
                />
              )}
            </div> */}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-2 px-4 rounded-lg text-white font-semibold bg-blue-500 hover:bg-blue-600 transition duration-300 ease-in-out"
            >
              Save Changes
            </button>
          </form>
        </div>
      </dialog>
    </>
  );
};

export default VideoCard;
