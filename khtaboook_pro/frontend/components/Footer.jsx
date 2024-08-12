import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white text-gray-900">
      <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:justify-between">
          <div className="mb-6 md:mb-0">
            <h2 className="text-2xl font-bold animate-pulse">KHATABOOK</h2>
          </div>
          <div className="flex flex-col md:flex-row md:space-x-12">
            <div className="mb-6 md:mb-0">
              <h3 className="font-semibold">Resources</h3>
              <ul>
                <li>
                  <a href="#" className="hover:underline">
                    KHATABOOK
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Tailwind CSS
                  </a>
                </li>
              </ul>
            </div>
            <div className="mb-6 md:mb-0">
              <h3 className="font-semibold">Follow Us</h3>
              <ul>
                <li>
                  <a href="#" className="hover:underline">
                    GitHub
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Discord
                  </a>
                </li>
              </ul>
            </div>
            <div className="mb-6 md:mb-0">
              <h3 className="font-semibold">Legal</h3>
              <ul>
                <li>
                  <a href="#" className="hover:underline">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Terms & Conditions
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-8 flex flex-col md:flex-row md:justify-between items-center">
          <p className="text-sm">
            &copy; 2023 KHATABOOK™. All Rights Reserved.
          </p>
          <div className="mt-4 md:mt-0 flex space-x-4">
            <a href="#" className="hover:underline">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="#" className="hover:underline">
              <i className="fab fa-discord"></i>
            </a>
            <a href="#" className="hover:underline">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="hover:underline">
              <i className="fab fa-github"></i>
            </a>
            <a href="#" className="hover:underline">
              <i className="fas fa-globe"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
