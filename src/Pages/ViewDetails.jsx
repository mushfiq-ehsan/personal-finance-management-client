import { motion } from "framer-motion";
import { use, useEffect, useState } from "react";
import { BsCalendarDate, BsFillFolderFill, BsTag } from "react-icons/bs";
import { FaArrowLeft, FaDollarSign, FaPlus } from "react-icons/fa";
import { Link, useParams } from "react-router";
import { AuthContext } from "../Context/AuthContext";
import Loading from "./Loading";

const MotionLink = motion.create(Link);

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};


const iconColorClasses = {
  yellow: "bg-yellow-300 dark:bg-yellow-700 text-yellow-800 dark:text-yellow-200",
  green: "bg-green-300 dark:bg-green-700 text-green-800 dark:text-green-200",
  blue: "bg-blue-300 dark:bg-blue-700 text-blue-800 dark:text-blue-200",
  red: "bg-red-300 dark:bg-red-700 text-red-800 dark:text-red-200",
};

const ViewDetails = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const { user } = use(AuthContext);
  const { id } = useParams();

  useEffect(() => {
    if (!user?.accessToken) return;

    fetch(`https://personal-finance-management-two.vercel.app/transaction/${id}`, {
      headers: {
        authorization: `Bearer ${user.accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((resData) => {
        setData(resData.result || resData);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading transaction:", err);
        setLoading(false);
      });
  }, [id, user]);

  if (loading) return <Loading />;

  const detailCards = [
    { label: "Type", value: data.type, icon: <BsTag />, color: "yellow" },
    { label: "Category", value: data.category, icon: <BsFillFolderFill />, color: "green" },
    {
      label: "Date",
      value: data.date ? new Date(data.date).toLocaleDateString() : "-",
      icon: <BsCalendarDate />,
      color: "blue",
    },
    { label: "Amount", value: `$${data.amount.toFixed(2)}`, icon: <FaDollarSign />, color: "red" },
  ];

  return (
    <div className="min-h-screen flex justify-center items-center bg-base-300 dark:bg-gray-900 p-6">
      <motion.div
        className="w-full max-w-3xl bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-200 dark:border-gray-700"
        variants={cardVariants}
        initial="hidden"
        animate="visible"
      >
        <MotionLink
          to="/my-transactions"
          className="flex items-center text-green-600 dark:text-green-400 font-medium mb-6 hover:underline"
          whileHover={{ x: -5 }}
        >
          <FaArrowLeft className="mr-2" /> Back to Transactions
        </MotionLink>

        <div className="md:flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-5 mb-6">
          <h1 className="text-2xl font-semibold text-gray-700 dark:text-gray-200">
            {data.type === "Income" ? "⬆ Income" : "⬇ Expense"} Details
          </h1>
          <p
            className={`text-3xl font-bold ${
              data.type === "Income" ? "text-green-500 dark:text-green-400" : "text-red-500 dark:text-red-400"
            }`}
          >
            {data.amount.toFixed(2)}$
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {detailCards.map((card, index) => (
            <motion.div
              key={index}
              className="flex items-center gap-3 p-4 rounded-xl shadow-sm bg-gray-100 dark:bg-gray-800"
              variants={cardVariants}
              initial="hidden"
              animate="visible"
            >
              <div className={`p-3 rounded-xl ${iconColorClasses[card.color]}`}>{card.icon}</div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">{card.label}</p>
                <p className="font-semibold text-gray-800 dark:text-gray-200">{card.value}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div variants={cardVariants} initial="hidden" animate="visible">
          <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Description</h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm">{data.description || "-"}</p>
        </motion.div>

        <hr className="my-6 border-gray-200 dark:border-gray-700" />

        <div className="flex flex-wrap gap-4 justify-center">
          <MotionLink
            to="/add-transaction"
            className="btn bg-yellow-600 hover:bg-yellow-700 dark:bg-yellow-500 dark:hover:bg-yellow-600 text-white px-6 rounded-md flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaPlus /> Add Transaction
          </MotionLink>
          <MotionLink
            to={`/update-transaction/${data._id}`}
            className="btn bg-gray-500 hover:bg-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 text-white px-6 rounded-md border-0"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Update Transaction
          </MotionLink>
        </div>
      </motion.div>
    </div>
  );
};

export default ViewDetails;
