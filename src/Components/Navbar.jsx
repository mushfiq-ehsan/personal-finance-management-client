import { use } from "react";
import { AiOutlineTransaction } from "react-icons/ai";
import { IoHomeOutline } from "react-icons/io5";
import { MdOutlineAddCard } from "react-icons/md";
import { TbReportSearch } from "react-icons/tb";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../Context/AuthContext";
import { CgProfile } from "react-icons/cg";

const Navbar = () => {
  const { user, logOut } = use(AuthContext);
  console.log(user);

  const handelLogOut = () => {
    logOut()
      .then(() => {
        alert("LogOut successfull");
      })
      .catch((error) => {
        alert(error);
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
    <div>
      <div className="navbar shadow-sm">
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
              className="menu menu-sm dropdown-content rounded-box z-50 bg-white mt-3 w-52 p-2 shadow"
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
            <div className="drawer drawer-end justify-end z-50">
              <input
                id="my-drawer-5"
                type="checkbox"
                className="drawer-toggle"
              />
              <div className="drawer-content">
                {/* Page content here */}
                
                <label htmlFor="my-drawer-5" className="drawer-button ">
                  <img
                    src={user?.photoURL}
                    className="w-15 h-15 object-cover rounded-full"
                    alt=""
                  />
                </label>
              </div>
              <div className="drawer-side">
                <label
                  htmlFor="my-drawer-5"
                  aria-label="close sidebar"
                  className="drawer-overlay"
                ></label>
                <ul className="menu bg-base-200 min-h-full w-80 p-4 space-y-5">
                  {/* Sidebar content here */}
                  <img  onClick={() => document.getElementById("my_modal_2").showModal()} src={user.photoURL} className="object-cover w-70 h-70 mx-auto rounded-full" alt="" />
                  <p className="text-2xl ">{user.displayName}</p>
                  <p className="text-2xl pb-2">{user.email}</p>
                    <NavLink
                      className={({ isActive }) =>
                        `mr-2 p-2  transition-all  duration-10 ${
                          isActive
                          ? "text-green-600 border-b-2 border-[#3adc9e]"
                          : ""
                        }`
                      }
                      to="/my-profile"
                    >
                          <div className="flex items-center gap-2">
                      <CgProfile />
                      <p>My Profile</p>
                  </div>
                    </NavLink>

                  <div className="divider"></div>
                  <button
                    onClick={handelLogOut}
                    className="btn bg-yellow-500 hover:bg-yellow-600 text-white border-none"
                  >
                    LogOut
                  </button>
                </ul>
              </div>
            </div>
          ) : (
            <div className="space-x-3">
              <Link
                to="/login"
                className="btn bg-yellow-500 hover:bg-yellow-600 text-white border-none "
              >
                LogIn
              </Link>
              <Link
                to="/signup"
                className="btn bg-gray-800 hover:bg-gray-900 text-white "
              >
                Sign Up
              </Link>
            </div>
          )}

           <dialog id="my_modal_2" className="modal">
          <div className="modal-box flex items-center justify-center bg-white rounded-xl shadow-lg">
            <img
              src={user?.photoURL}
              alt="Profile Preview"
              className="max-h-[70vh] object-contain rounded-lg"
            />
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>

        </div>
      </div>
    </div>
  );
};

export default Navbar;
