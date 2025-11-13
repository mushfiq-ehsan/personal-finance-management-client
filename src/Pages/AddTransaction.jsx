import { motion } from "framer-motion";
import { use, useState } from "react";
import toast from "react-hot-toast";
import { FaPlus, FaWallet } from "react-icons/fa";
import Swal from "sweetalert2";
import { AuthContext } from "../Context/AuthContext";
import Loading from "./Loading";

const AddTransaction = () => {
  const { user, loading } = use(AuthContext);
  const [type, setType] = useState("Income");

  const categories = {
    Income: ["Salary", "Business", "Investments", "Other"],
    Expense: ["Food", "Health", "Bills", "Entertainment", "Shopping", "Other"],
  };

  const handelSubmit = (e) => {
    e.preventDefault();
    const form = {
      description: e.target.description.value,
      category: e.target.category.value,
      amount: parseFloat(e.target.amount.value),
      type: e.target.type.value,
       date: e.target.date.value
      ? new Date(e.target.date.value)
      : new Date(),
      email: user.email,
      name: user.displayName,
    };

    e.target.reset();

    fetch("https://personal-finance-management-two.vercel.app/transaction", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        authorization : `Bearer ${user.accessToken}`
      },
      body: JSON.stringify(form),
    })
      .then((res) => res.json())
      .then((data) =>
        Swal.fire({
          title: "Excellent!",
          text: "Transaction added successfully!",
          icon: "success",
        })
      )
      .catch(() => toast.error("Transaction could not be added."));
  };

  if (loading) return <Loading />;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="px-5 bg-base-200 py-20"
    >
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="max-w-3xl mx-auto p-8 bg-base-100 shadow-xl rounded-2xl"
      >
        <motion.p
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="flex justify-center mb-2"
        >
          <FaWallet className="text-5xl text-yellow-500" />
        </motion.p>

        <h2 className="text-2xl font-bold text-center mb-1">
          Add New Transaction
        </h2>
        <p className="text-center mb-6 text-gray-500">
          Record your income or expense
        </p>

        <motion.form
          onSubmit={handelSubmit}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="space-y-5"
        >
          {/* name or email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="label">
                <span className="label-text font-semibold">Name</span>
              </label>
              <input
                type="text"
                name="name"
                defaultValue={user.displayName}
                className="input input-bordered w-full cursor-not-allowed"
                disabled
              />
            </div>
            <div>
              <label className="label">
                <span className="label-text font-semibold">Email</span>
              </label>
              <input
                type="email"
                name="email"
                defaultValue={user.email}
                className="input input-bordered w-full cursor-not-allowed"
                disabled
              />
            </div>
          </div>

          {/* type or category */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
            <div>
              <label className="label">
                <span className="label-text font-semibold">Type</span>
              </label>
              <select
                className="select select-bordered w-full"
                name="type"
                value={type}
                onChange={(e) => setType(e.target.value)}
                required
              >
                <option>Income</option>
                <option>Expense</option>
              </select>
            </div>
            <div>
              <label className="label">
                <span className="label-text font-semibold">Category</span>
              </label>
              <select
                className="select select-bordered w-full"
                name="category"
                required
              >
                <option value="">Select category</option>
                {categories[type].map((cat, index) => (
                  <option key={index} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* amount or date */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="label">
                <span className="label-text font-semibold">Amount</span>
              </label>
              <input
                type="number"
                placeholder="Enter amount"
                className="input input-bordered w-full"
                name="amount"
                required
              />
            </div>
            <div>
              <label className="label">
                <span className="label-text font-semibold">Date</span>
              </label>
              <input
                type="date"
                className="input input-bordered w-full"
                name="date"
              />
            </div>
          </div>

          {/* description */}
          <div>
            <label className="label">
              <span className="label-text font-semibold">Description</span>
            </label>
            <textarea
              placeholder="Enter description"
              className="textarea textarea-bordered w-full"
              name="description"
              required
            />
          </div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <button className="btn bg-yellow-500 hover:bg-yellow-600 text-white border-none flex items-center gap-2 mx-auto w-full md:w-auto justify-center">
              Add Transaction <FaPlus />
            </button>
          </motion.div>
        </motion.form>
      </motion.div>
    </motion.div>
  );
};

export default AddTransaction;
