import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import "./AddUser.css";

const API_BASE_URL = "http://13.203.205.219:8001/accounts/";

function AddUser({ onUserAdded }) {
  const navigate = useNavigate();

  // 🔐 Auth token
  const token = localStorage.getItem("token") || sessionStorage.getItem("token");

  // 🚫 Redirect if not logged in
  useEffect(() => {
    if (!token) {
      navigate("/pages/authentication/sign-in");
    }
  }, [token, navigate]);

  // Form state
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  // Password visibility
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [password2Visible, setPassword2Visible] = useState(false);

  // Error modal
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = [];
    if (!firstName) errors.push("First Name is required");
    if (!lastName) errors.push("Last Name is required");
    if (!email) errors.push("Email is required");
    if (!phone) errors.push("Phone is required");
    if (!role) errors.push("Role is required");
    if (!password) errors.push("Password is required");
    if (!password2) errors.push("Confirm Password is required");
    if (password !== password2) errors.push("Passwords do not match");

    if (errors.length > 0) {
      setErrorMessages(errors);
      setShowErrorModal(true);
      return;
    }

    const payload = {
      First_Name: firstName,
      Last_Name: lastName,
      email,
      phone,
      role,
      status: "Active",
      password,
      password2,
    };

    try {
      const res = await axios.post(`${API_BASE_URL}register/`, payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // 🔐 send token
        },
      });

      if (onUserAdded) onUserAdded(res.data);
      navigate("/pages/landing-pages/user");
    } catch (err) {
      const backendErrors = [];

      if (err.response?.data && typeof err.response.data === "object") {
        Object.entries(err.response.data).forEach(([field, msgs]) => {
          const message = Array.isArray(msgs)
            ? msgs.join(", ")
            : typeof msgs === "string"
            ? msgs
            : "Invalid value";

          backendErrors.push(`${field}: ${message}`);
        });
      } else {
        backendErrors.push("Failed to register user");
      }

      setErrorMessages(backendErrors);
      setShowErrorModal(true);
    }
  };

  return (
    <>
      <Navbar />

      <div className="container">
        <div className="card shadow mt-4">
          <div className="card-body">
            <h3 className="mb-4">Add New User</h3>

            <form onSubmit={handleSubmit}>
              {/* First Name */}
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i className="fa fa-user"></i>
                </span>
                <input
                  className="form-control"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>

              {/* Last Name */}
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i className="fa fa-user"></i>
                </span>
                <input
                  className="form-control"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>

              {/* Email */}
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i className="fa fa-envelope"></i>
                </span>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {/* Phone */}
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i className="fa fa-phone"></i>
                </span>
                <input
                  type="tel"
                  className="form-control"
                  placeholder="Phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              {/* Role */}
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i className="fa fa-briefcase"></i>
                </span>
                <select
                  className="form-select"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="">Select Role</option>
                  <option value="User">User</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>

              {/* Password */}
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i className="fa fa-lock"></i>
                </span>
                <input
                  type={passwordVisible ? "text" : "password"}
                  className="form-control"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                >
                  {passwordVisible ? "Hide" : "Show"}
                </button>
              </div>

              {/* Confirm Password */}
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i className="fa fa-lock"></i>
                </span>
                <input
                  type={password2Visible ? "text" : "password"}
                  className="form-control"
                  placeholder="Confirm Password"
                  value={password2}
                  onChange={(e) => setPassword2(e.target.value)}
                />
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => setPassword2Visible(!password2Visible)}
                >
                  {password2Visible ? "Hide" : "Show"}
                </button>
              </div>

              {/* Buttons */}
              <div className="d-flex justify-content-between">
                <button className="btn btn-success px-4" type="submit">
                  Save
                </button>
                <button
                  className="btn btn-secondary px-4"
                  type="button"
                  onClick={() => navigate("/pages/landing-pages/user")}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Error Modal */}
      {showErrorModal && (
        <div className="modal show fade d-block" tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title text-danger">Error</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowErrorModal(false)}
                />
              </div>
              <div className="modal-body">
                <ul>
                  {errorMessages.map((msg, idx) => (
                    <li key={idx}>{msg}</li>
                  ))}
                </ul>
              </div>
              <div className="modal-footer">
                <button className="btn btn-primary" onClick={() => setShowErrorModal(false)}>
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

AddUser.propTypes = {
  onUserAdded: PropTypes.func,
};

export default AddUser;
