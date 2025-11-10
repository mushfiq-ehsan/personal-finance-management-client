import {
  FaArrowDown,
  FaArrowUp,
  FaEye,
  FaEdit,
  FaTrashAlt,
  FaPlus,
} from "react-icons/fa";
import { Link } from "react-router";

const transactions = [
  {
    id: 1,
    title: "Healthcare",
    type: "Expense",
    date: "November 16th, 2025",
    description:
      "Interactive charts (Pie & Bar) with month filtering Profile Management: Update name, photo, email...",
    amount: 1000,
    income: false,
  },
  {
    id: 2,
    title: "Investment",
    type: "Income",
    date: "November 11th, 2025",
    description:
      "Interactive charts (Pie & Bar) with month filtering Profile Management: Update name, photo, email...",
    amount: 5000,
    income: true,
  },
  {
    id: 3,
    title: "Gift",
    type: "Income",
    date: "November 9th, 2025",
    description:
      "Interactive charts (Pie & Bar) with month filtering Profile Management: Update name, photo, email...",
    amount: 1500,
    income: true,
  },
  {
    id: 4,
    title: "Education",
    type: "Expense",
    date: "November 9th, 2025",
    description:
      "Interactive charts (Pie & Bar) with month filtering Profile Management: Update name, photo, email...",
    amount: 1000,
    income: false,
  },
  {
    id: 5,
    title: "Shopping",
    type: "Expense",
    date: "November 8th, 2025",
    description:
      "Interactive charts (Pie & Bar) with month filtering Profile Management: Update name, photo, email...",
    amount: 1500,
    income: false,
  },
  {
    id: 6,
    title: "Freelance",
    type: "Income",
    date: "November 1st, 2025",
    description:
      "Interactive charts (Pie & Bar) with month filtering Profile Management: Update name, photo, email...",
    amount: 10000,
    income: true,
  },
];

const MyTransactions = () => {
  return (
    <div>
      <div className=" bg-base-200 p-5 ">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-3">
          <h1 className="text-2xl font-bold">My Transactions</h1>

          <div className="flex  gap-3 items-center">
            <select className="select select-bordered select-sm">
              <option>Sort by Date</option>
              <option>Sort by Amount</option>
            </select>

            <select className="select select-bordered select-sm">
              <option>Descending</option>
              <option>Ascending</option>
            </select>

            <Link
              to="/add-transaction"
              className="btn bg-yellow-500 hover:bg-yellow-600 text-white btn-sm"
            >
              + Add Transaction
            </Link>
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {transactions.map((item) => (
            <div
              key={item.id}
              className=" card bg-base-100 shadow-md border border-gray-200 hover:shadow-lg transition-all duration-200"
            >
              <div className="card-body">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 font-semibold text-lg">
                    {item.income ? (
                      <FaArrowUp className="text-green-500" />
                    ) : (
                      <FaArrowDown className="text-red-500" />
                    )}
                    {item.title}
                  </div>
                  <span
                    className={`font-bold ${
                      item.income ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {item.income ? `$${item.amount}.00` : `$${item.amount}.00`}
                  </span>
                </div>

                <p className="text-sm">
                  <span className="font-semibold">Type:</span> {item.type}
                </p>
                <p className="text-sm">
                  <span className="font-semibold">Date:</span> {item.date}
                </p>
                <p className="text-sm line-clamp-2">{item.description}</p>

                <div className="flex items-center gap-3 mt-4">
                  <Link
                    to="/view-details"
                    className="btn btn-outline btn-sm flex-1"
                  >
                    <FaEye className="mr-2" /> View
                  </Link>
                  <button
                    onClick={() =>
                      document.getElementById("my_modal_1").showModal()
                    }
                    className="btn btn-outline btn-sm flex-1"
                  >
                    <FaEdit className="mr-2" /> Edit
                  </button>

                  {/* modal */}
                  <dialog id="my_modal_1" className="modal">
                    <div className="modal-box  backdrop-blur-md border-0 rounded-2xl">
                      <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost border-0 hover:text-red-800 absolute right-2 top-2">
                          ✕
                        </button>
                      </form>

                      <h1 className="text-3xl font-bold text-center mb-5">
                        Update Transaction
                      </h1>
                      <p className="text-md font-bold text-center mb-5">
                        Edit your transaction details
                      </p>

                      <form className="space-y-5">
                        {/* Type */}
                        <div>
                          <label className="label">
                            <span className="label-text font-semibold">
                              Type
                            </span>
                          </label>
                          <select
                            className="select select-bordered w-full"
                            required
                          >
                            <option>Income</option>
                            <option>Expense</option>
                          </select>
                        </div>

                        {/* Category */}
                        <div>
                          <label className="label">
                            <span className="label-text font-semibold">
                              Category
                            </span>
                          </label>
                          <select
                            className="select select-bordered w-full"
                            required
                          >
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
                            <span className="label-text font-semibold">
                              Amount
                            </span>
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
                            <span className="label-text font-semibold">
                              Description
                            </span>
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
                            <span className="label-text font-semibold">
                              Date
                            </span>
                          </label>
                          <input
                            type="date"
                            className="input input-bordered w-full"
                            required
                          />
                        </div>

                        {/* Submit Button */}
                        <div className="text-center">
                          <button className="btn bg-yellow-500 hover:bg-yellow-600 text-white border-none flex items-center gap-2 mx-auto">
                            Add Transaction <FaPlus />
                          </button>
                        </div>
                      </form>
                    </div>
                  </dialog>

                  <button className="btn btn-error btn-sm text-white">
                    <FaTrashAlt />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyTransactions;
