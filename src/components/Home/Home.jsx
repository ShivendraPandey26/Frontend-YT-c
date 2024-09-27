import React, { useEffect, useState } from "react";
import VideoCard from "../VideoCard";
import axiosInstance from "../../Helper/axiosInstance";
import toast from "react-hot-toast";
import Layout from "../Layout/Layout";

const Home = () => {
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

  // console.log("Video API Response: ", videoData);

  return (
    <Layout>
      <div className="flex-grow p-4 md:p-6 lg:p-8 lg:mt-20 sm:mt-0 md:mt-20 mt-0">
        {isLoading ? (
          <div className="flex justify-center m-60 h-screen">
            <p className="text-4xl text-gray-800">Loading videos...</p>
          </div>
        ) : (
          <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {videoData.data.length > 0 ? (
              videoData.data.map((item) => (
                <VideoCard key={item._id} video={item} />
              ))
            ) : (
              <div className="text-center text-gray-500">
                No videos available
              </div>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Home;
