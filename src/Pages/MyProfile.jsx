// src/pages/MyProfile.jsx
import { useContext, useEffect, useState } from "react";
import { AiOutlineMail } from "react-icons/ai";
import { FaUserEdit } from "react-icons/fa";
import { useNavigate } from "react-router";
import { AuthContext } from "../Context/AuthContext";

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
        alert("Profile updated successfully!");
      })
      .catch((error) => {
        alert(error.message || "Please try again.");
      });

    navigate(0);
  };

  return (
    <div className="min-h-screen  flex justify-center items-center px-4">
      <div className="w-full max-w-2xl  backdrop-blur-md shadow-2xl rounded-3xl p-10 border border-gray-200 text-center relative">
        {/* Profile Picture */}
        <div className="flex justify-center mb-6 relative">
          <button
            onClick={() => document.getElementById("photo_modal").showModal()}
            className="group"
          >
            <div className="relative">
              <img
                src={photo}
                alt="Profile"
                className="w-40 h-40 rounded-full object-cover border-4 border-white shadow-lg ring-4 ring-[#3adc9e] group-hover:ring-green-600 transition-all duration-300"
              />
              <div className="absolute inset-0 bg-black/20 rounded-full opacity-0 group-hover:opacity-100 transition-all flex justify-center items-center">
                <FaUserEdit className="text-white text-3xl" />
              </div>
            </div>
          </button>
        </div>

        {/* User Info */}
        <h2 className="text-3xl font-bold">{name}</h2>
        <div className="flex justify-center items-center gap-2 mt-2">
          <AiOutlineMail />
          <span>{email}</span>
        </div>

        {/* Update Button */}
        <button
          className="btn btn-primary mt-6 bg-yellow-400 hover:bg-yellow-600 text-white border-none rounded-full px-6"
          onClick={() => document.getElementById("edit_modal").showModal()}
        >
          <FaUserEdit className="mr-2" /> Edit Profile
        </button>

        {/* Profile Photo Modal */}
        <dialog id="photo_modal" className="modal">
          <div className="modal-box  p-6 rounded-2xl flex justify-center items-center">
            <img
              src={photo}
              alt="Large Profile"
              className="rounded-lg max-h-[70vh] object-contain"
            />
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>

        {/* Edit Profile Modal */}
        <dialog id="edit_modal" className="modal">
          <div className="modal-box backdrop-blur-md rounded-2xl shadow-lg border p-6">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-3 top-3">
                ✕
              </button>
            </form>

            <h1 className="text-2xl font-semibold mb-5 text-center">
              Edit Your Profile
            </h1>

            <form onSubmit={handleUpdateProfile} className="space-y-5">


            {photo && (
                <div className="flex justify-center mt-4">
                  <img
                    src={photo}
                    alt="Preview"
                    className="w-24 h-24 rounded-full object-cover border  shadow-sm"
                  />
                </div>
              )}


              {/* Name */}
              <div>
                <label className="block text-left  font-medium mb-1">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="input input-bordered w-full  focus:ring "
                  placeholder="Your Name"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-left  font-medium mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={email}
                  className="input input-bordered w-full "
                  disabled
                />
              </div>

              {/* Photo URL */}
              <div>
                <label className="block text-left  font-medium mb-1">
                  Photo URL
                </label>
                <input
                  type="text"
                  name="photo"
                  value={photo}
                  onChange={(e) => setPhoto(e.target.value)}
                  className="input input-bordered w-full focus:ring"
                  placeholder="Enter Photo URL"
                />
              </div>

              

              <button
                type="submit"
                className="btn bg-yellow-500 hover:bg-yellow-600 text-white w-full rounded-full mt-4"
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
