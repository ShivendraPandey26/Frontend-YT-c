import React, { useState } from "react";
import toast from "react-hot-toast";
import axiosInstance from "../../Helper/axiosInstance";

const AddTweetSection = ({ isEdit, setIsEdit }) => {
  const [tweet, setTweet] = useState("");
  const [loading, setLoading] = useState(false);
  const maxTweetLength = 280;

  const handleTweetChange = (e) => {
    setTweet(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (tweet.length === 0) {
      toast.error("Tweet cannot be empty.");
      return;
    }

    if (tweet.length > maxTweetLength) {
      toast.error("Tweet exceeds maximum length of 280 characters.");
      return;
    }

    setLoading(true);

    try {
      await axiosInstance.post("/tweets", {
        content: tweet,
      });
      toast.success("Tweet submitted!");
      setTweet("");
      setIsEdit(!isEdit);
      document.getElementById("my_modal_1").close();
    } catch (error) {
      const message =
        error?.response?.data?.message || "Failed to submit tweet.";
      toast.error(message);
      console.error("Error submitting tweet:", message);
    } finally {
      setLoading(false); // Set loading to false when submission is complete
    }
  };

  return (
    <>
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        onClick={() => document.getElementById("my_modal_1").showModal()}
      >
        Add Tweet
      </button>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">Post a Tweet</h3>
          <p>
            Make changes to your profile here. Click save when you're done.{" "}
            <br />
            Press ESC key or click on ✕ button to close
          </p>

          <div className="flex justify-center items-center mt-10">
            <form
              onSubmit={handleSubmit}
              className="w-full max-w-lg p-6 bg-white border rounded shadow-md"
            >
              <h2 className="text-2xl font-bold mb-4">Post a Tweet</h2>

              <textarea
                value={tweet}
                onChange={handleTweetChange}
                maxLength={maxTweetLength}
                rows={4}
                placeholder="What's happening?"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              ></textarea>

              <div className="flex justify-between mt-2 text-sm text-gray-600">
                <span>
                  {tweet.length}/{maxTweetLength} characters
                </span>
              </div>

              <button
                type="submit"
                className={`mt-4 w-full ${
                  loading ? "bg-gray-400" : "bg-blue-500"
                } text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors`}
                disabled={loading}
              >
                {loading ? "Submitting..." : "Tweet"}
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default AddTweetSection;
