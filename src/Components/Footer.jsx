import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { MdOutlineEmail } from "react-icons/md";

const Footer = () => {
  return (
    <div>
      <footer className="footer sm:footer-horizontal text-base-content p-10 shadow bg-base-300">
        <div>
            <div className="flex items-center gap-3 text-xl text-[#3adc9e] font-bold">
                <img className="w-20" src="https://i.ibb.co.com/5XXH6Dj9/Gemini-Generated-Image-4iszgc4iszgc4isz-removebg-preview.png" alt="" />
                <p>FinEase</p>
            </div>
            <p>
                Your personal finance management companion.
                <br />
                 Track expenses, manage budgets, and achieve your financial goals with ease.
            </p>

            <div className="flex items-center gap-2">
            <MdOutlineEmail />
            <p>contact@finease.com</p>
            </div>

        </div>
        <nav>
          <h6 className="footer-title">Company</h6>
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Jobs</a>
        </nav>
        <nav>
          <h6 className="footer-title">Social</h6>
          <div className="grid grid-flow-col gap-4">
            <a>
              <FaXTwitter />
            </a>
            <a>
              <FaFacebookF />
            </a>
            <a>
              <FaInstagram />
            </a>
            <a>
              <FaLinkedinIn />
            </a>
          </div>
        </nav>
      </footer>
    </div>
  );
};

export default Footer;
