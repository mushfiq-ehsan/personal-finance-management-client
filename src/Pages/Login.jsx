import { use, useState } from "react";
import { FaEnvelope, FaEye, FaLock } from "react-icons/fa";
import { AuthContext } from "../Context/AuthContext";
import { useLocation, useNavigate } from "react-router";
import { signInWithPopup } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { RiEyeCloseFill } from "react-icons/ri";
import Loading from "./Loading";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

const Login = () => {
  const { signIn, auth, setUser, loading } = use(AuthContext);
  const googleProvider = new GoogleAuthProvider();
  const [show, setShow] = useState(false);
  const location = useLocation()
  const navigate= useNavigate()
  const [error, setError] = useState("");




  const handelLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    signIn(email, password).then(() => {
      form.reset();
      navigate(`${location.state ? location.state : "/"}`);
      Swal.fire({
          title: "Login Complete!",
          text: "Welcome back!",
          icon: "success",
        });
    }).catch((error) => {
      if (error.code === "auth/invalid-email") {
          setError("⚠️ Please enter a valid email address.");
        } else if (error.code === "auth/missing-password") {
          setError("⚠️ Password is required. Please enter your password.");
        } else if (error.code === "auth/invalid-credential") {
          setError("⚠️ Invalid email or password. Please check your credentials.");
        } else {
          setError("Something went wrong. Please try again.");
        }
    });
  };

   const handleGoogleLogIn = (e) => {
    e.preventDefault();
    signInWithPopup(auth, googleProvider)
    .then(()=>{
      navigate(location.state ? location.state : "/");
       Swal.fire({
          title: "Login Complete!",
          text: "Welcome back!",
          icon: "success",
        });

    })
    .catch((error) => {
        toast.error(error.message || "Failed to login. Please try again.");
      });

   }


   loading && <Loading/>

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
            <p className="text-sm ">Welcome back! Please log in.</p>
          </div>

          <form onSubmit={handelLogin}>
            {/* Email Input */}
            <label className="input input-bordered flex items-center gap-2 mb-3 w-full">
              <FaEnvelope className="text-gray-400" />
              <input
                name="email"
                type="email"
                className="grow"
                placeholder="Email"
              />
            </label>

            {/* Password Input */}
            <div className="relative">
              <label className="input input-bordered flex items-center gap-2 mb-3 w-full">
              <FaLock className="text-gray-400" />
              <input
                name="password"
                type={show ? "text" : "password"}
                className="grow "
                placeholder="Password"
              />
            </label>
            <span
                  onClick={() => setShow(!show)}
                  className="absolute right-4 top-3 text-lg cursor-pointer z-50"
                >
                  {show ? <RiEyeCloseFill /> : <FaEye />}
                </span>
            </div>
            {error && (
                <p className="font-bold text-red-700 text-center border py-2 mt-3">
                  {error}
                </p>
              )}

            <button
              to="/login"
              className="btn bg-yellow-500 hover:bg-yellow-600 text-white border-none w-full"
            >
              LogIn
            </button>

            <div className="divider">OR</div>

            {/* Google */}
            <button onClick={handleGoogleLogIn} className="btn bg-white text-black border-[#e5e5e5] w-full">
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
              Don’t have an account?{" "}
              <a
                href="/signup"
                className="text-primary font-semibold hover:underline"
              >
                Sign Up
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
