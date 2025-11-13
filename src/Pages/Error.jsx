import React from 'react';
import Lottie from "lottie-react";
import animationData from "../assets/404-animation.json";

const Error = () => {
    return (
         <div className="min-h-screen flex flex-col items-center justify-center bg-white  text-gray-900  px-4">
      <div className="w-64 h-64 md:w-96 md:h-96">
        <Lottie animationData={animationData} loop={true} />
      </div>
      <div className="text-center mt-6">
        <h1 className="text-4xl font-bold mb-2">404</h1>
        <h2 className="text-2xl font-semibold mb-2">Looks like you're lost</h2>
        <p className="mb-6">The page you are looking for is not available!</p>
        <button
          className="btn btn-primary"
          onClick={() => (window.location.href = "/")}
        >
          Go to Home
        </button>
      </div>
    </div>
    );
};

export default Error;