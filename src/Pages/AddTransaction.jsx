import { use, useState } from "react";
import { FaPlus, FaWallet } from "react-icons/fa";
import { AuthContext } from "../Context/AuthContext";
import toast from "react-hot-toast";
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
      date: e.target.date.value,
      email: user.email,
      name: user.displayName,
    };
    console.log(form.date);
    
    e.target.reset();

    fetch("http://localhost:3000/transaction", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        toast.success('Successfully toasted!')

      })
      .catch((err) => {
        console.log(err);
      });
  };

  loading && <Loading/>

  // if (loading) {
  //   return <Loading/>
  // }


  return (
    <div className="px-5 bg-base-200 py-20">
      <div className="max-w-3xl mx-auto  p-8 bg-base-100 shadow-xl rounded-2xl ">
        <p className="flex justify-center mb-2">
          <FaWallet className="text-5xl text-yellow-500" />
        </p>
        <h2 className="text-2xl font-bold text-center">Add New Transaction</h2>
        <p className="text-center mb-6">Record your income or expense</p>
        <form onSubmit={handelSubmit} className="space-y-5">
          {/* name */}
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

          {/* email */}
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

          {/* type */}
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

          {/* category */}
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

          {/* amount */}
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

          {/* date */}
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

          {/* button */}
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
