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
const API_URL = "http://13.203.200.255:8002/accounts/users";
const USER_API_URL = "http://13.203.200.255:8000/accounts/user";

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
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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

    const payload = {
      First_Name: userToEdit.First_Name,
      Last_Name: userToEdit.Last_Name,
      email: userToEdit.email,
      phone: userToEdit.phone,
      role: userToEdit.role,
      organization: userToEdit.organization,
      status: userToEdit.status,
      password: userToEdit.password,
      password2: userToEdit.password2,
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

  // IMPORT EXCEL FILE
  const handleImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      const data = evt.target.result;
      const workbook = XLSX.read(data, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet);

      console.log("Imported Data:", jsonData);
      // OPTIONAL: send to API
      // jsonData.forEach(user => axios.post(API_URL, user));
      alert("data imported successfully ");
    };
    reader.readAsBinaryString(file);
  };

  // EXPORT USERS TO CSV
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
      u.First_Name,
      u.Last_Name,
      u.email,
      u.phone,
      u.role,
      u.organization,
      u.status,
    ]);

    const csvContent = [csvHeader, ...csvRows].map((e) => e.join(",")).join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    // 👉 username OR email
    const name = localStorage.getItem("username") || localStorage.getItem("email") || "user";

    const safeName = name.replace(/[@.]/g, "_");

    saveAs(blob, `${safeName}_users.csv`);
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
                      <th>Organization</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentUsers.length === 0 ? (
                      <tr>
                        <td colSpan="9">You do not have permission to perform this action</td>
                      </tr>
                    ) : (
                      currentUsers.map((user, index) => (
                        <tr key={user.id}>
                          <td>{indexOfFirstItem + index + 1}</td>
                          <td>{user.First_Name}</td>
                          <td>{user.last_name}</td>
                          <td>{user.email}</td>
                          <td>{user.phone}</td>
                          <td>{user.role}</td>
                          <td>{user.organization}</td>
                          <td>
                            <span
                              className={`badge ${
                                user.status === "Active" ? "bg-success" : "bg-danger"
                              }`}
                            >
                              {user.status}
                            </span>
                          </td>
                          <td className="d-flex justify-content-center gap-2">
                            {/* Edit */}
                            <button
                              className="btn btn-outline-warning btn-sm d-flex align-items-center justify-content-center"
                              style={{ width: "40px", height: "40px" }}
                              onClick={() => {
                                setUserToEdit({ ...user });
                                setShowEditModal(true);
                              }}
                            >
                              <FaEdit />
                            </button>

                            {/* Delete */}
                            <button
                              className="btn btn-outline-danger btn-sm d-flex align-items-center justify-content-center"
                              style={{ width: "40px", height: "40px" }}
                              onClick={() => {
                                setUserToDelete(user);
                                setShowDeleteModal(true);
                              }}
                            >
                              <FaTrashAlt />
                            </button>

                            {/* Import */}
                            <button
                              className="btn btn-outline-primary btn-sm d-flex align-items-center justify-content-center"
                              style={{ width: "40px", height: "40px" }}
                              onClick={handleImport}
                            >
                              <FaUpload />
                            </button>

                            {/* Export */}
                            <button
                              className="btn btn-outline-success btn-sm d-flex align-items-center justify-content-center mb-0"
                              style={{ width: "40px", height: "40px", cursor: "pointer" }}
                              onClick={handleExport} // ✅ Directly triggers download
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
