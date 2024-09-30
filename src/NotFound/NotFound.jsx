import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center p-8">
        <h1 className="text-5xl font-bold text-red-600">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mt-4">
          Page Not Found
        </h2>
        <p className="mt-2 text-gray-600">
          Sorry, the page you are looking for does not exist.
        </p>
        <Link
          to="/"
          className="mt-4 inline-block text-blue-500 hover:underline"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
