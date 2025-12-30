import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaEdit, FaTrashAlt, FaPlus, FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import "./UserAdd.css";

// API URLs
const API_URL = "http://13.203.205.219:8001/accounts/users/";
const USER_API_URL = "http://13.203.205.219:8001/accounts/user/";

function UserAdd() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const [showEditModal, setShowEditModal] = useState(false);
  const [userToEdit, setUserToEdit] = useState(null);

  const [showPassword, setShowPassword] = useState(false); // Toggle password visibility
  const [showPassword2, setShowPassword2] = useState(false); // Toggle confirm password visibility

  const navigate = useNavigate();

  useEffect(() => {
    loadUsers();
  }, []);

  // Load all users
  const loadUsers = () => {
    setLoading(true);
    axios
      .get(API_URL)
      .then((res) => setUsers(res.data)) // Use res.data here
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  // Filter users based on First_Name, Last_Name, email, or phone
  const filteredUsers = users.filter(
    (u) =>
      (u.First_Name && u.First_Name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (u.Last_Name && u.Last_Name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (u.email && u.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (u.phone && u.phone.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  // Confirm delete user
  const confirmDelete = () => {
    if (userToDelete) {
      const deletedUserId = userToDelete.id;

      // Optimistically update the UI state
      setUsers((prev) => prev.filter((u) => u.id !== deletedUserId));

      axios
        .delete(`${USER_API_URL}${deletedUserId}/`)
        .then(() => {
          setShowDeleteModal(false);
          setUserToDelete(null);
        })
        .catch((err) => {
          // Rollback in case of error (re-fetch users)
          loadUsers();
          console.error(err);
        });
    }
  };

  // Confirm edit user
  const confirmEdit = () => {
    if (userToEdit.password !== userToEdit.password2) {
      alert("Passwords do not match!");
      return;
    }

    if (!userToEdit.password) delete userToEdit.password; // Don't send empty password

    const payload = { ...userToEdit };

    // Optimistically update the state before the API request
    setUsers((prevUsers) =>
      prevUsers.map((u) => (u.id === userToEdit.id ? { ...u, ...userToEdit } : u))
    );

    axios
      .put(`${USER_API_URL}${userToEdit.id}/`, payload)
      .then(() => {
        setShowEditModal(false);
        setUserToEdit(null);
      })
      .catch((err) => {
        loadUsers(); // Re-fetch users if update failed
        console.error(err);
      });
  };

  return (
    <>
      <Navbar />

      <div className="container-fluid bg-light min-vh-100 pt-5">
        <div className="container mt-4">
          <div className="card shadow-lg border-0 rounded-4">
            <div className="card-body p-4">
              <h3 className="fw-bold text-primary mb-4">Users</h3>

              {/* Search and Add */}
              <div className="row mb-4 align-items-center">
                <div className="col-12 col-md-8 position-relative mb-2 mb-md-0">
                  <FaSearch className="position-absolute top-50 start-0 translate-middle-y ms-3 text-primary" />
                  <input
                    className="form-control ps-5 rounded-pill shadow-sm"
                    placeholder="Search by name, email, or phone..."
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setCurrentPage(1);
                    }}
                  />
                </div>
                <div className="col-12 col-md-4 text-md-end text-center">
                  <button
                    className="btn btn-success rounded-pill shadow-sm px-4"
                    onClick={() => navigate("/pages/landing-pages/user/AddUser")}
                  >
                    <FaPlus className="me-2" />
                    Add User
                  </button>
                </div>
              </div>

              {/* Table */}
              {loading ? (
                <div className="text-center py-5 fw-bold text-primary">Loading...</div>
              ) : (
                <div className="table-responsive border rounded-3">
                  <table className="table table-bordered table-hover align-middle text-center mb-0">
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
                                className={`badge rounded-pill px-3 py-2 ${
                                  user.status === "Active" ? "bg-success" : "bg-danger"
                                }`}
                              >
                                {user.status}
                              </span>
                            </td>
                            <td>
                              <div className="d-flex justify-content-center">
                                <button
                                  className="btn btn-outline-warning btn-sm rounded-circle me-2"
                                  onClick={() => {
                                    setUserToEdit({ ...user });
                                    setShowEditModal(true);
                                  }}
                                >
                                  <FaEdit />
                                </button>
                                <button
                                  className="btn btn-outline-danger btn-sm rounded-circle"
                                  onClick={() => {
                                    setUserToDelete(user);
                                    setShowDeleteModal(true);
                                  }}
                                >
                                  <FaTrashAlt />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="d-flex flex-wrap justify-content-center mt-4">
                  {[...Array(totalPages)].map((_, index) => (
                    <button
                      key={index}
                      className={`btn btn-sm rounded-pill mx-1 my-1 ${
                        currentPage === index + 1 ? "btn-primary shadow" : "btn-outline-primary"
                      }`}
                      onClick={() => setCurrentPage(index + 1)}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Delete Modal */}
      {showDeleteModal && userToDelete && (
        <div className="modal show fade d-block" tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Delete User</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowDeleteModal(false)}
                ></button>
              </div>
              <div className="modal-body">Are you sure you want to delete this user?</div>
              <div className="modal-footer d-flex justify-content-center gap-2">
                <button
                  className="btn btn-secondary flex-fill"
                  style={{ height: "45px" }}
                  onClick={() => setShowDeleteModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-danger flex-fill"
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

      {/* Edit Modal */}
      {showEditModal && userToEdit && (
        <div className="modal show fade d-block" tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit User</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowEditModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <input
                  className="form-control mb-2"
                  placeholder="First Name"
                  value={userToEdit?.First_Name || ""}
                  onChange={(e) =>
                    setUserToEdit((prev) => ({ ...prev, First_Name: e.target.value }))
                  }
                />
                <input
                  className="form-control mb-2"
                  placeholder="Last Name"
                  value={userToEdit?.Last_Name || ""}
                  onChange={(e) =>
                    setUserToEdit((prev) => ({ ...prev, Last_Name: e.target.value }))
                  }
                />
                <input
                  className="form-control mb-2"
                  placeholder="Email"
                  value={userToEdit?.email || ""}
                  onChange={(e) => setUserToEdit((prev) => ({ ...prev, email: e.target.value }))}
                />
                <input
                  className="form-control mb-2"
                  placeholder="Phone"
                  value={userToEdit?.phone || ""}
                  onChange={(e) => setUserToEdit((prev) => ({ ...prev, phone: e.target.value }))}
                />
                <input
                  className="form-control mb-2"
                  placeholder="Role"
                  value={userToEdit?.role || ""}
                  onChange={(e) => setUserToEdit((prev) => ({ ...prev, role: e.target.value }))}
                />
                {/* Password field */}
                <div className="input-group mb-2">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control"
                    placeholder="Password"
                    value={userToEdit?.password || ""}
                    onChange={(e) =>
                      setUserToEdit((prev) => ({ ...prev, password: e.target.value }))
                    }
                  />
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
                <div className="input-group mb-2">
                  <input
                    type={showPassword2 ? "text" : "password"}
                    className="form-control"
                    placeholder="Confirm Password"
                    value={userToEdit?.password2 || ""}
                    onChange={(e) =>
                      setUserToEdit((prev) => ({ ...prev, password2: e.target.value }))
                    }
                  />
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => setShowPassword2((prev) => !prev)}
                  >
                    {showPassword2 ? "Hide" : "Show"}
                  </button>
                </div>
                <select
                  className="form-control mb-2"
                  value={userToEdit?.status || "Active"}
                  onChange={(e) => setUserToEdit((prev) => ({ ...prev, status: e.target.value }))}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
              <div className="modal-footer d-flex justify-content-center gap-2">
                <button
                  className="btn btn-secondary flex-fill"
                  style={{ height: "45px" }}
                  onClick={() => setShowEditModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-primary flex-fill"
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
