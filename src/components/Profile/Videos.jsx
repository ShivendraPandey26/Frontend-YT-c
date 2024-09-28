import React, { useEffect, useState } from "react";
import VideoCard from "./VideoCard";
import toast from "react-hot-toast";
import axiosInstance from "../../Helper/axiosInstance";
import { useParams } from "react-router-dom";

const DummyVideoCard = () => {
  const [videoData, setVideoData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  const { userId } = useParams();

  // Fetch videos

  const fetchVideos = async () => {
    setIsLoading(true);

    try {
      toast.loading("Loading videos...");
      const response = await axiosInstance.get("/video?userId="+`${userId}`);

      setVideoData(response.data);
      toast.success("Videos loaded!");
    } catch (error) {
      toast.error(error.message || "Failed to load videos");
    } finally {
      toast.dismiss();
      setIsLoading(false);
    }
  };

  const onEdit = async (videoDetails) => {
    // console.log("Video details:", videoDetails);
    try {
      const response = await axiosInstance.patch(`/video/${videoDetails?._id}`, {
        title: videoDetails.title,
        description: videoDetails.description,
        // thumbnail: videoDetails.thumbnail,
      });
      
      toast.promise(response, {
        loading: "Updating video...",
        success: "Video updated successfully!",
        error: "Failed to update video.",
      });
    } catch (error) {
      console.error("Error updating video:", error);
      toast.error("Failed to update video.");
    }
    setIsEditing(!isEditing);
  };
  const onDelete = async (videoId) => {
    try {
      const response = await axiosInstance.delete(`/video/${videoId}`);
      toast.success("Video deleted successfully!");
      return response;
    } catch (error) {
      console.error("Error deleting video:", error);
      toast.error("Failed to delete video.");
    }
    setIsEditing(!isEditing);
  };

  useEffect(() => {
    fetchVideos();
  }, [isEditing]);

  // console.log(videoData.data);

  return (
    <>
      {isLoading ? (
        <h1 className="text-3xl p-10">Loading...</h1>
      ) : (
        <VideoCard
          videos={videoData?.data}
          onEdit={onEdit}
          onDelete={onDelete}
          setIsEditing={setIsEditing}
          isEditing={isEditing}
        />
      )}
    </>
  );
};

export default DummyVideoCard;
