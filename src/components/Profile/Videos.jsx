import React, { useEffect, useState } from "react";
import VideoCard from "./VideoCard";
import toast from "react-hot-toast";
import axiosInstance from "../../Helper/axiosInstance";

const DummyVideoCard = () => {
  const [videoData, setVideoData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchVideos();
  }, []);

  // Fetch videos

  const fetchVideos = async () => {
    setIsLoading(true);

    try {
      toast.loading("Loading videos...");
      const response = await axiosInstance.get("/video");

      setVideoData(response.data);
      toast.success("Videos loaded!");
    } catch (error) {
      toast.error(error.message || "Failed to load videos");
    } finally {
      toast.dismiss();
      setIsLoading(false);
    }
  };

  const onEdit = () => {};
  const onDelete = async (videoId) => {
    try {
      const response = await toast.promise(
        axiosInstance.delete(`/video/${videoId}`), 
        {
          loading: "Deleting video...",
          success: "Video deleted successfully!",
          error: "Failed to delete video.",
        }
      );
      return response; // Return the response if needed
    } catch (error) {
      console.error("Error deleting video:", error); 
      toast.error("Failed to delete video.");
    }
  };

  console.log(videoData.data);

  return (
    <>
      {isLoading ? (
        <h1 className="text-3xl p-10">Loading...</h1>
      ) : (
        <VideoCard
          videos={videoData?.data}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      )}
    </>
  );
};

export default DummyVideoCard;
