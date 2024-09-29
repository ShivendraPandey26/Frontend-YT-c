import React, { useState, useEffect } from "react";
import {
  FaRegComment,
  FaRetweet,
  FaHeart,
  FaShareSquare,
} from "react-icons/fa";
import AddTweetSection from "./AddTweetSection";
import axiosInstance from "../../Helper/axiosInstance";
import { useParams } from "react-router-dom";

const TweetList = () => {
  const [tweets, setTweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { userId } = useParams();
  const [isEdit, setIsEdit] = useState(false);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  useEffect(() => {
    const fetchTweets = async () => {
      try {
        const response = await axiosInstance.get(`/tweets/user/${userId}`);
        setTweets(response.data.data || []);
      } catch (error) {
        setError("Failed to fetch tweets.");
        console.error("Error fetching tweets:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTweets();
  }, [userId, isEdit]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (tweets.length === 0) {
    return <div>No tweets available.</div>;
  }

  return (
    <div>
      <div className="flex justify-end space-x-2">
        <div className="flex justify-end space-x-2">
          <AddTweetSection isEdit={isEdit} setIsEdit={setIsEdit} />
        </div>
      </div>
      {tweets.map((tweet) => (
        <div key={tweet._id} className="p-4 border-b border-gray-300">
          <div className="flex items-start space-x-3">
            <img
              src={
                tweet.owner.avatar ||
                "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
              } // Fallback image
              alt="User avatar"
              className="w-12 h-12 rounded-full"
            />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold">{tweet.owner.fullName}</h4>
                  <span className="text-gray-500">@{tweet.owner.username}</span>
                </div>
                <span className="text-sm text-gray-500">
                  {formatDate(tweet.createdAt)}
                </span>
              </div>
              <p className="text-gray-800 mt-2">{tweet.content}</p>
              <div className="flex justify-between items-center mt-3 text-gray-500">
                <button className="flex items-center space-x-1 hover:text-blue-500">
                  <FaRegComment />
                  {/* <span>{tweet.comments || 0}</span> */}
                </button>
                <button className="flex items-center space-x-1 hover:text-green-500">
                  <FaRetweet />
                  {/* <span>{tweet.retweets || 0}</span> */}
                </button>
                <button className="flex items-center space-x-1 hover:text-red-500">
                  <FaHeart />
                  {/* <span>{tweet.likes || 0}</span> */}
                </button>
                <button className="hover:text-blue-500">
                  <FaShareSquare />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TweetList;
