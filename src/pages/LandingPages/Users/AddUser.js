import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import "./AddUser.css";

const API_BASE_URL = "http://127.0.0.1:8000/accounts";
const ORG_API_URL = "http://127.0.0.1:8000/org/org";

// 🔐 Basic Auth helper
const getAuthHeader = () => {
  const email = localStorage.getItem("email");
  const password = localStorage.getItem("password");
  return {
    Authorization: "Basic " + btoa(`${email}:${password}`),
  };
};

function AddUser({ onUserAdded }) {
  const navigate = useNavigate();

  // Single form state (performance + clarity)
  const [form, setForm] = useState({
    First_Name: "",
    Last_Name: "",
    email: "",
    phone: "",
    role: "",
    organization: "",
    password: "",
    password2: "",
    status: "Active",
  });

  const [organizations, setOrganizations] = useState([]);
  const [loadingOrg, setLoadingOrg] = useState(false);
  const [errors, setErrors] = useState([]);
  const [showErrorModal, setShowErrorModal] = useState(false);

  // Fetch organizations
  useEffect(() => {
    let mounted = true;

    const fetchOrganizations = async () => {
      try {
        setLoadingOrg(true);
        const res = await axios.get(ORG_API_URL, {
          headers: getAuthHeader(),
        });
        if (mounted) setOrganizations(res.data);
      } catch (err) {
        console.error("Organization fetch failed", err);
      } finally {
        if (mounted) setLoadingOrg(false);
      }
    };

    fetchOrganizations();
    return () => (mounted = false);
  }, []);

  // Memoized change handler
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }, []);

  const validate = () => {
    const errs = [];
    if (!form.First_Name) errs.push("First Name is required");
    if (!form.Last_Name) errs.push("Last Name is required");
    if (!form.email) errs.push("Email is required");
    if (!form.phone) errs.push("Phone is required");
    if (!form.role) errs.push("Role is required");
    if (!form.organization) errs.push("Organization is required");
    if (!form.password) errs.push("Password is required");
    if (form.password !== form.password2) errs.push("Passwords do not match");
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (validationErrors.length) {
      setErrors(validationErrors);
      setShowErrorModal(true);
      return;
    }

    try {
      const res = await axios.post(`${API_BASE_URL}/register`, form, {
        headers: {
          ...getAuthHeader(),
          "Content-Type": "application/json",
        },
      });

      onUserAdded?.(res.data);
      navigate("/pages/landing-pages/user");
    } catch (err) {
      const backendErrors = [];

      if (err.response?.data) {
        Object.entries(err.response.data).forEach(([k, v]) => {
          backendErrors.push(`${k}: ${Array.isArray(v) ? v.join(", ") : v}`);
        });
      } else {
        backendErrors.push("Failed to create user");
      }

      setErrors(backendErrors);
      setShowErrorModal(true);
    }
  };

  return (
    <>
      <Navbar />

      <div className="container mt-4">
        <div className="card shadow">
          <div className="card-body">
            <h3>Add New User</h3>

            <form onSubmit={handleSubmit}>
              {[
                ["First_Name", "First Name"],
                ["Last_Name", "Last Name"],
                ["email", "Email", "email"],
                ["phone", "Phone"],
              ].map(([name, label, type = "text"]) => (
                <input
                  key={name}
                  className="form-control mb-2"
                  placeholder={label}
                  name={name}
                  type={type}
                  value={form[name]}
                  onChange={handleChange}
                />
              ))}

              <select
                className="form-select mb-2"
                name="role"
                value={form.role}
                onChange={handleChange}
              >
                <option value="">Select Role</option>
                <option value="User">User</option>
                <option value="Admin">Admin</option>
              </select>

              <select
                className="form-select mb-2"
                name="organization"
                value={form.organization}
                onChange={handleChange}
              >
                <option value="">Select Organization</option>
                {loadingOrg ? (
                  <option disabled>Loading…</option>
                ) : (
                  organizations.map((o) => (
                    <option key={o.id} value={o.id}>
                      {o.name}
                    </option>
                  ))
                )}
              </select>

              <input
                type="password"
                className="form-control mb-2"
                placeholder="Password"
                name="password"
                value={form.password}
                onChange={handleChange}
              />

              <input
                type="password"
                className="form-control mb-3"
                placeholder="Confirm Password"
                name="password2"
                value={form.password2}
                onChange={handleChange}
              />

              <div className="d-flex justify-content-between">
                <button className="btn btn-success">Save</button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => navigate("/pages/landing-pages/user")}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {showErrorModal && (
        <div className="modal show d-block">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="text-danger">Error</h5>
                <button className="btn-close" onClick={() => setShowErrorModal(false)} />
              </div>
              <div className="modal-body">
                <ul>
                  {errors.map((e, i) => (
                    <li key={i}>{e}</li>
                  ))}
                </ul>
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
