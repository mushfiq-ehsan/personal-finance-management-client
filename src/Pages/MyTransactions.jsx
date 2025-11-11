import {
  FaArrowDown,
  FaArrowUp,
  FaEye,
  FaEdit,
  FaTrashAlt,
  FaPlus,
} from "react-icons/fa";
import { Link, useLoaderData } from "react-router";



const MyTransactions = () => {
  const data = useLoaderData()
  console.log(data);
  




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
          {data.map((data) => (
            <div
              key={data.id}
              className=" card  shadow-md border border-gray-200 bg-white hover:shadow-lg transition-all duration-200"
            >
              <div className="card-body">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 font-semibold text-gray-800 text-lg">
                    {data.type === 'income' ? (
                      <FaArrowUp className="text-green-500" />
                    ) : (
                      <FaArrowDown className="text-red-500" />
                    )}
                    {data.title}
                  </div>
                  <span
                    className={`font-bold ${
                      data.income ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {data.income ? `$${data.amount}.00` : `$${data.amount}.00`}
                  </span>
                </div>

                <p className="text-sm text-gray-800">
                  <span className="font-semibold">Type:</span> {data.type}
                </p>
                <p className="text-sm text-gray-800">
                  <span className="font-semibold">Date:</span> {data.date}
                </p>
                <p className="text-sm line-clamp-2 text-gray-800">{data.description}</p>

                <div className="flex items-center gap-3 mt-4 text-gray-800">
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
