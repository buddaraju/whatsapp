import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaUpload, FaDownload, FaSearch } from "react-icons/fa";
import Navbar from "./Navbar";
import "./UserAdd.css";
import "./user.css";

// API
const API_URL = "http://127.0.0.1:8000/accounts/users";

// AUTH HEADER
const getAuthHeader = () => ({
  Authorization:
    "Basic " + btoa(`${localStorage.getItem("email")}:${localStorage.getItem("password")}`),
});

function User() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  // Modal state
  const [modalMessage, setModalMessage] = useState("");
  const [showModal, setShowModal] = useState(false);

  const role = localStorage.getItem("role");
  const email = localStorage.getItem("email");

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
      showAlert("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  // SHOW MODAL
  const showAlert = (message) => {
    setModalMessage(message);
    setShowModal(true);
  };

  // HANDLE IMPORT (CSV/JSON) - Placeholder
  const handleImport = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log("Imported file:", file.name);
      showAlert(`Imported file: ${file.name}`);
      // TODO: Parse file and update `users` array
    }
  };

  // HANDLE EXPORT TO XLS
  const handleExport = () => {
    if (users.length === 0) {
      showAlert("No users to export");
      return;
    }

    // Create HTML table for XLS
    let table = `<table border="1">
      <tr>
        <th>#</th>
        <th>First</th>
        <th>Last</th>
        <th>Email</th>
        <th>Phone</th>
        <th>Role</th>
        <th>Organization</th>
        <th>Status</th>
      </tr>`;

    users.forEach((u, i) => {
      table += `<tr>
        <td>${i + 1}</td>
        <td>${u.First_Name || ""}</td>
        <td>${u.Last_Name || ""}</td>
        <td>${u.email || ""}</td>
        <td>${u.phone || ""}</td>
        <td>${u.role || ""}</td>
        <td>${u.organization || ""}</td>
        <td>${u.status || ""}</td>
      </tr>`;
    });

    table += "</table>";

    const blob = new Blob([table], { type: "application/vnd.ms-excel" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "users.xls";
    a.click();
    URL.revokeObjectURL(url);
  };

  // SEARCH FILTER
  const filteredUsers = users.filter(
    (u) =>
      (u.First_Name && u.First_Name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (u.Last_Name && u.Last_Name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (u.email && u.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (u.phone && u.phone.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (u.role && u.role.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (u.organization && u.organization.toLowerCase().includes(searchTerm.toLowerCase())) ||
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

                <div className="col-md-4 text-end d-flex justify-content-end gap-2">
                  {/* IMPORT BUTTON */}
                  <label className="btn btn-primary rounded-pill mb-0 px-4">
                    <FaUpload className="me-2" /> Import
                    <input type="file" accept=".csv,.json" onChange={handleImport} hidden />
                  </label>

                  {/* EXPORT BUTTON */}
                  <button className="btn btn-success rounded-pill px-4" onClick={handleExport}>
                    <FaDownload className="me-2" /> Export
                  </button>
                </div>
              </div>
            </div>

            {/* CARD BODY */}
            <div className="card-body p-0 table-responsive">
              <table className="table table-bordered table-hover text-center mb-0">
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
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.length === 0 ? (
                    <tr>
                      <td colSpan="8">No users found</td>
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
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* MODAL POPUP */}
      <div
        className={`modal fade ${showModal ? "show d-block" : ""}`}
        tabIndex="-1"
        style={{ backgroundColor: showModal ? "rgba(0,0,0,0.5)" : "transparent" }}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Alert</h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => setShowModal(false)}
              ></button>
            </div>
            <div className="modal-body">
              <p>{modalMessage}</p>
            </div>
            <div className="modal-footer">
              <button className="btn btn-primary" onClick={() => setShowModal(false)}>
                OK
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default User;
