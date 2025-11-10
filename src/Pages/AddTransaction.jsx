import React from "react";
import { FaPlus } from "react-icons/fa";

const AddTransaction = () => {
  return (
    <div className="px-5 bg-base-200 py-20">
      <div className="max-w-3xl mx-auto  p-8 bg-base-100 shadow-xl rounded-2xl ">
        <h2 className="text-2xl font-bold text-center">
          Add New Transaction
        </h2>
        <p className="text-center mb-6">
          Record your income or expense
        </p>
        <form className="space-y-5">
          {/* Name */}
          <div>
            <label className="label">
              <span className="label-text font-semibold">Name</span>
            </label>
            <input
              type="text"
              defaultValue=""
              readOnly
              className="input input-bordered w-full cursor-not-allowed"
            />
          </div>

          {/* Email */}
          <div>
            <label className="label">
              <span className="label-text font-semibold">Email</span>
            </label>
            <input
              type="email"
              defaultValue=""
              readOnly
              className="input input-bordered w-full cursor-not-allowed"
            />
          </div>

          {/* Type */}
          <div>
            <label className="label">
              <span className="label-text font-semibold">Type</span>
            </label>
            <select className="select select-bordered w-full" required>
              <option>Income</option>
              <option>Expense</option>
            </select>
          </div>

          {/* Category */}
          <div>
            <label className="label">
              <span className="label-text font-semibold">Category</span>
            </label>
            <select className="select select-bordered w-full" required>
              <option value="">Select category</option>
              <option>Salary</option>
              <option>Food</option>
              <option>Bills</option>
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
              className="input input-bordered w-full"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="label">
              <span className="label-text font-semibold">Description</span>
            </label>
            <textarea
              placeholder="Enter description"
              className="textarea textarea-bordered w-full"
              required
            />
          </div>

          {/* Date */}
          <div>
            <label className="label">
              <span className="label-text font-semibold">Date</span>
            </label>
            <input type="date" className="input input-bordered w-full" required />
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button className="btn bg-yellow-500 hover:bg-yellow-600 text-white border-none flex items-center gap-2 mx-auto">
              Add Transaction <FaPlus />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTransaction;
