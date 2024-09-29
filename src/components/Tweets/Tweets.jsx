import React from "react";
import Layout from "../Layout/Layout";
import {
  FaRegComment,
  FaRetweet,
  FaHeart,
  FaShareSquare,
} from "react-icons/fa";

function Tweets() {
  // Dummy data for 10 tweets
  const tweets = [
    {
      user: {
        avatar:
          "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
        fullName: "John Doe",
        username: "johndoe",
      },
      content: "This is my first tweet!",
      time: "1h",
      comments: 5,
      retweets: 2,
      likes: 20,
    },
    {
      user: {
        avatar:
          "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
        fullName: "Jane Smith",
        username: "janesmith",
      },
      content: "Loving this new platform, can't wait to tweet more!",
      time: "2h",
      comments: 12,
      retweets: 3,
      likes: 30,
    },
    {
      user: {
        avatar:
          "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
        fullName: "Alice Johnson",
        username: "alicejohnson",
      },
      content: "Just another day in paradise.",
      time: "3h",
      comments: 8,
      retweets: 4,
      likes: 15,
    },
    {
      user: {
        avatar:
          "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
        fullName: "Bob Brown",
        username: "bobbrown",
      },
      content: "Learning React is fun!",
      time: "4h",
      comments: 6,
      retweets: 1,
      likes: 25,
    },
    {
      user: {
        avatar:
          "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
        fullName: "Charlie Black",
        username: "charlieblack",
      },
      content: "Just finished a great workout session!",
      time: "5h",
      comments: 10,
      retweets: 3,
      likes: 40,
    },
    {
      user: {
        avatar:
          "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
        fullName: "David White",
        username: "davidwhite",
      },
      content: "Does anyone else love coding at night?",
      time: "6h",
      comments: 9,
      retweets: 2,
      likes: 22,
    },
    {
      user: {
        avatar:
          "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
        fullName: "Emily Green",
        username: "emilygreen",
      },
      content: "A perfect day for a cup of coffee and a good book.",
      time: "7h",
      comments: 4,
      retweets: 1,
      likes: 18,
    },
    {
      user: {
        avatar:
          "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
        fullName: "Frank Blue",
        username: "frankblue",
      },
      content: "The weather is amazing today!",
      time: "8h",
      comments: 5,
      retweets: 3,
      likes: 35,
    },
    {
      user: {
        avatar:
          "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
        fullName: "Grace Yellow",
        username: "graceyellow",
      },
      content: "Had the best meal ever at this new restaurant.",
      time: "9h",
      comments: 3,
      retweets: 1,
      likes: 50,
    },
    {
      user: {
        avatar:
          "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
        fullName: "Henry Orange",
        username: "henryorange",
      },
      content: "Finally mastered React Hooks!",
      time: "10h",
      comments: 7,
      retweets: 2,
      likes: 45,
    },
  ];

  return (
    <Layout>
      <div className="mt-28">
        {tweets.map((tweet, index) => (
          <div key={index} className="p-4 border-b border-gray-300 my-2">
            {/* Tweet Header */}
            <div className="flex items-start space-x-3">
              {/* Avatar */}
              <img
                src={tweet.user.avatar}
                alt="User avatar"
                className="w-12 h-12 rounded-full"
              />

              {/* User Info */}
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold">{tweet.user.fullName}</h4>
                    <span className="text-gray-500">
                      @{tweet.user.username}
                    </span>
                  </div>
                  <span className="text-sm text-gray-500">{tweet.time}</span>
                </div>

                {/* Tweet Content */}
                <p className="text-gray-800 mt-2">{tweet.content}</p>

                {/* Tweet Actions */}
                <div className="flex justify-between items-center mt-3 text-gray-500">
                  <button className="flex items-center space-x-1 hover:text-blue-500">
                    <FaRegComment />
                    <span>{tweet.comments}</span>
                  </button>
                  <button className="flex items-center space-x-1 hover:text-green-500">
                    <FaRetweet />
                    <span>{tweet.retweets}</span>
                  </button>
                  <button className="flex items-center space-x-1 hover:text-red-500">
                    <FaHeart />
                    <span>{tweet.likes}</span>
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
    </Layout>
  );
}

export default Tweets;
