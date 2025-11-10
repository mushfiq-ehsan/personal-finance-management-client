import {
  FaChartLine,
  FaCheckCircle,
  FaPiggyBank,
  FaShieldAlt,
} from "react-icons/fa";
import { FaArrowRightLong, FaArrowTrendUp } from "react-icons/fa6";
import Banner from "./Banner";
import { use } from "react";
import { AuthContext } from "../Context/AuthContext";
import { Link } from "react-router";

const Home = () => {
  const { user } = use(AuthContext);

  return (
    <div className="min-h-screen bg-base-100 text-base-content">
      <Banner />

      {
        user ? <section className="py-12 px-4 md:px-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Total Balance */}
          <div className="card bg-white border shadow-sm rounded-2xl p-6 relative">
            <FaArrowTrendUp className="absolute right-4 top-4 text-gray-400" />
            <h3 className="text-base font-semibold mb-1 text-gray-600">
              Total Balance
            </h3>
            <p className="text-3xl font-bold text-neutral-900">$0.00</p>
            <p className="text-gray-500 text-sm mt-2">Your current balance</p>
          </div>

          {/* Total Income */}
          <div className="card bg-white border shadow-sm rounded-2xl p-6 relative">
            <FaArrowTrendUp className="absolute right-4 top-4 text-green-500" />
            <h3 className="text-base font-semibold mb-1 text-gray-600">
              Total Income
            </h3>
            <p className="text-3xl font-bold text-green-600">$0.00</p>
            <p className="text-gray-500 text-sm mt-2">All time income</p>
          </div>

          {/* Total Expenses */}
          <div className="card bg-white border shadow-sm rounded-2xl p-6 relative">
            <FaArrowTrendUp className="absolute right-4 top-4 text-red-500" />
            <h3 className="text-base font-semibold mb-1 text-gray-600">
              Total Expenses
            </h3>
            <p className="text-3xl font-bold text-red-500">$0.00</p>
            <p className="text-gray-500 text-sm mt-2">All time expenses</p>
          </div>
        </div>
      </section> : ""
      }

      <section className="py-20 bg-base-200 text-center">
        <h2 className="text-3xl font-bold mb-4">Why Choose FinEase?</h2>
        <p className="text-gray-600 mb-10">
          Powerful features designed to help you manage your finances
          effectively.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4 md:px-20">
          <div className="card bg-base-100 shadow-md p-6 hover:shadow-lg transition">
            <FaChartLine className="text-yellow-600 text-4xl mx-auto mb-4" />
            <h3 className="font-semibold text-lg mb-2">Detailed Reports</h3>
            <p className="">
              Visualize your spending patterns with interactive charts and
              comprehensive financial reports.
            </p>
          </div>

          <div className="card bg-base-100 shadow-md p-6 hover:shadow-lg transition">
            <FaPiggyBank className="text-yellow-600 text-4xl mx-auto mb-4" />
            <h3 className="font-semibold text-lg mb-2">Smart Budgeting</h3>
            <p className="">
              Set budgets for different categories and track your progress
              towards financial goals.
            </p>
          </div>

          <div className="card bg-base-100 shadow-md p-6 hover:shadow-lg transition">
            <FaShieldAlt className="text-yellow-600 text-4xl mx-auto mb-4" />
            <h3 className="font-semibold text-lg mb-2">Secure & Private</h3>
            <p className="">
              Your financial data is encrypted and protected with
              enterprise-grade security measures.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-base-100 px-4 md:px-20">
        <div className="grid md:grid-cols-2 gap-10 items-start">
          <div>
            <h2 className="text-2xl font-bold mb-4">Smart Budgeting Tips</h2>
            <ul className="space-y-4 ">
              <li className="flex items-start gap-3">
                <FaCheckCircle className="text-yellow-600 mt-1" /> Track Every
                Expense — identify areas where you can save money.
              </li>
              <li className="flex items-start gap-3">
                <FaCheckCircle className="text-yellow-600 mt-1" /> Set Realistic
                Goals — break them into smaller milestones.
              </li>
              <li className="flex items-start gap-3">
                <FaCheckCircle className="text-yellow-600 mt-1" /> Build an
                Emergency Fund — save at least 3 months of expenses.
              </li>
            </ul>
          </div>

          <div className="card border border-yellow-400/40 bg-gray-100 p-8 rounded-2xl shadow-lg hover:shadow-xl transition">
            <h3 className="text-2xl text-gray-600 font-bold  mb-4">
              Why Financial Planning Matters
            </h3>

            <p className="text-gray-600 mb-6 leading-relaxed">
              Financial planning isn’t just about saving money — it’s about
              creating a roadmap to achieve your dreams.
            </p>

            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></span>
                Achieve long-term financial security
              </li>

              <li className="flex items-start gap-3">
                <span className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></span>
                Make informed financial decisions
              </li>

              <li className="flex items-start gap-3">
                <span className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></span>
                Reduce financial stress and anxiety
              </li>

              <li className="flex items-start gap-3">
                <span className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></span>
                Build wealth for future generations
              </li>
            </ul>
          </div>
        </div>
      </section>

      {user ? (
        ""
      ) : (
        <section className="text-center py-20 bg-base-200">
          <h2 className="text-2xl font-bold mb-2">Ready to Take Control?</h2>
          <p className=" mb-6">
            Take the first step toward smarter budgeting and a stress-free
            financial future.
          </p>
          <Link to="/add-transaction" className="btn bg-yellow-500 hover:bg-yellow-600 text-white border-none items-center">
            Start Your Journey <FaArrowRightLong />
          </Link>
        </section>
      )}
    </div>
  );
};

export default Home;
