import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaEdit, FaTrashAlt, FaPlus, FaSearch, FaDownload, FaUpload } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import "./UserAdd.css";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

// API URLs
const API_URL = "http://127.0.0.1:8000/accounts/users";
const USER_API_URL = "http://127.0.0.1:8000/accounts/user";

// AUTH HEADER
const getAuthHeader = () => {
  const email = localStorage.getItem("email");
  const password = localStorage.getItem("password");
  return {
    Authorization: "Basic " + btoa(`${email}:${password}`),
  };
};

function UserAdd() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const [showEditModal, setShowEditModal] = useState(false);
  const [userToEdit, setUserToEdit] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    loadUsers();
  }, []);

  // LOAD USERS
  const loadUsers = async () => {
    setLoading(true);
    try {
      const res = await axios.get(API_URL, { headers: getAuthHeader() });
      console.log("API DATA:", res.data); // Check field names
      setUsers(res.data);
    } catch (err) {
      console.error("LOAD USERS ERROR:", err);
    } finally {
      setLoading(false);
    }
  };

  // SEARCH FILTER
  const filteredUsers = users.filter(
    (u) =>
      (u.first_name && u.first_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (u.last_name && u.last_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (u.email && u.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (u.phone && u.phone.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // DELETE USER
  const confirmDelete = async () => {
    if (!userToDelete) return;
    try {
      await axios.delete(`${USER_API_URL}/${userToDelete.id}/`, {
        headers: getAuthHeader(),
      });
      setUsers((prev) => prev.filter((u) => u.id !== userToDelete.id));
      setShowDeleteModal(false);
      setUserToDelete(null);
    } catch (err) {
      console.error("DELETE ERROR:", err);
    }
  };

  // EDIT USER
  const confirmEdit = async () => {
    if (!userToEdit) return;

    const payload = {
      first_name: userToEdit.first_name,
      last_name: userToEdit.last_name,
      email: userToEdit.email,
      phone: userToEdit.phone,
      role: userToEdit.role,
      status: userToEdit.status,
      organization: userToEdit.organization?.id || userToEdit.organization,
    };

    if (userToEdit.password && userToEdit.password2) {
      payload.password = userToEdit.password;
      payload.password2 = userToEdit.password2;
    }

    try {
      const res = await axios.put(`${USER_API_URL}/${userToEdit.id}/`, payload, {
        headers: { ...getAuthHeader(), "Content-Type": "application/json" },
      });
      setUsers((prev) => prev.map((u) => (u.id === userToEdit.id ? res.data : u)));
      setShowEditModal(false);
      setUserToEdit(null);
    } catch (err) {
      console.error("EDIT ERROR:", err.response?.data || err);
      alert("Update failed. Check console.");
    }
  };

  // IMPORT USERS
  const handleImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      const workbook = XLSX.read(evt.target.result, { type: "binary" });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(sheet);
      console.log("Imported Data:", jsonData);
      alert("Data imported successfully");
    };
    reader.readAsBinaryString(file);
  };

  // EXPORT USERS
  const handleExport = () => {
    const csvHeader = [
      "ID",
      "First Name",
      "Last Name",
      "Email",
      "Phone",
      "Role",
      "Organization",
      "Status",
    ];

    const csvRows = users.map((u) => [
      u.id,
      u.first_name,
      u.last_name,
      u.email,
      u.phone,
      u.role,
      u.organization?.name || u.organization,
      u.status,
    ]);

    const csvContent = [csvHeader, ...csvRows].map((e) => e.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const name = localStorage.getItem("email")?.replace(/[@.]/g, "_") || "users";
    saveAs(blob, `${name}_users.csv`);
  };

  return (
    <>
      <Navbar />

      <div className="container-fluid bg-light min-vh-100 pt-5">
        <div className="container mt-4">
          <div className="card shadow-lg border-0 rounded-4">
            <div className="card-body p-4">
              <h3 className="fw-bold text-primary mb-4">Users</h3>

              {/* SEARCH + ADD */}
              <div className="row mb-4">
                <div className="col-md-8 position-relative">
                  <FaSearch className="position-absolute top-50 start-0 translate-middle-y ms-3 text-primary" />
                  <input
                    className="form-control ps-5 rounded-pill"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="col-md-4 text-end">
                  <button
                    className="btn btn-success rounded-pill px-4"
                    onClick={() => navigate("/pages/landing-pages/user/AddUser")}
                  >
                    <FaPlus className="me-2" /> Add User
                  </button>
                </div>
              </div>

              {/* TABLE */}
              {loading ? (
                <div className="text-center text-primary fw-bold">Loading...</div>
              ) : (
                <table className="table table-bordered table-hover text-center">
                  <thead className="table-dark">
                    <tr>
                      <th>#</th>
                      <th>First</th>
                      <th>Last</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Role</th>
                      <th>Organization</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.length === 0 ? (
                      <tr>
                        <td colSpan="9">No users found</td>
                      </tr>
                    ) : (
                      filteredUsers.map((user, index) => (
                        <tr key={user.id}>
                          <td>{index + 1}</td>
                          <td>{user.first_name}</td>
                          <td>{user.last_name}</td>
                          <td>{user.email}</td>
                          <td>{user.phone}</td>
                          <td>{user.role}</td>
                          <td>{user.organization?.name || user.organization}</td>
                          <td>
                            <span className={user.status === "Active" ? "bg-success" : "bg-danger"}>
                              {user.status}
                            </span>
                          </td>
                          <td className="d-flex justify-content-center gap-2">
                            {/* Edit */}
                            <button
                              className="btn btn-outline-warning btn-sm"
                              onClick={() => {
                                setUserToEdit({ ...user });
                                setShowEditModal(true);
                              }}
                            >
                              <FaEdit />
                            </button>

                            {/* Delete */}
                            <button
                              className="btn btn-outline-danger btn-sm"
                              onClick={() => {
                                setUserToDelete(user);
                                setShowDeleteModal(true);
                              }}
                            >
                              <FaTrashAlt />
                            </button>

                            {/* Import */}
                            <label className="btn btn-outline-primary btn-sm mb-0">
                              <FaUpload /> <input type="file" hidden onChange={handleImport} />
                            </label>

                            {/* Export */}
                            <button
                              className="btn btn-outline-success btn-sm"
                              onClick={handleExport}
                            >
                              <FaDownload />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* DELETE MODAL */}
      {showDeleteModal && (
        <div className="modal show d-block">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5>Delete User</h5>
                <button className="btn-close" onClick={() => setShowDeleteModal(false)} />
              </div>
              <div className="modal-body">Are you sure you want to delete this user?</div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowDeleteModal(false)}>
                  Cancel
                </button>
                <button className="btn btn-danger" onClick={confirmDelete}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* EDIT MODAL */}
      {showEditModal && userToEdit && (
        <div className="modal show d-block">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5>Edit User</h5>
                <button className="btn-close" onClick={() => setShowEditModal(false)} />
              </div>
              <div className="modal-body">
                <input
                  className="form-control mb-2"
                  value={userToEdit.first_name || ""}
                  onChange={(e) => setUserToEdit((p) => ({ ...p, first_name: e.target.value }))}
                  placeholder="First Name"
                />
                <input
                  className="form-control mb-2"
                  value={userToEdit.last_name || ""}
                  onChange={(e) => setUserToEdit((p) => ({ ...p, last_name: e.target.value }))}
                  placeholder="Last Name"
                />
                <input
                  className="form-control mb-2"
                  value={userToEdit.email || ""}
                  onChange={(e) => setUserToEdit((p) => ({ ...p, email: e.target.value }))}
                  placeholder="Email"
                />
                <input
                  className="form-control mb-2"
                  value={userToEdit.phone || ""}
                  onChange={(e) => setUserToEdit((p) => ({ ...p, phone: e.target.value }))}
                  placeholder="Phone"
                />
                <input
                  className="form-control mb-2"
                  value={userToEdit.role || ""}
                  onChange={(e) => setUserToEdit((p) => ({ ...p, role: e.target.value }))}
                  placeholder="Role"
                />
                <input
                  className="form-control mb-2"
                  value={userToEdit.organization?.name || userToEdit.organization || ""}
                  onChange={(e) => setUserToEdit((p) => ({ ...p, organization: e.target.value }))}
                  placeholder="Organization"
                />

                <div className="input-group mb-2">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control"
                    value={userToEdit.password || ""}
                    onChange={(e) => setUserToEdit((p) => ({ ...p, password: e.target.value }))}
                    placeholder="Password"
                  />
                  <button
                    className="btn btn-outline-secondary"
                    onClick={() => setShowPassword((p) => !p)}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>

                <div className="input-group mb-2">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    className="form-control"
                    value={userToEdit.password2 || ""}
                    onChange={(e) => setUserToEdit((p) => ({ ...p, password2: e.target.value }))}
                    placeholder="Confirm Password"
                  />
                  <button
                    className="btn btn-outline-secondary"
                    onClick={() => setShowConfirmPassword((p) => !p)}
                  >
                    {showConfirmPassword ? "Hide" : "Show"}
                  </button>
                </div>

                <select
                  className="form-control"
                  value={userToEdit.status || "Active"}
                  onChange={(e) => setUserToEdit((p) => ({ ...p, status: e.target.value }))}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowEditModal(false)}>
                  Cancel
                </button>
                <button className="btn btn-primary" onClick={confirmEdit}>
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

export default UserAdd;
