import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import axiosInstance from "../../Helper/axiosInstance";
import Layout from "../Layout/Layout";

function Watch() {
  const { videoId } = useParams();
  const [video, setVideo] = useState([]);

  // Fetch video details from API
  const getVideoDetails = async () => {
    try {
      const response = await axiosInstance.get(`/video/${videoId}`);
      setVideo(response.data.data);
    } catch (error) {
      console.error("Error fetching video details: ", error.message);
    }
  };

  useEffect(() => {
    getVideoDetails();
    // Cleanup function
    return () => {
      console.log("Cleanup function called");
    };
  }, []);

  return (
    <Layout>
      <div className="m-5 mt-32 ">
      <div className="relative w-[70vw] h-[70vh] mb-4">
        <ReactPlayer
          url={video.videoFile}
          controls={true}
          width="100%"
          height="100%"
          className="rounded-lg"
          config={{
            file: {
              attributes: {
                controlsList: "nodownload",
                preload: "metadata",
                muted: false,
                playsInline: true,
                crossOrigin: "anonymous",
                poster: video.thumbnail,
                loop: false,
                autoPlay: false,
              },
            },
          }}
        />
      </div>

      {/* Video Title */}
      <h2 className="text-2xl font-bold mt-2 mb-1 text-start">
        {video.title}
      </h2>
      <h2 className="text-lg mt-2 mb-1 text-start">
        {video.description}
      </h2>

      </div>

    </Layout>
  );
}

export default Watch;
