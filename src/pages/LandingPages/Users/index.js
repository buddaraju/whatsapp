import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaEdit, FaTrashAlt, FaPlus, FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import "./UserAdd.css";

const API_URL = "http://localhost:8000/users/";

function UserAdd() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

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

  const filteredUsers = users.filter(
    (u) => u.user_fullname && u.user_fullname.toLowerCase().includes(searchTerm.toLowerCase())
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
              {/* Header */}
              <h3 className="fw-bold text-primary mb-4">
                Users
                <span className="badge bg-secondary ms-2">{filteredUsers.length}</span>
              </h3>

              {/* Search and Add button row */}
              <div className="row mb-4 align-items-center">
                <div className="col-md-8 position-relative">
                  <FaSearch className="position-absolute top-50 start-0 translate-middle-y ms-3 text-primary" />
                  <input
                    className="form-control ps-5 rounded-pill shadow-sm"
                    placeholder="Search user..."
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setCurrentPage(1);
                    }}
                  />
                </div>
                <div className="col-md-4 text-end">
                  <button
                    className="btn btn-success rounded-pill shadow-sm px-4"
                    onClick={() => navigate("/pages/landing-pages/user/AddUser.js")}
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
                <div className="table-responsive">
                  <table className="table table-hover align-middle text-center mb-0">
                    <thead className="table-dark">
                      <tr>
                        <th>id</th>
                        <th>Full Name</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>

                    <tbody>
                      {currentUsers.length === 0 ? (
                        <tr>
                          <td colSpan="4" className="text-muted py-4">
                            No users found
                          </td>
                        </tr>
                      ) : (
                        currentUsers.map((user, index) => (
                          <tr key={user.id}>
                            <td>{indexOfFirstItem + index + 1}</td>
                            <td className="fw-semibold">{user.user_fullname}</td>
                            <td>
                              <span
                                className={`badge rounded-pill px-3 py-2 ${
                                  user.user_status === "Active" ? "bg-success" : "bg-danger"
                                }`}
                              >
                                {user.user_status}
                              </span>
                            </td>
                            <td>
                              <button className="btn btn-outline-warning btn-sm rounded-circle me-2">
                                <FaEdit />
                              </button>
                              <button className="btn btn-outline-danger btn-sm rounded-circle">
                                <FaTrashAlt />
                              </button>
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
                <div className="d-flex justify-content-center mt-4">
                  {[...Array(totalPages)].map((_, index) => (
                    <button
                      key={index}
                      className={`btn btn-sm rounded-pill mx-1 ${
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
    </>
  );
}

export default UserAdd;
