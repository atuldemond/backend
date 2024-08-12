import React from "react";
import { Link } from "react-router-dom"; // Adjust if you use another routing library
import { FaRegSadCry } from "react-icons/fa"; // Sad face icon for the error page
import { IoArrowBackCircleSharp } from "react-icons/io5"; // Back arrow icon for navigation

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <div className="text-center">
        <div className="flex items-center justify-center mb-4">
          <FaRegSadCry className="text-6xl text-gray-600" />
        </div>
        <img
          src="https://via.placeholder.com/400x300?text=404+Error" // Replace with your image URL
          alt="404 Error"
          className="w-full max-w-md mx-auto mb-4"
        />
        <h1 className="text-4xl font-bold text-gray-900 mb-2">404</h1>
        <p className="text-xl text-gray-700 mb-2">Oops! Page not found.</p>
        <p className="text-gray-600 mb-4">
          The page you’re looking for doesn’t exist.
        </p>
        <Link
          to="/" // Adjust the path according to your routing setup
          className="flex items-center px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <IoArrowBackCircleSharp className="mr-2" />
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
