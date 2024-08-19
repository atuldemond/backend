import React from "react";
import { Link } from "react-router-dom"; // Assuming you're using React Router for navigation

const Home = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-200">
      <div className="bg-white flex items-center flex-col p-8 rounded-lg shadow-md w-full max-w-xs">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Welcome to Omegle Clone
        </h1>
        <Link
          to="/chat"
          className="w-full text-center bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
        >
          Start Chat
        </Link>
      </div>
    </div>
  );
};

export default Home;
