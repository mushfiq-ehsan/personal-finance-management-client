import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useLoaderData, useNavigate } from "react-router";

const UpdateTransaction = () => {
  const navigate = useNavigate();
  const details = useLoaderData();
  const data = details.result;
  const [type, setType] = useState(data?.type || "Income");
  const [category, setCategory] = useState(data?.category || "");
  const categories = {
    Income: ["Salary", "Business", "Investments", "Other"],
    Expense: ["Food", "Health", "Bills", "Entertainment", "Shopping", "Other"],
  };



  useEffect(() => {
    if (data) {
      setType(data.type);
      setCategory(data.category);
    }
  }, [data]);

  const handelSubmit = (e) => {
    e.preventDefault();
    const form = {
      description: e.target.description.value,
      category: category,
      amount: e.target.amount.value,
      type: type,
      date: e.target.date.value ? new Date(e.target.date.value) : new Date(),
    };

    fetch(`http://localhost:3000/transaction/${data._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    })
      .then((res) => res.json())
      .then(() => {
        toast.success("Transaction data updated successfully!");
        navigate(-1);
      })
      .catch(() => {
        toast.error("Failed to update transaction!");
      });
  };

  const handelBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 p-4">
      <div className="bg-base-100 shadow-xl rounded-2xl w-full max-w-md p-8">
        <h2 className="text-2xl font-semibold text-center mb-1 text-yellow-500">
          Update Transaction
        </h2>
        <p className="text-sm text-gray-500 text-center mb-6">
          Edit your transaction details
        </p>

        {/* form */}
        <form onSubmit={handelSubmit} className="space-y-5">
          {/* name */}
          <div>
            <label className="label font-medium">Name</label>
            <input
              type="text"
              defaultValue={data.name}
              placeholder="Name"
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
              value={type}
              className="select select-bordered w-full"
              name="type"
              onChange={(e) => {
                setType(e.target.value);
                setCategory(""); // type বদলালে category reset হবে
              }}
              required
            >
              <option value="Income">Income</option>
              <option value="Expense">Expense</option>
            </select>
          </div>

          {/* category */}
          <div>
            <label className="label">
              <span className="label-text font-semibold">Category</span>
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="select select-bordered w-full"
              name="category"
              required
            >
              <option value="">Select category</option>
              {categories[type]?.map((cat, index) => (
                <option key={index} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* amount */}
          <div>
            <label className="label font-medium">Amount</label>
            <input
              type="number"
              name="amount"
              defaultValue={data.amount}
              className="input input-bordered w-full"
            />
          </div>

          {/* description */}
          <div>
            <label className="label font-medium">Description (Optional)</label>
            <textarea
              defaultValue={data.description}
              name="description"
              placeholder="Add any notes about this transaction..."
              className="textarea textarea-bordered w-full h-24 resize-none"
            ></textarea>
          </div>

          {/* date */}
          <div>
            <label className="label font-medium">Date</label>
            <div className="relative">
              <input
                type="date"
                name="date"
                defaultValue={
                  data.date
                    ? new Date(data.date).toISOString().split("T")[0]
                    : ""
                }
                className="input input-bordered w-full pr-10"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-3">
            <button
              onClick={handelBack}
              type="button"
              className="btn text-white bg-gray-500 hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn text-white bg-yellow-500 hover:bg-yellow-600"
            >
              Update Transaction
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateTransaction;
