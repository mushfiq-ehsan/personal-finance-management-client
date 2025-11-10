import React from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
import { Link } from "react-router";

const Banner = () => {
  return (
    <section
      className="relative flex flex-col text-white md:flex-row items-center justify-between px-8 md:px-20 py-24 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage:
          "url('https://i.ibb.co.com/1xCpYmQ/Gemini-Generated-Image-p67njrp67njrp67n.png')",
      }}
    >
      <div className="absolute inset-0 bg-white/0 backdrop-blur-[2px]"></div>

      <div className="relative z-10 md:w-1/2 text-center md:text-left space-y-5">
        <h1 className="text-4xl md:text-6xl font-bold  leading-tight">
          Take Control of Your{" "}
          <span className="bg-[#3adc9e] bg-clip-text text-transparent">
            Financial Future
          </span>
        </h1>

        <p className=" text-lg max-w-lg mx-auto md:mx-0">
          Track expenses, manage budgets, and achieve your financial goals with{" "}
          <span className="font-semibold">FinEase</span> — your personal finance
          companion.
        </p>

        <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-4">
          <Link to='/add-transaction' className="btn bg-yellow-500 hover:bg-yellow-600 text-white border-none">
            Get Started Free <FaLongArrowAltRight />
          </Link>
        </div>
      </div>
      <div className="relative z-10 hidden md:block md:w-1/2"></div>
    </section>
  );
};

export default Banner;
