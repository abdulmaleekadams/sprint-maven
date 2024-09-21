import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTiktok,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="py-5 bg-black text-white/60 border-t">
      <div className="container">
        <div className="flex flex-col gap-4 sm:flex-row items-center justify-between">
          <div className="text-center ">
            © 2024 SprintMaven, Inc. All rights reserved
          </div>
          <ul className="flex justify-center gap-3">
            <li>
              <FaXTwitter />
            </li>
            <li>
              <FaInstagram />
            </li>
            <li>
              <FaTiktok />
            </li>
            <li>
              <FaYoutube />
            </li>
            <li>
              <FaLinkedinIn />
            </li>
            <li>
              <FaFacebookF />
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
