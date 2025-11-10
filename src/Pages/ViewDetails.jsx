import React from "react";
import { Link } from "react-router";
import { FaArrowLeft, FaDollarSign, FaPlus } from "react-icons/fa";
import { BsTag, BsCalendarDate, BsFillFolderFill } from "react-icons/bs";

const ViewDetails = () => {
  const transaction = {
    id: 1,
    type: "Expense",
    category: "Healthcare",
    date: "November 16th, 2025",
    amount: 1000,
    description:
      "Interactive charts (Pie & Bar) with month filtering Profile Management: Update name, photo, email display Protected Routes: Automatic redirect to login for unauthorized access Responsive Design: Mobile-friendly navigation with hamburger menu",
  };

  return (
    <div className="min-h-screen  flex flex-col justify-center items-center p-6">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-2xl p-8 border border-gray-200">
        {/* Back to Transactions */}
        <div className="mb-4">
          <Link
            to="/my-transactions"
            className="flex items-center text-[#2E8B57] hover:underline font-medium w-fit"
          >
            <FaArrowLeft className="mr-2" /> Back to Transactions
          </Link>
        </div>

        {/* Header */}
        <div className="flex justify-between items-center border-b border-[#e0d7c8] pb-4 mb-6">
          <h1 className="text-2xl font-semibold text-gray-500 flex items-center gap-2">
            <span className="text-2xl">⬇</span> Transaction Details
          </h1>
          <p className="text-3xl font-bold text-red-600">
            ${transaction.amount.toFixed(2)}
          </p>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Type */}
          <div className="flex items-center gap-3">
            <div className="bg-yellow-100 text-yellow-500 p-3 rounded-xl shadow-sm">
              <BsTag className="text-xl" />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Type</p>
              <p className="font-semibold text-gray-800">{transaction.type}</p>
            </div>
          </div>

          {/* Category */}
          <div className="flex items-center gap-3">
            <div className="bg-green-100 text-green-400 p-3 rounded-xl shadow-sm">
              <BsFillFolderFill className="text-xl" />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Category</p>
              <p className="font-semibold text-gray-800">
                {transaction.category}
              </p>
            </div>
          </div>

          {/* Date */}
          <div className="flex items-center gap-3">
            <div className="bg-yellow-100 text-yellow-500 p-3 rounded-xl shadow-sm">
              <BsCalendarDate className="text-xl" />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Date</p>
              <p className="font-semibold text-gray-800">{transaction.date}</p>
            </div>
          </div>

          {/* Total */}
          <div className="flex items-center gap-3">
            <div className="bg-green-100 text-green-400 p-3 rounded-xl shadow-sm">
              <FaDollarSign className="text-xl" />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">
                Total for {transaction.category}
              </p>
              <p className="font-semibold text-gray-800">
                ${transaction.amount.toFixed(2)}
              </p>
            </div>
          </div>
        </div>

        {/* Description */}
        <div>
          <h3 className="font-semibold text-gray-800 mb-2">Description</h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            {transaction.description}
          </p>
        </div>

        <hr className="my-6 border-[#e8e3db]" />

        {/* Buttons */}
        <div className="flex flex-wrap gap-4 justify-center">
          <button
            onClick={() => document.getElementById("my_modal_1").showModal()}
            className="btn bg-yellow-500 hover:bg-yellow-600 text-white px-6 rounded-md border-0"
          >
            Edit Transaction
          </button>

          {/* Modal */}
          <dialog id="my_modal_1" className="modal">
            <div className="modal-box  backdrop-blur-md border-0 rounded-2xl">
              <form method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost border-0 hover:text-red-800 absolute right-2 top-2">
                  ✕
                </button>
              </form>

              <h1 className="text-3xl font-bold text-center mb-2">
                Update Transaction
              </h1>
              <p className="text-md text-center mb-5 ">
                Edit your transaction details below
              </p>

              <form className="space-y-5">
                {/* Type */}
                <div>
                  <label className="label">
                    <span className="label-text font-semibold">Type</span>
                  </label>
                  <select className="select select-bordered w-full ">
                    <option>Income</option>
                    <option>Expense</option>
                  </select>
                </div>

                {/* Category */}
                <div>
                  <label className="label">
                    <span className="label-text font-semibold">Category</span>
                  </label>
                  <select className="select select-bordered w-full ">
                    <option>Select category</option>
                    <option>Salary</option>
                    <option>Food</option>
                    <option>Bills</option>
                    <option>Healthcare</option>
                    <option>Entertainment</option>
                    <option>Shopping</option>
                    <option>Other</option>
                  </select>
                </div>

                {/* Amount */}
                <div>
                  <label className="label">
                    <span className="label-text font-semibold">Amount</span>
                  </label>
                  <input
                    type="number"
                    placeholder="Enter amount"
                    className="input input-bordered w-full "
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="label">
                    <span className="label-text font-semibold">Description</span>
                  </label>
                  <textarea
                    placeholder="Enter description"
                    className="textarea textarea-bordered w-full "
                  />
                </div>

                {/* Date */}
                <div>
                  <label className="label">
                    <span className="label-text font-semibold">Date</span>
                  </label>
                  <input
                    type="date"
                    className="input input-bordered w-full "
                  />
                </div>

                {/* Submit Button */}
                <div className="text-center">
                  <button className="btn bg-yellow-500 hover:bg-yellow-600 text-white border-none flex items-center gap-2 mx-auto">
                    Save Changes <FaPlus />
                  </button>
                </div>
              </form>
            </div>
          </dialog>

          <Link
            to="/my-transactions"
            className="btn bg-gray-600 hover:bg-gray-700 text-white  px-6 rounded-md"
          >
            Back to List
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ViewDetails;
