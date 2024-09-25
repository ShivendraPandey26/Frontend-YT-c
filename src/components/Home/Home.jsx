import React from "react";

const Home = () => {
  // Sample video data
  const videos = [
    {
      id: 1,
      title: "Learn React in 30 Minutes",
      channel: "React Academy",
      views: "1.2M views",
      date: "1 week ago",
      thumbnail: "https://via.placeholder.com/320x180.png?text=Video+1",
    },
    {
      id: 2,
      title: "JavaScript for Beginners",
      channel: "Coding Ninjas",
      views: "500K views",
      date: "2 weeks ago",
      thumbnail: "https://via.placeholder.com/320x180.png?text=Video+2",
    },
    {
      id: 3,
      title: "CSS Flexbox Tutorial",
      channel: "Design Master",
      views: "800K views",
      date: "3 weeks ago",
      thumbnail: "https://via.placeholder.com/320x180.png?text=Video+3",
    },
    // Add more video objects here
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-white shadow">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <h1 className="text-xl font-bold text-red-600">YouTube Clone</h1>
          <input
            type="text"
            placeholder="Search"
            className="flex-grow mx-4 px-4 py-2 border border-gray-300 rounded-lg"
          />
          <button className="bg-red-600 text-white px-4 py-2 rounded-lg">
            Search
          </button>
        </div>
      </nav>

      {/* Video Grid */}
      <div className="max-w-6xl mx-auto p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {videos.map((video) => (
          <div
            key={video.id}
            className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-200"
          >
            <img
              src={video.thumbnail}
              alt={video.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="font-semibold text-lg">{video.title}</h3>
              <p className="text-gray-600">{video.channel}</p>
              <p className="text-gray-500 text-sm">
                {video.views} • {video.date}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
