import { useState } from "react";
import { Link } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock, FaMapMarkerAlt } from "react-icons/fa";

const Signup = () => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    geolocation: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/createuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: credentials.name,
          email: credentials.email,
          password: credentials.password,
          location: credentials.geolocation,
        }),
      });

      const json = await response.json();
      console.log(json);

      if (json.success) {
        alert("Signup successful!");
      } else {
        alert(json.message || "Enter valid credentials.");
      }
    } catch (error) {
      console.error("Signup Error:", error);
      alert("Something went wrong. Please try again later.");
    }
  };

  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ backgroundColor: "#f4f4f4" }}
    >
      <div
        className="card p-4 shadow-lg border-0"
        style={{ width: "30rem", background: "white", borderRadius: "10px" }}
      >
        <h3 className="text-center mb-3">Create an Account</h3>
        <form onSubmit={handleSubmit}>
          {/* Name Field */}
          <div className="mb-3 input-group">
            <span className="input-group-text">
              <FaUser />
            </span>
            <input
              type="text"
              className="form-control"
              name="name"
              placeholder="Full Name"
              value={credentials.name}
              onChange={onChange}
              required
            />
          </div>

          {/* Email Field */}
          <div className="mb-3 input-group">
            <span className="input-group-text">
              <FaEnvelope />
            </span>
            <input
              type="email"
              className="form-control"
              name="email"
              placeholder="Email Address"
              value={credentials.email}
              onChange={onChange}
              required
            />
          </div>

          {/* Password Field */}
          <div className="mb-3 input-group">
            <span className="input-group-text">
              <FaLock />
            </span>
            <input
              type="password"
              className="form-control"
              name="password"
              placeholder="Password"
              value={credentials.password}
              onChange={onChange}
              required
            />
          </div>

          {/* Address Field */}
          <div className="mb-3 input-group">
            <span className="input-group-text">
              <FaMapMarkerAlt />
            </span>
            <input
              type="text"
              className="form-control"
              name="geolocation"
              placeholder="Your Address"
              value={credentials.geolocation}
              onChange={onChange}
            />
          </div>

          {/* Submit and Login Button */}
          <button type="submit" className="btn btn-success w-100">
            Sign Up
          </button>
          <div className="text-center mt-3">
            <Link to="/login" className="btn btn-outline-danger">
              Already a user? Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
