import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const VideoCard = ({ videos, onEdit, onDelete }) => {
  // Convert video duration into minutes and seconds format
  const formatDuration = (duration) => {
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const navigate = useNavigate();

  const playVideo = (videoId) => {
    navigate(`/watch/${videoId}`, { replace: true });
  };

//   console.log(videos);
  

  return (
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
                  onEdit(video?._id);
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
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VideoCard;
