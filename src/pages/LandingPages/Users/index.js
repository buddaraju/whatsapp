import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaEdit, FaTrashAlt, FaPlus, FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import "./UserAdd.css";

// API URLs
const API_URL = "http://13.203.205.219:8000/accounts/users/";
const USER_API_URL = "http://13.203.205.219:8000/accounts/user/";

function UserAdd() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const [showEditModal, setShowEditModal] = useState(false);
  const [userToEdit, setUserToEdit] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    loadUsers();
  }, []);

  // LOAD USERS
  const loadUsers = () => {
    setLoading(true);
    axios
      .get(API_URL)
      .then((res) => setUsers(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  // SEARCH FILTER
  const filteredUsers = users.filter(
    (u) =>
      (u.First_Name && u.First_Name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (u.Last_Name && u.Last_Name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (u.email && u.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (u.phone && u.phone.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // PAGINATION
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  // DELETE USER ✅
  const confirmDelete = () => {
    if (!userToDelete) return;

    axios
      .delete(`${USER_API_URL}${userToDelete.id}/`)
      .then(() => {
        setUsers((prev) => prev.filter((u) => u.id !== userToDelete.id));
        setShowDeleteModal(false);
        setUserToDelete(null);
      })
      .catch((err) => console.error("DELETE ERROR:", err));
  };

  // EDIT USER ✅ (PUT ONLY)
  const confirmEdit = () => {
    if (!userToEdit) return;

    // ⚠️ SEND ONLY REQUIRED / EDITABLE FIELDS
    const payload = {
      First_Name: userToEdit.First_Name,
      Last_Name: userToEdit.Last_Name,
      email: userToEdit.email,
      phone: userToEdit.phone,
      role: userToEdit.role,
      status: userToEdit.status,
    };

    axios
      .put(`${USER_API_URL}${userToEdit.id}/`, payload, {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        setUsers((prev) => prev.map((u) => (u.id === userToEdit.id ? res.data : u)));
        setShowEditModal(false);
        setUserToEdit(null);
      })
      .catch((err) => {
        console.error("EDIT ERROR:", err.response?.data || err);
        alert("Update failed. Check console.");
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

              {/* SEARCH + ADD */}
              <div className="row mb-4">
                <div className="col-md-8 position-relative">
                  <FaSearch className="position-absolute top-50 start-0 translate-middle-y ms-3 text-primary" />
                  <input
                    className="form-control ps-5 rounded-pill"
                    placeholder="Search..."
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

              {/* TABLE */}
              {loading ? (
                <div className="text-center text-primary fw-bold">Loading...</div>
              ) : (
                <table className="table table-bordered table-hover text-center">
                  <thead className="table-dark">
                    <tr>
                      <th>ID</th>
                      <th>First</th>
                      <th>Last</th>
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
                        <td colSpan="8">No users found</td>
                      </tr>
                    ) : (
                      currentUsers.map((user) => (
                        <tr key={user.id}>
                          <td>{user.id}</td>
                          <td>{user.First_Name}</td>
                          <td>{user.Last_Name}</td>
                          <td>{user.email}</td>
                          <td>{user.phone}</td>
                          <td>{user.role}</td>
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
                              onClick={() => {
                                setUserToEdit({ ...user });
                                setShowEditModal(true);
                              }}
                            >
                              <FaEdit />
                            </button>
                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() => {
                                setUserToDelete(user);
                                setShowDeleteModal(true);
                              }}
                            >
                              <FaTrashAlt />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              )}

              {/* PAGINATION */}
              {totalPages > 1 && (
                <div className="text-center">
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i}
                      className={`btn btn-sm mx-1 ${
                        currentPage === i + 1 ? "btn-primary" : "btn-outline-primary"
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
