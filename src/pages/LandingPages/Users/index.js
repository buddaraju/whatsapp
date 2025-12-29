import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaEdit, FaTrashAlt, FaPlus, FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import "./UserAdd.css";

const API_URL = "http://13.203.205.219:8000/accounts/users/";

function UserAdd() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = () => {
    setLoading(true);
    axios
      .get(API_URL)
      .then((res) => setUsers(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  // Open modal when delete button clicked
  const handleDeleteClick = (user) => {
    setUserToDelete(user);
    setShowDeleteModal(true);
  };

  // Confirm deletion
  const confirmDelete = () => {
    if (userToDelete) {
      axios
        .delete(`${API_URL}${userToDelete.id}/`) // DELETE /users/:id/
        .then(() => {
          setUsers(users.filter((u) => u.id !== userToDelete.id));
          setShowDeleteModal(false);
          setUserToDelete(null);
        })
        .catch((err) => {
          console.error(err);
          alert("Failed to delete the user.");
        });
    }
  };

  // Filter users based on First_Name, Last_Name, email, or phone
  const filteredUsers = users.filter(
    (u) =>
      (u.First_Name && u.First_Name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (u.Last_Name && u.Last_Name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (u.email && u.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (u.phone && u.phone.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

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
                                <button className="btn btn-outline-warning btn-sm rounded-circle me-2">
                                  <FaEdit />
                                </button>
                                <button
                                  className="btn btn-outline-danger btn-sm rounded-circle"
                                  onClick={() => handleDeleteClick(user)}
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

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="modal show fade d-block" tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title text-danger">Delete User</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowDeleteModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <p>
                  Are you sure you want to delete user{" "}
                  <strong>
                    {userToDelete?.First_Name} {userToDelete?.Last_Name}
                  </strong>
                  ?
                </p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowDeleteModal(false)}
                >
                  Cancel
                </button>
                <button type="button" className="btn btn-danger" onClick={confirmDelete}>
                  Delete
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
