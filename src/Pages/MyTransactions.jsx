import { FaArrowDown, FaArrowUp, FaEdit, FaEye, FaPlus } from "react-icons/fa";
import { MdOutlineDeleteForever } from "react-icons/md";
import { Link, useLoaderData } from "react-router";
import Swal from "sweetalert2";
import { useState } from "react";

const MyTransactions = () => {
  const loadedData = useLoaderData();
  const [data, setData] = useState(loadedData);
  const [sortOrder, setSortOrder] = useState("Descending"); 




  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3000/transaction/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((response) => {
            if (response.deletedCount > 0 || response.success) {
              const remaining = data.filter((item) => item._id !== id);
              setData(remaining);

              Swal.fire({
                title: "Deleted!",
                text: "Your transaction has been deleted.",
                icon: "success",
              });
            }
          })
          .catch((err) => console.log(err));
      }
    });
  };


  const handleSort = (e) => {
    const order = e.target.value;
    setSortOrder(order);

    let sorted = [...data];
    if (order === "Ascending") {
      sorted.sort((a, b) => a.amount - b.amount);
    } else {
      sorted.sort((a, b) => b.amount - a.amount);
    }

    setData(sorted);
  };

  return (
    <div className="bg-base-200 p-5 min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-3">
        <h1 className="text-2xl font-bold">My Transactions</h1>

        <div className="flex gap-3 items-center">
          <select
            className="select select-bordered select-sm"
            value={sortOrder}
            onChange={handleSort}
          >
            <option>Descending</option>
            <option>Ascending</option>
          </select>

          <Link
            to="/add-transaction"
            className="btn bg-yellow-500 hover:bg-yellow-600 text-white btn-sm"
          >
            <FaPlus className="mr-2" /> Add Transaction
          </Link>
        </div>
      </div>

      {data.length > 0 ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {data.map((transaction) => (
            <div
              key={transaction._id}
              className="card shadow-md border border-gray-200 bg-white hover:shadow-lg transition-all duration-200"
            >
              <div className="card-body">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 font-semibold text-gray-800 text-lg">
                    {transaction.type?.toLowerCase() === "income" ? (
                      <FaArrowUp className="text-green-500" />
                    ) : (
                      <FaArrowDown className="text-red-500" />
                    )}
                    <span className="capitalize">{transaction.type}</span>
                  </div>

                  <span
                    className={`text-3xl font-bold ${
                      transaction.type?.toLowerCase() === "income"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    ${transaction.amount}.00
                  </span>
                </div>
                <p className="text-sm text-gray-800">
                  <span className="font-semibold">Category:</span>{" "}
                  {transaction.category}
                </p>
                <p className="text-sm text-gray-800">
                  <span className="font-semibold">Date:</span>{" "}
                  {transaction.date
                    ? new Date(transaction.date).toISOString().split("T")[0]
                    : ""}
                </p>
                <p className="text-sm text-gray-800 line-clamp-2">
                  {transaction.description}
                </p>

                {/* buttons */}
                <div className="flex items-center gap-3 mt-4 text-gray-800">
                  <Link
                    to={`/view-details/${transaction._id}`}
                    className="btn btn-outline btn-sm flex-1"
                  >
                    <FaEye className="mr-2" /> View
                  </Link>

                  <Link
                    to={`/update-transaction/${transaction._id}`}
                    className="btn btn-outline btn-sm flex-1"
                  >
                    <FaEdit className="mr-2" /> Update
                  </Link>

                  <button
                    onClick={() => handleDelete(transaction._id)}
                    className="btn text-red-600 bg-red-200 border-none "
                  >
                    <MdOutlineDeleteForever />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center mt-50 space-y-3">
          <h4 className="text-2xl text-gray-500">No transactions yet</h4>
          <Link
            to="/add-transaction"
            className="btn text-white bg-yellow-500 hover:bg-yellow-600"
          >
            Add Transaction <FaPlus />
          </Link>
        </div>
      )}
    </div>
  );
};

export default MyTransactions;
