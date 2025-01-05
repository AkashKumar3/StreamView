import React from "react";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();
  return (
    <div className="relative bg-gradient-to-br from-red-400 to-yellow-500 text-white flex flex-col items-center justify-center h-screen">
      {/* Background animated circle */}
      <div className="absolute inset-0 flex justify-center items-center">
        <div className="w-96 h-96 rounded-full bg-gradient-to-tl from-blue-500 via-purple-600 to-pink-400 opacity-30 animate-spin-slow"></div>
      </div>
      
      {/* Main content */}
      <div className="relative z-10 text-center">
        <h2 className="text-8xl font-extrabold tracking-wide animate__animated animate__zoomIn">
          404
        </h2>
        <h3 className="text-2xl font-semibold mt-4 animate__animated animate__fadeIn animate__delay-1s">
          Oops! Page Not Found
        </h3>

        <p className="mt-4 text-lg font-light text-gray-100 animate__animated animate__fadeIn animate__delay-2s">
          The page you’re looking for doesn’t exist or has been moved.
        </p>

        {/* Action Button */}
        <button
          onClick={() => {
            navigate(-1);
          }}
          className="mt-6 px-8 py-3 bg-gradient-to-br from-pink-500 via-purple-600 to-blue-500 text-white text-xl font-semibold rounded-full shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 transform"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
