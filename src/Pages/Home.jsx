import { motion } from "framer-motion";
import { use, useEffect, useState } from "react";
import { FaChartLine, FaCheckCircle, FaPiggyBank, FaShieldAlt } from "react-icons/fa";
import { FaArrowRightLong, FaArrowTrendUp } from "react-icons/fa6";
import { Link } from "react-router";
import { AuthContext } from "../Context/AuthContext";
import Banner from "./Banner";
import Loading from "./Loading";

const Home = () => {
  const { user, loading } = use(AuthContext);
  const [summary, setSummary] = useState({ totalBalance: 0, totalIncome: 0, totalExpense: 0 });

  useEffect(() => {
    if (user?.email) {
      fetch(`https://personal-finance-management-two.vercel.app/my-transaction-summary?email=${user.email}`, {
        headers: { authorization: `Bearer ${user.accessToken}` },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setSummary({
              totalBalance: data.totalBalance,
              totalIncome: data.totalIncome,
              totalExpense: data.totalExpense,
            });
          }
        })
        .catch((err) => console.error(err));
    }
  }, [user]);

  const fadeUp = {
    hidden: { opacity: 0, y: 50 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
  };

  if (loading) return <Loading />;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7 }} className="min-h-screen bg-base-100 text-base-content">
      <Banner />
      {user && (
        <motion.section variants={staggerContainer} initial="hidden" animate="show" className="py-12 px-4 md:px-20">
          <motion.div variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div variants={fadeUp} whileHover={{ scale: 1.04, transition: { duration: 0.3 } }} className="card bg-white border shadow-sm rounded-2xl p-6 relative">
              <FaArrowTrendUp className="absolute right-4 top-4 text-gray-400" />
              <h3 className="text-base font-semibold mb-1 text-gray-600">Total Balance</h3>
              <p className="text-3xl font-bold text-neutral-900">${summary.totalBalance.toFixed(2)}</p>
              <p className="text-gray-500 text-sm mt-2">Your current balance</p>
            </motion.div>
            <motion.div variants={fadeUp} whileHover={{ scale: 1.04, transition: { duration: 0.3 } }} className="card bg-white border shadow-sm rounded-2xl p-6 relative">
              <FaArrowTrendUp className="absolute right-4 top-4 text-green-500" />
              <h3 className="text-base font-semibold mb-1 text-gray-600">Total Income</h3>
              <p className="text-3xl font-bold text-green-600">${summary.totalIncome.toFixed(2)}</p>
              <p className="text-gray-500 text-sm mt-2">All time income</p>
            </motion.div>
            <motion.div variants={fadeUp} whileHover={{ scale: 1.04, transition: { duration: 0.3 } }} className="card bg-white border shadow-sm rounded-2xl p-6 relative">
              <FaArrowTrendUp className="absolute right-4 top-4 text-red-500" />
              <h3 className="text-base font-semibold mb-1 text-gray-600">Total Expenses</h3>
              <p className="text-3xl font-bold text-red-500">${summary.totalExpense.toFixed(2)}</p>
              <p className="text-gray-500 text-sm mt-2">All time expenses</p>
            </motion.div>
          </motion.div>
        </motion.section>
      )}
      <motion.section variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} className="py-20 bg-base-200 text-center">
        <motion.h2 variants={fadeUp} className="text-3xl font-bold mb-4 tracking-tight">Why Choose FinEase?</motion.h2>
        <motion.p variants={fadeUp} className="mb-10 max-w-xl mx-auto">Powerful features designed to help you manage your finances effectively.</motion.p>
        <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4 md:px-20">
          {[
            { icon: <FaChartLine className="text-yellow-600 text-4xl mx-auto mb-4" />, title: "Detailed Reports", text: "Visualize your spending patterns with interactive charts and comprehensive reports." },
            { icon: <FaPiggyBank className="text-yellow-600 text-4xl mx-auto mb-4" />, title: "Smart Budgeting", text: "Set budgets for categories and track your progress toward financial goals." },
            { icon: <FaShieldAlt className="text-yellow-600 text-4xl mx-auto mb-4" />, title: "Secure & Private", text: "Your financial data is encrypted and protected with enterprise-grade security." },
          ].map((feature, index) => (
            <motion.div key={index} variants={fadeUp} whileHover={{ scale: 1.05, boxShadow: "0px 8px 25px rgba(0,0,0,0.1)" }} className="card bg-base-100 shadow-md p-6 rounded-xl transition-all duration-300">
              {feature.icon}
              <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
              <p>{feature.text}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>
      <motion.section variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} className="py-20 bg-base-100 px-4 md:px-20">
        <div className="grid md:grid-cols-2 gap-10 items-start">
          <motion.div variants={fadeUp}>
            <h2 className="text-2xl font-bold mb-4">Smart Budgeting Tips</h2>
            <ul className="space-y-4">
              <li className="flex items-start gap-3"><FaCheckCircle className="text-yellow-600 mt-1" /> Track Every Expense — identify areas where you can save money.</li>
              <li className="flex items-start gap-3"><FaCheckCircle className="text-yellow-600 mt-1" /> Set Realistic Goals — break them into smaller milestones.</li>
              <li className="flex items-start gap-3"><FaCheckCircle className="text-yellow-600 mt-1" /> Build an Emergency Fund — save at least 3 months of expenses.</li>
            </ul>
          </motion.div>
          <motion.div variants={fadeUp} whileHover={{ scale: 1.02, boxShadow: "0px 12px 25px rgba(0,0,0,0.1)" }} className="card border border-yellow-400/40 bg-gray-100 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
            <h3 className="text-2xl text-gray-600 font-bold mb-4">Why Financial Planning Matters</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">Financial planning isn’t just about saving money — it’s about creating a roadmap to achieve your dreams.</p>
            <ul className="space-y-3 text-gray-700">
              {[
                "Achieve long-term financial security",
                "Make informed financial decisions",
                "Reduce financial stress and anxiety",
                "Build wealth for future generations",
              ].map((tip, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></span>
                  {tip}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </motion.section>
      {!user && (
        <motion.section variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-center py-20 bg-base-200">
          <h2 className="text-2xl font-bold mb-2">Ready to Take Control?</h2>
          <p className="mb-6 text-gray-600">Take the first step toward smarter budgeting and a stress-free financial future.</p>
          <motion.div whileHover={{ scale: 1.1 }}>
            <Link to="/add-transaction" className="btn bg-yellow-500 hover:bg-yellow-600 text-white border-none items-center gap-2">
              Start Your Journey <FaArrowRightLong />
            </Link>
          </motion.div>
        </motion.section>
      )}
    </motion.div>
  );
};

export default Home;
