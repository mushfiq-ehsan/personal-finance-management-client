import { use, useEffect, useState } from "react";
import { AiOutlineTransaction } from "react-icons/ai";
import { IoHomeOutline } from "react-icons/io5";
import { MdOutlineAddCard } from "react-icons/md";
import { TbReportSearch } from "react-icons/tb";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../Context/AuthContext";
import { CgProfile } from "react-icons/cg";
import toast from "react-hot-toast";

const Navbar = () => {
  const { user, logOut } = use(AuthContext);

  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    const html = document.querySelector("html");
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handelTheme = () => {
    setTheme(theme == "light" ? "dark" : "light");
  };

  const handelLogOut = () => {
    logOut()
      .then(() => {
        toast.success("Successfully LogOut!");
      })
      .catch((error) => {
         toast.error(error.message || "Failed to logOut. Please try again.");
      });
  };

  const link = (
    <>
      <NavLink
        className={({ isActive }) =>
          `mr-2 p-2 transition-all  duration-10 ${
            isActive ? "text-green-600 border-b-2 border-[#3adc9e]" : ""
          }`
        }
        to="/"
      >
        {" "}
        <div className="flex items-center gap-1">
          {" "}
          <IoHomeOutline />
          Home{" "}
        </div>{" "}
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          `mr-2 p-2  transition-all  duration-10 ${
            isActive ? "text-green-600  border-b-2 border-[#3adc9e]" : " "
          }`
        }
        to="/add-transaction"
      >
        {" "}
        <div className="flex items-center gap-1">
          <MdOutlineAddCard /> Add Transaction{" "}
        </div>{" "}
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          `mr-2 p-2  transition-all  duration-10 ${
            isActive ? "text-green-600  border-b-2 border-[#3adc9e]" : ""
          }`
        }
        to="/my-transactions"
      >
        <div className="flex items-center gap-1">
          <AiOutlineTransaction /> My Transactions
        </div>
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          `mr-2 p-2  transition-all  duration-10 ${
            isActive ? "text-green-600 border-b-2 border-[#3adc9e]" : ""
          }`
        }
        to="/reports"
      >
        <div className="flex items-center gap-1">
          <TbReportSearch /> Reports
        </div>
      </NavLink>
    </>
  );

  return (
    <div className="navbar shadow-sm md:px-10">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content rounded-box z-50 bg-base-200 mt-3 w-52 p-2 shadow"
          >
            {link}
          </ul>
        </div>
        <div>
          <Link to="/" className="flex items-center">
            <img
              className="w-15"
              src="https://i.ibb.co.com/5XXH6Dj9/Gemini-Generated-Image-4iszgc4iszgc4isz-removebg-preview.png"
              alt="Pet Logo"
            />
          </Link>
        </div>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{link}</ul>
      </div>
      <div className="navbar-end flex justify-end">
        {user ? (
          <div className="drawer drawer-end justify-end z-50 flex items-center gap-5">
            <div onClick={(e) => handelTheme(e.target.checked)}>
              {theme == "dark" ? (
                // sun
                <svg
                  className="swap-on h-10 w-10 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                </svg>
              ) : (
                // moon
                <svg
                  className="swap-off h-10 w-10 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                </svg>
              )}
            </div>

            <input id="my-drawer-5" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content ">
              <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className=" m-1">
                  <img
                    src={user?.photoURL}
                    className="w-15 h-15 object-cover rounded-full"
                    alt=""
                  />
                </div>
                <ul
                  tabIndex="-1"
                  className="dropdown-content menu bg-base-100 rounded-box z-1 w-55  shadow-sm border"
                >
                  <li>{user.displayName}</li>
                  <li>{user.email}</li>
                  <div className="divider"></div>

                  <NavLink
                    className={({ isActive }) =>
                      `mr-2 p-2  transition-all  duration-10 ${
                        isActive
                          ? "text-green-600 border-b-2 border-[#3adc9e] mb-5"
                          : "mb-5"
                      }`
                    }
                    to="/my-profile"
                  >
                    <div className="flex items-center gap-2">
                      <CgProfile />
                      <p>My Profile</p>
                    </div>
                  </NavLink>
                  <button
                    onClick={handelLogOut}
                    className="btn bg-yellow-500 hover:bg-yellow-600 text-white border-none"
                  >
                    LogOut
                  </button>
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-x-3 flex">
            <Link
              to="/login"
              className="btn bg-yellow-500 hover:bg-yellow-600 text-white border-none "
            >
              LogIn
            </Link>
            <Link
              to="/signup"
              className="btn bg-gray-600 hover:bg-gray-700 text-white "
            >
              Sign Up
            </Link>
          </div>
        )}

        <dialog id="my_modal_2" className="modal">
          <div className="modal-box flex items-center justify-center bg-white/10 rounded-xl shadow-lg">
            <img
              src={user?.photoURL}
              alt="Profile Preview"
              className="h-150 w-150 object-contain"
            />
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
      </div>
    </div>
  );
};

export default Navbar;
