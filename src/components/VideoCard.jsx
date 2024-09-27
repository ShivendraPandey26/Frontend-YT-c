import React from "react";
import { useNavigate } from "react-router-dom";

const VideoCard = ({ video }) => {
  // Convert video duration into minutes and seconds format
  const formatDuration = (duration) => {
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };
  const navigate = useNavigate();

  const playVideo = () => {
    const videoId = video?._id;
    navigate(`/watch/${videoId}`, { replace: true });
  };

  return (
    <div
      className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white hover:shadow-2xl transition-shadow duration-300"
      onClick={playVideo}
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
            <p className="text-gray-600 text-sm">{video.videoBy?.fullName}</p>{" "}
          </div>
        </div>

        <p className="text-gray-700 mb-1">{video.description}</p>
        <p className="text-gray-500 text-sm">
          {video.views} views •{" "}
          {video.isPublished ? "Published" : "Not Published"}
        </p>
      </div>
    </div>
  );
};

export default VideoCard;
