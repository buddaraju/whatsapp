import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaEdit, FaTrashAlt, FaPlus, FaSearch, FaDownload, FaUpload } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

// API URLs
const API_URL = "http://13.203.205.219:8001/accounts/users/";
const USER_API_URL = "http://13.203.205.219:8001/accounts/user/";

function UserAdd() {
  const navigate = useNavigate();

  // 🔐 Auth
  const token = localStorage.getItem("token") || sessionStorage.getItem("token");

  // 🚫 Redirect if not logged in
  useEffect(() => {
    if (!token) {
      navigate("/pages/authentication/sign-in");
    }
  }, [token, navigate]);

  // 📦 State
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;

  // 🔄 Load users
  useEffect(() => {
    if (token) {
      axios
        .get(API_URL, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setUsers(res.data))
        .catch(console.error);
    }
  }, [token]);

  // 🔍 Search filter
  const filteredUsers = users.filter(
    (u) =>
      u.First_Name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.Last_Name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.phone?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 📄 Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  // 🗑 Delete user
  const deleteUser = (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    axios
      .delete(`${USER_API_URL}${id}/`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => setUsers((prev) => prev.filter((u) => u.id !== id)))
      .catch(console.error);
  };

  return (
    <>
      <Navbar />

      <div className="container-fluid bg-light min-vh-100 pt-5">
        <div className="container mt-4">
          <div className="card shadow border-0 rounded-4">
            <div className="card-body p-4">
              <h3 className="fw-bold text-primary mb-4">Users</h3>

              {/* Search & Add */}
              <div className="row mb-4 align-items-center">
                <div className="col-md-8 position-relative">
                  <FaSearch className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" />
                  <input
                    className="form-control ps-5 rounded-pill"
                    placeholder="Search by name, email or phone..."
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setCurrentPage(1);
                    }}
                  />
                </div>
                <div className="col-md-4 text-end">
                  <button
                    className="btn btn-success rounded-pill px-4"
                    onClick={() => navigate("/pages/landing-pages/user/AddUser")}
                  >
                    <FaPlus className="me-2" />
                    Add User
                  </button>
                </div>
              </div>

              {/* Table */}
              <div className="table-responsive">
                <table className="table table-bordered table-hover align-middle text-center">
                  <thead className="table-dark">
                    <tr>
                      <th>ID</th>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Role</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentUsers.length === 0 ? (
                      <tr>
                        <td colSpan="8" className="text-muted py-4">
                          No users found
                        </td>
                      </tr>
                    ) : (
                      currentUsers.map((user) => (
                        <tr key={user.id}>
                          <td>{user.id}</td>
                          <td>{user.First_Name || "-"}</td>
                          <td>{user.Last_Name || "-"}</td>
                          <td>{user.email || "-"}</td>
                          <td>{user.phone || "-"}</td>
                          <td>{user.role || "-"}</td>
                          <td>
                            <span
                              className={`badge ${
                                user.status === "Active" ? "bg-success" : "bg-danger"
                              }`}
                            >
                              {user.status}
                            </span>
                          </td>
                          <td>
                            <button
                              className="btn btn-warning btn-sm me-2"
                              onClick={() => navigate(`/pages/landing-pages/user/edit/${user.id}`)}
                            >
                              <FaEdit />
                            </button>
                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() => deleteUser(user.id)}
                            >
                              <FaTrashAlt />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* PAGINATION */}
              {totalPages > 1 && (
                <div className="text-center">
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={index}
                      className={`btn btn-sm mx-1 ${
                        currentPage === index + 1 ? "btn-primary" : "btn-outline-primary"
                      }`}
                      onClick={() => setCurrentPage(i + 1)}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
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
              <div className="modal-body">Are you sure?</div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  style={{ height: "45px" }}
                  onClick={() => setShowDeleteModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-danger"
                  style={{ height: "45px" }}
                  onClick={confirmDelete}
                >
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
                  value={userToEdit.First_Name || ""}
                  onChange={(e) => setUserToEdit((p) => ({ ...p, First_Name: e.target.value }))}
                />
                <input
                  className="form-control mb-2"
                  value={userToEdit.Last_Name || ""}
                  onChange={(e) => setUserToEdit((p) => ({ ...p, Last_Name: e.target.value }))}
                />
                <input
                  className="form-control mb-2"
                  value={userToEdit.email || ""}
                  onChange={(e) => setUserToEdit((p) => ({ ...p, email: e.target.value }))}
                />
                <input
                  className="form-control mb-2"
                  value={userToEdit.phone || ""}
                  onChange={(e) => setUserToEdit((p) => ({ ...p, phone: e.target.value }))}
                />
                <input
                  className="form-control mb-2"
                  value={userToEdit.role || ""}
                  onChange={(e) => setUserToEdit((p) => ({ ...p, role: e.target.value }))}
                />
                <input
                  className="form-control mb-2"
                  value={userToEdit.organization || ""}
                  onChange={(e) => setUserToEdit((p) => ({ ...p, organization: e.target.value }))}
                />
                <div className="input-group mb-2">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control"
                    value={userToEdit?.password || ""}
                    onChange={(e) => setUserToEdit((p) => ({ ...p, password: e.target.value }))}
                  />
                  <button
                    type="button"
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
                    value={userToEdit?.password2 || ""}
                    onChange={(e) => setUserToEdit((p) => ({ ...p, password2: e.target.value }))}
                  />
                  <button
                    type="button"
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
                <button
                  className="btn btn-secondary"
                  style={{ height: "45px" }}
                  onClick={() => setShowEditModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-primary"
                  style={{ height: "45px" }}
                  onClick={confirmEdit}
                >
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
