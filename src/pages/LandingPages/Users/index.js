import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaEdit, FaTrashAlt, FaPlus, FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import "./UserAdd.css";
import "./user.css";

// APIs
const API_URL = "http://127.0.0.1:8000/accounts/users";
const USER_API_URL = "http://127.0.0.1:8000/accounts/user";

// AUTH HEADER
const getAuthHeader = () => ({
  Authorization:
    "Basic " + btoa(`${localStorage.getItem("email")}:${localStorage.getItem("password")}`),
});

function UserAdd() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const role = localStorage.getItem("role");
  const email = localStorage.getItem("email");
  const navigate = useNavigate();

  useEffect(() => {
    loadUsers();
  }, []);

  // LOAD USERS
  const loadUsers = async () => {
    setLoading(true);
    try {
      const res = await axios.get(API_URL, { headers: getAuthHeader() });
      setUsers(role === "admin" ? res.data : res.data.filter((u) => u.email === email));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // OPEN EDIT MODAL
  const openEditModal = (user) => {
    setSelectedUser({ ...user });
    setShowEditModal(true);
  };

  // HANDLE EDIT CHANGE
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedUser((prev) => ({ ...prev, [name]: value }));
  };

  // SAVE USER
  const saveUser = async () => {
    try {
      const res = await axios.put(`${USER_API_URL}/${selectedUser.id}/`, selectedUser, {
        headers: getAuthHeader(),
      });
      setUsers((prev) => prev.map((u) => (u.id === selectedUser.id ? res.data : u)));
      setShowEditModal(false);
    } catch (err) {
      console.error("Update failed", err);
      alert("Update failed");
    }
  };

  // CONFIRM DELETE
  const confirmDelete = (user) => {
    setUserToDelete(user);
    setShowDeleteModal(true);
  };

  // DELETE USER
  const deleteUser = async () => {
    try {
      await axios.delete(`${USER_API_URL}/${userToDelete.id}/`, {
        headers: getAuthHeader(),
      });
      setUsers((prev) => prev.filter((u) => u.id !== userToDelete.id));
      setShowDeleteModal(false);
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  // SEARCH FILTER
  const filteredUsers = users.filter(
    (u) =>
      (u.First_Name && u.First_Name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (u.Last_Name && u.Last_Name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (u.email && u.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (u.phone && u.phone.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (u.role && u.role.toLowerCase().includes(searchTerm.toLowerCase())) ||
      // (u.organization && u.organization.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (u.status && u.status.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <>
      <Navbar />

      <div className="container mt-5">
        <h3 className="mb-4">Users</h3>

        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <div className="card shadow-sm">
            {/* CARD HEADER */}
            <div className="card-header bg-white">
              <div className="row align-items-center g-2">
                <div className="col-12 col-md-8 position-relative mb-2 mb-md-0">
                  <FaSearch className="position-absolute top-50 start-0 translate-middle-y ms-3 text-secondary" />
                  <input
                    className="form-control ps-5"
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
            </div>

            {/* CARD BODY */}
            <div className="card-body p-0 table-responsive">
              <table className="table table-bordered table-hover text-center mb-0">
                <thead className="table-dark">
                  <tr>
                    <th>Id</th>
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
                    filteredUsers.map((u, i) => (
                      <tr key={u.id}>
                        <td>{i + 1}</td>
                        <td>{u.First_Name}</td>
                        <td>{u.Last_Name}</td>
                        <td>{u.email}</td>
                        <td>{u.phone}</td>
                        <td>{u.role}</td>
                        <td>{u.organization}</td>
                        <td>{u.status}</td>
                        <td className="d-flex justify-content-center gap-2 flex-wrap">
                          <button
                            className="btn btn-outline-warning btn-sm"
                            disabled={role !== "admin"}
                            onClick={() => openEditModal(u)}
                          >
                            <FaEdit />
                          </button>
                          <button
                            className="btn btn-outline-danger btn-sm"
                            disabled={role !== "admin"}
                            onClick={() => confirmDelete(u)}
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
          </div>
        )}
      </div>

      {/* EDIT MODAL */}
      {showEditModal && selectedUser && (
        <div className="modal show d-block" style={{ background: "rgba(0,0,0,.5)" }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5>Edit User</h5>
                <button className="btn-close" onClick={() => setShowEditModal(false)} />
              </div>
              <div className="modal-body">
                {[
                  "First_Name",
                  "Last_Name",
                  "email",
                  "phone",
                  "role",
                  "organization",
                  "status",
                ].map((field) => (
                  <div className="mb-2" key={field}>
                    <label className="form-label">{field.replace("_", " ")}</label>
                    <input
                      className="form-control"
                      name={field}
                      value={selectedUser[field] || ""}
                      onChange={handleChange}
                    />
                  </div>
                ))}
              </div>
              <div className="modal-footer d-flex gap-2 flex-wrap">
                <button
                  className="btn btn-secondary flex-fill btn-fixed-size"
                  onClick={() => setShowEditModal(false)}
                >
                  Close
                </button>
                <button className="btn btn-primary flex-fill btn-fixed-size" onClick={saveUser}>
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* DELETE MODAL */}
      {showDeleteModal && userToDelete && (
        <div className="modal show d-block" style={{ background: "rgba(0,0,0,.5)" }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="text-danger">Confirm Delete</h5>
                <button className="btn-close" onClick={() => setShowDeleteModal(false)} />
              </div>
              <div className="modal-body">
                Are you sure you want to delete{" "}
                <strong>
                  {userToDelete.First_Name} {userToDelete.Last_Name}
                </strong>
                ?
              </div>
              <div className="modal-footer d-flex gap-2 flex-wrap">
                <button
                  className="btn btn-secondary flex-fill btn-fixed-size"
                  onClick={() => setShowDeleteModal(false)}
                >
                  Cancel
                </button>
                <button className="btn btn-danger flex-fill btn-fixed-size" onClick={deleteUser}>
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
