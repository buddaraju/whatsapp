import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import "./AddUser.css";

const API_BASE_URL = "http://127.0.0.1:8000/accounts";
const ORG_API_URL = "http://127.0.0.1:8000/org/org/"; // trailing slash required

// 🔐 Basic Auth
const getAuthHeader = () => {
  const email = localStorage.getItem("email");
  const password = localStorage.getItem("password");
  return {
    Authorization: "Basic " + btoa(`${email}:${password}`),
    "Content-Type": "application/json",
  };
};

function AddUser({ onUserAdded }) {
  const navigate = useNavigate();

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

  const [setErrors] = useState([]);
  const [setShowErrorModal] = useState(false);

  // Add Organization modal
  const [showOrgModal, setShowOrgModal] = useState(false);
  const [newOrgName, setNewOrgName] = useState("");
  const [newOrgDescription, setNewOrgDescription] = useState("");
  const [orgError, setOrgError] = useState("");

  // 🔄 Fetch organizations
  const fetchOrganizations = async () => {
    try {
      setLoadingOrg(true);
      const res = await axios.get(ORG_API_URL, {
        headers: getAuthHeader(),
      });
      setOrganizations(res.data);
    } catch (err) {
      console.error("FETCH ORG ERROR:", err.response?.data || err.message);
    } finally {
      setLoadingOrg(false);
    }
  };

  useEffect(() => {
    fetchOrganizations();
  }, []);

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

  // ✅ Save User
  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (validationErrors.length) {
      setErrors(validationErrors);
      setShowErrorModal(true);
      return;
    }

    try {
      const res = await axios.post(`${API_BASE_URL}/register`, form, { headers: getAuthHeader() });

      onUserAdded?.(res.data);
      navigate("/pages/landing-pages/user");
    } catch (err) {
      console.error("USER SAVE ERROR:", err.response?.data || err.message);

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

  // ✅ Save Organization (FIXED)
  const handleAddOrganization = async () => {
    if (!newOrgName.trim()) {
      setOrgError("Organization name is required");
      return;
    }
    if (!newOrgDescription.trim()) {
      setOrgError("Description is required");
      return;
    }

    try {
      await axios.post(
        ORG_API_URL,
        {
          name: newOrgName,
          description: newOrgDescription, // ✅ REQUIRED BY BACKEND
        },
        { headers: getAuthHeader() }
      );

      // Re-fetch organizations from backend
      const refreshed = await axios.get(ORG_API_URL, {
        headers: getAuthHeader(),
      });

      setOrganizations(refreshed.data);

      // auto-select newly created org
      const lastOrg = refreshed.data[refreshed.data.length - 1];
      setForm((prev) => ({
        ...prev,
        organization: lastOrg.id,
      }));

      // reset modal
      setShowOrgModal(false);
      setNewOrgName("");
      setNewOrgDescription("");
      setOrgError("");
    } catch (err) {
      console.error("ORG SAVE ERROR:", err.response?.data || err.message);
      setOrgError(err.response?.data ? JSON.stringify(err.response.data) : "Server error");
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
                value={form.organization}
                onChange={(e) =>
                  e.target.value === "__add__"
                    ? setShowOrgModal(true)
                    : setForm({ ...form, organization: e.target.value })
                }
              >
                <option value="">Select Organization</option>
                <option value="__add__">➕ Add Organization</option>

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

      {/* ADD ORGANIZATION MODAL */}
      {showOrgModal && (
        <div className="modal show d-block">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5>Add Organization</h5>
                <button className="btn-close" onClick={() => setShowOrgModal(false)} />
              </div>
              <div className="modal-body">
                <input
                  className="form-control mb-2"
                  placeholder="Organization Name"
                  value={newOrgName}
                  onChange={(e) => setNewOrgName(e.target.value)}
                />
                <textarea
                  className="form-control"
                  placeholder="Description"
                  value={newOrgDescription}
                  onChange={(e) => setNewOrgDescription(e.target.value)}
                />
                {orgError && <div className="text-danger mt-2">{orgError}</div>}
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowOrgModal(false)}>
                  Cancel
                </button>
                <button className="btn btn-primary" onClick={handleAddOrganization}>
                  Save
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
