import { use } from 'react';
import { FaEnvelope, FaLock } from "react-icons/fa";
import { IoMdPhotos } from 'react-icons/io';
import { MdOutlineDriveFileRenameOutline } from 'react-icons/md';
import { AuthContext } from '../Context/AuthContext';




const SignUp = () => {

const { createUser, setUser, updateUser } = use(AuthContext);


const handleSignIn = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const photo = form.photo.value;
    const email = form.email.value;
    const password = form.password.value;

    


    createUser(email, password)
      .then((result) => {
        const user = result.user;
        updateUser({ displayName: name, photoURL: photo })
          .then(() => {
            setUser({ ...user, displayName: name, photoURL: photo });
          })
          .catch((error) => {
            console.log(error);
            alert(error);
            
          });
        form.reset();
      })
      .catch((error) => {
        console.log(error);
        alert(error);
        
      });
  };





    return (
        <div className="min-h-screen bg-base-200 flex items-center justify-center px-5">
              <div className="card w-full max-w-sm shadow-xl bg-base-100">
                <div className="card-body">
                  <div className="text-center mb-6">
                    <img
                      src="https://i.ibb.co.com/5XXH6Dj9/Gemini-Generated-Image-4iszgc4iszgc4isz-removebg-preview.png"
                      alt="FinEase Logo"
                      className="w-16 h-16 mx-auto mb-2"
                    />
                    <h1 className="text-2xl font-bold text-[#3adc9e]">FinEase</h1>
                    <p className="text-sm ">
                      Welcome back! Please log in.
                    </p>
                  </div>
        
                  <form onSubmit={handleSignIn}>
                    {/* name */}
                  <label className="input input-bordered flex items-center gap-2 mb-3">
                    <MdOutlineDriveFileRenameOutline className="text-gray-400" />
                    <input name='name' type="text" className="grow" placeholder="Name" />
                  </label>

                  {/* email */}
                  <label className="input input-bordered flex items-center gap-2 mb-3">
                    <FaEnvelope className="text-gray-400" />
                    <input name='email' type="email" className="grow" placeholder="Email" />
                  </label>
                  
                  {/* photourl */}
                  <label className="input input-bordered flex items-center gap-2 mb-3">
                    <IoMdPhotos className="text-gray-400" />
                    <input name='photo' type="text" className="" placeholder="PhotoUrl" />
                  </label>
        
                  {/* password */}
                  <label className="input input-bordered flex items-center gap-2 mb-3">
                    <FaLock className="text-gray-400" />
                    <input name='password' type="password" className="grow" placeholder="Password" />
                  </label>
        
                  <button to="/login" className="btn bg-yellow-500 hover:bg-yellow-600 text-white border-none w-full">
                    Sign Up
                  </button>
        
                  <div className="divider">OR</div>
        
                  
                  {/* Google */}
                  <button className="btn bg-white text-black border-[#e5e5e5] w-full">
                    <svg
                      aria-label="Google logo"
                      width="16"
                      height="16"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                    >
                      <g>
                        <path d="m0 0H512V512H0" fill="#fff"></path>
                        <path
                          fill="#34a853"
                          d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                        ></path>
                        <path
                          fill="#4285f4"
                          d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                        ></path>
                        <path
                          fill="#fbbc02"
                          d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                        ></path>
                        <path
                          fill="#ea4335"
                          d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                        ></path>
                      </g>
                    </svg>
                    Login with Google
                  </button>
        
                  <p className="text-center text-sm mt-4">
                    Allready Have An Acount Go{" "}
                    <a
                      href="/signup"
                      className="text-primary font-semibold hover:underline"
                    >
                      LogIn
                    </a>
                  </p>
                  </form>
                </div>
              </div>
            </div>
    );
};

export default SignUp;