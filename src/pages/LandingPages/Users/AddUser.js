import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import "./AddUser.css";

const API_URL = "http://localhost:8000/users/";

function AddUser() {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      status: status,
    };

    await axios.post(API_URL, payload);
    navigate("/users");
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="card shadow">
          <div className="card-body">
            <h3>Add New User</h3>
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
                  required
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
                  required
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
              {/* Buttons */}
              <div className="d-flex justify-content-between">
                <button className="btn btn-success" type="submit">
                  Save
                </button>
                <button
                  className="btn btn-secondary"
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
    </>
  );
}

export default AddUser;
