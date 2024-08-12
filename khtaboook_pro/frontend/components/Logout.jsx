import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// Import process from process

const Logout = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const performLogout = async () => {
      try {
        await axios.get(`${process.env.DOMAIN_NAME}/database/logout`, {
          withCredentials: true,
          headers: {
            "Cache-Control": "no-cache, no-store, must-revalidate",
            Pragma: "no-cache",
            Expires: "0",
          },
        });

        // Clear all cookies from the site
        document.cookie.split(";").forEach((c) => {
          document.cookie = c
            .replace(/^ +/, "")
            .replace(
              /=.*/,
              "=;expires=" + new Date().toUTCString() + ";path=/"
            );
        });

        // Clear localStorage and sessionStorage
        localStorage.clear();
        sessionStorage.clear();

        setMessage("You have been logged out successfully.");
        setIsError(false);
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } catch (error) {
        console.error("Logout failed:", error);
        const statusCode = error.response ? error.response.status : "Unknown";
        setMessage(
          `An error occurred while logging out. Status code: ${statusCode}`
        );
        setIsError(true);
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    };

    performLogout();
  }, [navigate]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div className="bg-white rounded-lg p-8 max-w-sm w-full mx-4 sm:mx-auto">
        <div
          className={`text-2xl font-bold mb-4 ${
            isError ? "text-red-600" : "text-green-600"
          }`}
        >
          {isError ? "Logout Error" : "Logging Out"}
        </div>
        <p className="text-gray-700 mb-4">{message}</p>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-blue-600 h-2.5 rounded-full animate-pulse"
            style={{ width: "100%" }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Logout;
