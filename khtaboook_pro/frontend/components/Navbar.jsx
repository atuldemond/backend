import React, { useState, useEffect } from "react";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import Home from "./Home";
import About from "./About";
import Services from "./Service";
import Login from "./Login";
import Register from "./Register";
import Profile from "./profile";
import ErrorPage from "./ErrorPage";
import Logout from "./Logout";
import Auth from "./Auth";
import LoadingSpinner from "./LoadingSpinner";
import { checkUserLoggedIn } from "../utils/checkCookies";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

  useEffect(() => {
    checkUserLoggedIn().then((isUserLoggedIn) => {
      setIsLoggedIn(isUserLoggedIn);
    });
  }, [location]);

  return (
    <>
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0  ">
                <h1 className="text-2xl font-bold ">KHATABOOK</h1>
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <Link
                    className="text-gray-600 hover:text-white hover:bg-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                    to="/"
                  >
                    Home
                  </Link>
                  <Link
                    className="text-gray-600 hover:text-white hover:bg-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                    to="/about"
                  >
                    About
                  </Link>
                  <Link
                    className="text-gray-600 hover:text-white hover:bg-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                    to="/services"
                  >
                    Service
                  </Link>
                  {isLoggedIn && (
                    <Link
                      className="text-gray-600 hover:text-white hover:bg-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                      to="/profile"
                    >
                      Profile
                    </Link>
                  )}
                </div>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="ml-4 flex items-center md:ml-6">
                {isLoggedIn ? (
                  <Link
                    className="bg-blue-600 text-white px-3 py-2 rounded-md text-sm font-medium ml-4 hover:bg-blue-700"
                    to="/logout"
                  >
                    Logout
                  </Link>
                ) : (
                  <>
                    <Link
                      className="text-gray-600 hover:text-white hover:bg-gray-900 px-3 py-2 rounded-md text-sm font-medium "
                      to="/login"
                    >
                      Log in
                    </Link>
                    <Link
                      className="bg-blue-600 text-white px-3 py-2 rounded-md text-sm font-medium ml-4 hover:bg-blue-700 animate-pulse"
                      to="/register"
                    >
                      Sign up
                    </Link>
                  </>
                )}
              </div>
            </div>
            <div className="-mr-2 flex md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="bg-gray-200 inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-300 focus:outline-none focus:bg-gray-300 focus:text-gray-900"
              >
                <span className="sr-only">Open main menu</span>
                {isOpen ? (
                  <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16m-7 6h7"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        <div className={`${isOpen ? "block" : "hidden"} md:hidden`}>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              className="text-gray-600 hover:text-white hover:bg-gray-900 block px-3 py-2 rounded-md text-base font-medium"
              to="/"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              className="text-gray-600 hover:text-white hover:bg-gray-900 block px-3 py-2 rounded-md text-base font-medium"
              to="/about"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            <Link
              className="text-gray-600 hover:text-white hover:bg-gray-900 block px-3 py-2 rounded-md text-base font-medium"
              to="/services"
              onClick={() => setIsOpen(false)}
            >
              Service
            </Link>
            {isLoggedIn && (
              <Link
                className="text-gray-600 hover:text-white hover:bg-gray-900 block px-3 py-2 rounded-md text-base font-medium"
                to="/profile"
                onClick={() => setIsOpen(false)}
              >
                Profile
              </Link>
            )}
            {isLoggedIn ? (
              <Link
                className="bg-blue-600 text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700"
                to="/logout"
                onClick={() => setIsOpen(false)}
              >
                Logout
              </Link>
            ) : (
              <>
                <Link
                  className="text-gray-600 hover:text-white hover:bg-gray-900 block px-3 py-2 rounded-md text-base font-medium "
                  to="/login"
                  onClick={() => setIsOpen(false)}
                >
                  Log in
                </Link>
                <Link
                  className="bg-blue-600 text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700 animate-pulse"
                  to="/register"
                  onClick={() => setIsOpen(false)}
                >
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/loading" element={<LoadingSpinner />} />
        <Route path="/profile" element={<Auth element={Profile} />} />
        <Route path="/logout" element={<Auth element={Logout} />} />
        <Route path="/error" element={<ErrorPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
};

export default Navbar;
