import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer
      className="d-flex flex-wrap justify-content-between align-items-center py-4 px-5"
      style={{
        background: "rgb(25, 135, 84)", // Success green color
        color: "#fff",
      }}
    >
      {/* Left Side - Logo & Copyright */}
      <div className="col-md-4 d-flex align-items-center">
        <a
          href="/"
          className="mb-3 me-2 mb-md-0 text-white text-decoration-none lh-1 fs-5 fw-bold"
        >
          HungerHub
        </a>
        <span className="text-light text-center">© 2025 HungerHub Inc.</span>
      </div>

      {/* Right Side - Social Icons */}
      <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
        <li className="ms-3">
          <a className="text-white icon-hover" href="#">
            <FaTwitter />
          </a>
        </li>
        <li className="ms-3">
          <a className="text-white icon-hover" href="#">
            <FaInstagram />
          </a>
        </li>
        <li className="ms-3">
          <a className="text-white icon-hover" href="#">
            <FaFacebookF />
          </a>
        </li>
        <li className="ms-3">
          <a className="text-white icon-hover" href="#">
            <FaLinkedin />
          </a>
        </li>
      </ul>

      {/* Styles */}
      <style>
        {`
          .icon-hover {
            font-size: 1.5rem;
            transition: 0.3s ease-in-out;
          }
          .icon-hover:hover {
            transform: scale(1.2);
            color: #f8d210 !important; /* Adds a highlight effect */
          }
        `}
      </style>
    </footer>
  );
};

export default Footer;
