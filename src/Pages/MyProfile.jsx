import { useContext, useEffect, useState } from "react";
import { AiOutlineMail } from "react-icons/ai";
import { FaUserEdit } from "react-icons/fa";
import { useNavigate } from "react-router";
import { AuthContext } from "../Context/AuthContext";
import Swal from "sweetalert2";

const MyProfile = () => {
  const { user, updateUser, setUser } = useContext(AuthContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photo, setPhoto] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setName(user.displayName);
      setEmail(user.email);
      setPhoto(user.photoURL);
    }
  }, [user]);

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    updateUser({ photoURL: photo, displayName: name })
      .then(() => {
        setUser({ ...user, displayName: name, photoURL: photo });
        Swal.fire({
          icon: "success",
          title: "Profile Updated!",
          text: "Your profile has been updated successfully.",
          confirmButtonColor: "#10B981",
          timer: 1800,
          showConfirmButton: false,
        });
        navigate(0);
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Update Failed!",
          text: error.message || "Please try again.",
          confirmButtonColor: "#EF4444",
        });
      });
  };

  return (
    <div className="min-h-screen flex justify-center items-center px-4 transition-all duration-300 bg-base-300">
      <div className="w-full max-w-2xl backdrop-blur-xl shadow-2xl rounded-3xl p-10 border border-base-200 dark:border-gray-700 bg-white/70 dark:bg-white/10 transition-all duration-300 text-center relative">
        <div className="flex justify-center mb-6 relative group">
          <button
            onClick={() => document.getElementById("modal_1").showModal()}
            className="relative"
          >
            <img
              src={photo}
              alt="Profile"
              className="w-40 h-40 rounded-full object-cover border-4 border-white shadow-lg ring-4 ring-primary/50 group-hover:ring-secondary transition-all duration-500"
            />
            <div className="absolute inset-0 bg-black/30 rounded-full opacity-0 group-hover:opacity-100 flex justify-center items-center transition-all duration-300">
              <FaUserEdit className="text-white text-3xl" />
            </div>
          </button>
        </div>
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
          {name}
        </h2>
        <div className="flex justify-center items-center gap-2 mt-2 text-gray-600 dark:text-gray-300">
          <AiOutlineMail />
          <span>{email}</span>
        </div>
        <button
          className="btn btn-primary mt-6 rounded-full text-white bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 border-none shadow-md hover:shadow-lg transition-all duration-300"
          onClick={() => document.getElementById("edit_modal").showModal()}
        >
          <FaUserEdit className="mr-2" /> Edit Profile
        </button>
        <dialog id="modal_1" className="modal ">
          <div className="modal-box  p-6 rounded-2xl flex justify-center items-center bg-white/10">
            <img
              src={photo}
              alt="Large Profile"
              className="h-150 w-150 object-contain "
            />
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>

        <dialog id="edit_modal" className="modal">
          <div className="modal-box bg-base-100 dark:bg-gray-800 rounded-2xl shadow-2xl border border-base-200 dark:border-gray-700 p-6 transition-all duration-300">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-3 top-3 text-gray-600 dark:text-gray-300">
                ✕
              </button>
            </form>

            <h1 className="text-2xl font-semibold mb-5 text-center text-gray-800 dark:text-gray-100">
              Edit Your Profile
            </h1>

            <form onSubmit={handleUpdateProfile} className="space-y-5">
              {photo && (
                <div className="flex justify-center mt-4">
                  <img
                    src={photo}
                    alt="Preview"
                    className="w-24 h-24 rounded-full object-cover border border-gray-300 dark:border-gray-600 shadow-sm"
                  />
                </div>
              )}

              {/* name */}
              <div>
                <label className="block text-left font-medium mb-1 text-gray-700 dark:text-gray-300">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="input input-bordered w-full bg-white/50 dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Your Name"
                />
              </div>

              {/* email */}
              <div>
                <label className="block text-left font-medium mb-1 text-gray-700 dark:text-gray-300">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={email}
                  className="input input-bordered w-full bg-white/50 dark:bg-gray-700 text-gray-900 dark:text-white"
                  disabled
                />
              </div>

              {/* photo url */}
              <div>
                <label className="block text-left font-medium mb-1 text-gray-700 dark:text-gray-300">
                  Photo URL
                </label>
                <input
                  type="text"
                  name="photo"
                  value={photo}
                  onChange={(e) => setPhoto(e.target.value)}
                  className="input input-bordered w-full bg-white/50 dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Enter Photo URL"
                />
              </div>

              <button
                type="submit"
                className="btn w-full bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white rounded-full mt-4 shadow-md hover:shadow-lg transition-all duration-300"
              >
                Save Changes
              </button>
            </form>
          </div>
        </dialog>
      </div>
    </div>
  );
};

export default MyProfile;
