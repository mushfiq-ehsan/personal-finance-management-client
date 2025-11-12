import { FaArrowDown, FaArrowUp, FaEdit, FaEye, FaPlus } from "react-icons/fa";
import { MdOutlineDeleteForever } from "react-icons/md";
import { Link, useLoaderData } from "react-router";
import Swal from "sweetalert2";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
          headers: { "Content-Type": "application/json" },
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

  // Framer Motion Variants for Smooth Animations
  const containerVariant = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const cardVariant = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
    },
    exit: {
      opacity: 0,
      y: 30,
      scale: 0.9,
      transition: { duration: 0.3, ease: "easeInOut" },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="bg-base-200 p-5 min-h-screen"
    >
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-3"
      >
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
      </motion.div>

      {/* Transaction Cards */}
      {data.length > 0 ? (
        <motion.div
          variants={containerVariant}
          initial="hidden"
          animate="show"
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence>
            {data.map((transaction) => (
              <motion.div
                key={transaction._id}
                variants={cardVariant}
                exit="exit"
                whileHover={{
                  scale: 1.04,
                  rotateX: 2,
                  rotateY: 2,
                  boxShadow:
                    "0px 12px 30px rgba(0, 0, 0, 0.15), 0px 0px 20px rgba(255, 200, 0, 0.15)",
                  transition: { duration: 0.3 },
                }}
                whileTap={{ scale: 0.98 }}
                className="card shadow-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:shadow-xl rounded-2xl transition-all duration-300"
              >
                <div className="card-body">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2 font-semibold text-gray-800 dark:text-gray-200 text-lg">
                      {transaction.type?.toLowerCase() === "income" ? (
                        <FaArrowUp className="text-green-500" />
                      ) : (
                        <FaArrowDown className="text-red-500" />
                      )}
                      <span className="capitalize">{transaction.type}</span>
                    </div>

                    <motion.span
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.2, duration: 0.4 }}
                      className={`text-3xl font-bold ${
                        transaction.type?.toLowerCase() === "income"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      ${transaction.amount}.00
                    </motion.span>
                  </div>

                  <div className="space-y-1 text-gray-700 dark:text-gray-300">
                    <p className="text-sm">
                      <span className="font-semibold">Category:</span>{" "}
                      {transaction.category}
                    </p>
                    <p className="text-sm">
                      <span className="font-semibold">Date:</span>{" "}
                      {transaction.date
                        ? new Date(transaction.date).toISOString().split("T")[0]
                        : ""}
                    </p>
                    <p className="text-sm line-clamp-2">
                      {transaction.description}
                    </p>
                  </div>

                  {/* Buttons */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="flex items-center gap-3 mt-4 text-gray-800 dark:text-gray-200"
                  >
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

                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleDelete(transaction._id)}
                      className="btn text-red-600 bg-red-200 dark:bg-red-900/40 border-none hover:bg-red-300 dark:hover:bg-red-800/60"
                    >
                      <MdOutlineDeleteForever />
                    </motion.button>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col justify-center items-center mt-40 space-y-3"
        >
          <h4 className="text-2xl text-gray-500 dark:text-gray-400">
            No transactions yet
          </h4>
          <Link
            to="/add-transaction"
            className="btn text-white bg-yellow-500 hover:bg-yellow-600"
          >
            Add Transaction <FaPlus />
          </Link>
        </motion.div>
      )}
    </motion.div>
  );
};

export default MyTransactions;
