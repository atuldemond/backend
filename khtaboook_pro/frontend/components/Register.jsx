import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Footer from "./Footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner"; // Import LoadingSpinner
// Import DOMAIN_NAME from process.env
const DOMAIN_NAME = process.env.DOMAIN_NAME; // Import DOMAIN_NAME from process.env
// import "./Register.css"; // Create a CSS file for additional styles

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  username: yup.string().required("Username is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // State to track loading status

  const onSubmit = async (data) => {
    setIsLoading(true); // Set loading to true when submitting form
    try {
      const response = await axios.post(
        `${DOMAIN_NAME}/database/register`,
        data
      );
      if (response.status === 201) {
        setPopupMessage("You are successfully registered in Khatabook.");
        setIsSuccess(true);
        setShowPopup(true);
        setTimeout(() => {
          navigate("/login");
        }, 5000); // Redirect after 5 seconds
      }
    } catch (error) {
      setPopupMessage("Registration failed. Please try again.");
      setIsSuccess(false);
      setShowPopup(true);
      console.error("Registration failed:", error);
    } finally {
      setIsLoading(false); // Set loading to false after the operation
    }
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="w-full max-w-md p-8 space-y-8 bg-gray-800 rounded-lg shadow-md">
          <h2 className="text-3xl font-extrabold text-center text-white">
            Khatabook Sign-up
          </h2>
          <form
            className="mt-8 space-y-6"
            method="POST"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="sr-only">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  {...register("name")}
                  className={`relative block w-full px-3 py-2 border ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  } rounded-md placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                  placeholder="Name"
                />
                {errors.name && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.name.message}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="email" className="sr-only">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  {...register("email")}
                  className={`relative block w-full px-3 py-2 border ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  } rounded-md placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                  placeholder="Email"
                />
                {errors.email && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="username" className="sr-only">
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  {...register("username")}
                  className={`relative block w-full px-3 py-2 border ${
                    errors.username ? "border-red-500" : "border-gray-300"
                  } rounded-md placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                  placeholder="Username"
                />
                {errors.username && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.username.message}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  {...register("password")}
                  className={`relative block w-full px-3 py-2 border ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  } rounded-md placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                  placeholder="Password"
                />
                {errors.password && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md group hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {isLoading ? <LoadingSpinner /> : "Register"}
              </button>
            </div>
          </form>
        </div>
      </div>
      {showPopup && (
        <div className="popup fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="popup-inner bg-white p-8 rounded-md shadow-md text-center">
            <h2 className="text-xl font-bold mb-4">
              {isSuccess ? "Success" : "Error"}
            </h2>
            <p className="text-gray-700 mb-4">{popupMessage}</p>
            {!isSuccess && (
              <button
                onClick={() => setShowPopup(false)}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                Close
              </button>
            )}
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default Register;
