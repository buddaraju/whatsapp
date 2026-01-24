import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaEdit, FaTrashAlt, FaPlus, FaSearch } from "react-icons/fa";
import Navbar from "./Navbar";
import "./UserAdd.css";
import "./user.css";

// APIs
const API_URL = "http://127.0.0.1:8000/accounts/users";
const USER_API_URL = "http://127.0.0.1:8000/accounts/user";
const ORG_API_URL = "http://127.0.0.1:8000/org/org";

// AUTH HEADER
const getAuthHeader = () => ({
  Authorization:
    "Basic " + btoa(`${localStorage.getItem("email")}:${localStorage.getItem("password")}`),
});

function UserAdd() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  // Edit Modal
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Add Modal
  const [showAddModal, setShowAddModal] = useState(false);
  const [newUser, setNewUser] = useState({
    First_Name: "",
    Last_Name: "",
    email: "",
    phone: "",
    role: "",
    organization: "",
    status: "",
  });

  // Organization Data
  const [organizations, setOrganizations] = useState([]);
  const [loadingOrg, setLoadingOrg] = useState(false);

  // Delete Modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(6);

  const role = localStorage.getItem("role");
  const email = localStorage.getItem("email");

  useEffect(() => {
    loadUsers();
    loadOrganizations();
  }, []);

  // Load Users
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

  // Load Organizations
  const loadOrganizations = async () => {
    setLoadingOrg(true);
    try {
      const res = await axios.get(ORG_API_URL, { headers: getAuthHeader() });
      setOrganizations(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingOrg(false);
    }
  };

  // Open Edit Modal
  const openEditModal = (user) => {
    setSelectedUser({ ...user });
    setShowEditModal(true);
  };

  // Handle Input Change
  const handleChange = (e, isNewUser = false) => {
    const { name, value } = e.target;
    if (isNewUser) {
      setNewUser((prev) => ({ ...prev, [name]: value }));
    } else {
      setSelectedUser((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Save User (Edit)
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

  // Add User
  const addUser = async () => {
    try {
      const res = await axios.post(USER_API_URL + "/", newUser, { headers: getAuthHeader() });
      setUsers((prev) => [...prev, res.data]);
      setShowAddModal(false);
      setNewUser({
        First_Name: "",
        Last_Name: "",
        email: "",
        phone: "",
        role: "",
        organization: "",
        status: "",
      });
    } catch (err) {
      console.error("Add user failed", err);
      alert("Add user failed");
    }
  };

  // Confirm Delete
  const confirmDelete = (user) => {
    setUserToDelete(user);
    setShowDeleteModal(true);
  };

  // Delete User
  const deleteUser = async () => {
    try {
      await axios.delete(`${USER_API_URL}/${userToDelete.id}/`, { headers: getAuthHeader() });
      setUsers((prev) => prev.filter((u) => u.id !== userToDelete.id));
      setShowDeleteModal(false);
    } catch (err) {
      console.error("Delete failed", err);
      alert("Delete failed");
    }
  };

  // Search Filter
  const filteredUsers = users.filter(
    (u) =>
      (u.First_Name && u.First_Name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (u.Last_Name && u.Last_Name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (u.email && u.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (u.phone && u.phone.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (u.role && u.role.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (u.status && u.status.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Pagination Logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredUsers.length / usersPerPage); i++) {
    pageNumbers.push(i);
  }

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const roleOptions = ["admin", "user"];
  const statusOptions = ["Active", "Inactive"];

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <h3 className="mb-4">Users</h3>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="card shadow-sm">
            <div className="card-header bg-white">
              <div className="row g-2 align-items-center">
                <div className="col-12 col-md-8 position-relative">
                  <FaSearch className="position-absolute top-50 start-0 translate-middle-y ms-3 text-secondary" />
                  <input
                    className="form-control ps-5"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="col-12 col-md-4 text-md-end text-start">
                  <button
                    className="btn btn-success rounded-pill mt-2 mt-md-0"
                    onClick={() => setShowAddModal(true)}
                  >
                    <FaPlus className="me-2" /> Add User
                  </button>
                </div>
              </div>
            </div>
            <div className="card-body p-0 table-responsive">
              <table className="table table-bordered table-hover text-center mb-0">
                <thead className="table-dark">
                  <tr>
                    <th>id</th>
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
                  {currentUsers.length === 0 ? (
                    <tr>
                      <td colSpan="9">No users found</td>
                    </tr>
                  ) : (
                    currentUsers.map((u, i) => (
                      <tr key={u.id}>
                        <td>{indexOfFirstUser + i + 1}</td>
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

              <div className="d-flex justify-content-center flex-wrap mt-3">
                {pageNumbers.map((number) => (
                  <button
                    key={number}
                    onClick={() => paginate(number)}
                    className={`btn btn-sm mx-1 mb-1 ${
                      currentPage === number ? "btn-primary" : "btn-outline-primary"
                    }`}
                  >
                    {number}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* MODALS */}
      {[
        {
          type: "Edit",
          show: showEditModal,
          user: selectedUser,
          save: saveUser,
          setShow: setShowEditModal,
        },
        {
          type: "Add",
          show: showAddModal,
          user: newUser,
          save: addUser,
          setShow: setShowAddModal,
          isNew: true,
        },
      ].map(
        ({ type, show, user, save, setShow, isNew }) =>
          show && (
            <div className="modal show d-block" style={{ background: "rgba(0,0,0,.5)" }} key={type}>
              <div className="modal-dialog modal-dialog-centered modal-lg">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5>{type} User</h5>
                    <button className="btn-close" onClick={() => setShow(false)} />
                  </div>
                  <div className="modal-body">
                    <div className="row g-2">
                      {[
                        "First_Name",
                        "Last_Name",
                        "email",
                        "phone",
                        "role",
                        "organization",
                        "status",
                      ].map((field) => (
                        <div className="col-12 col-md-6" key={field}>
                          <label>{field.replace("_", " ")}</label>
                          {field === "role" ? (
                            <select
                              className="form-control"
                              name="role"
                              value={user.role}
                              onChange={(e) => handleChange(e, isNew)}
                            >
                              <option value="">Select role</option>
                              {roleOptions.map((r) => (
                                <option key={r} value={r}>
                                  {r}
                                </option>
                              ))}
                            </select>
                          ) : field === "status" ? (
                            <select
                              className="form-control"
                              name="status"
                              value={user.status}
                              onChange={(e) => handleChange(e, isNew)}
                            >
                              <option value="">Select status</option>
                              {statusOptions.map((s) => (
                                <option key={s} value={s}>
                                  {s}
                                </option>
                              ))}
                            </select>
                          ) : field === "organization" ? (
                            <select
                              className="form-control"
                              name="organization"
                              value={user.organization}
                              onChange={(e) => handleChange(e, isNew)}
                            >
                              <option value="">Select Organization</option>
                              {loadingOrg ? (
                                <option disabled>Loading…</option>
                              ) : (
                                organizations.map((o) => (
                                  <option key={o.id} value={o.name}>
                                    {o.name}
                                  </option>
                                ))
                              )}
                            </select>
                          ) : (
                            <input
                              className="form-control"
                              name={field}
                              value={user[field]}
                              onChange={(e) => handleChange(e, isNew)}
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="modal-footer d-flex gap-2 flex-wrap">
                    <button className="btn btn-secondary flex-fill" onClick={() => setShow(false)}>
                      {type === "Edit" ? "Close" : "Cancel"}
                    </button>
                    <button
                      className={`btn btn-${type === "Edit" ? "primary" : "success"} flex-fill`}
                      onClick={save}
                    >
                      {type === "Edit" ? "Update" : "Add"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )
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
                  className="btn btn-secondary flex-fill"
                  onClick={() => setShowDeleteModal(false)}
                >
                  Cancel
                </button>
                <button className="btn btn-danger flex-fill" onClick={deleteUser}>
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
