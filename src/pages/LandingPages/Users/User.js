import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaUpload, FaDownload, FaSearch, FaTrashAlt } from "react-icons/fa";
import Papa from "papaparse";
import Navbar from "./Navbar";
import "./UserAdd.css";
import "./user.css";

function User() {
  const currentUser = localStorage.getItem("email");
  const STORAGE_KEY = `app_users_${currentUser}`;

  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // alert modal
  const [modalMessage, setModalMessage] = useState("");
  const [showModal, setShowModal] = useState(false);

  // delete modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);

  // load users
  useEffect(() => {
    if (!currentUser) return;
    const savedUsers = localStorage.getItem(STORAGE_KEY);
    setUsers(savedUsers ? JSON.parse(savedUsers) : []);
  }, [currentUser]);

  // save users
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
  }, [users]);

  const showAlert = (msg) => {
    setModalMessage(msg);
    setShowModal(true);
  };

  // import
  const handleImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const ext = file.name.split(".").pop().toLowerCase();
    const reader = new FileReader();

    reader.onload = (ev) => {
      const content = ev.target.result;

      if (ext === "json") {
        try {
          const data = JSON.parse(content).map((u) => ({
            First_Name: u.First_Name || u.first_name || "",
            Last_Name: u.Last_Name || u.last_name || "",
            email: u.email || "",
            phone: u.phone || "",
            organization: u.organization || "",
            whatsapp_enabled: u.whatsapp_enabled || "",
          }));
          setUsers((p) => [...p, ...data]);
          showAlert(`Imported ${data.length} users from JSON`);
        } catch {
          showAlert("Invalid JSON file");
        }
      }

      if (ext === "csv") {
        Papa.parse(content, {
          header: true,
          skipEmptyLines: true,
          complete: (res) => {
            const data = res.data.map((u) => ({
              First_Name: u.First_Name || u.first_name || "",
              Last_Name: u.Last_Name || u.last_name || "",
              email: u.email || "",
              phone: u.phone || "",
              organization: u.organization || "",
              whatsapp_enabled: u.whatsapp_enabled || "",
            }));
            setUsers((p) => [...p, ...data]);
            showAlert(`Imported ${data.length} users from CSV`);
          },
          error: () => showAlert("CSV parse error"),
        });
      }
    };

    reader.readAsText(file);
    e.target.value = null;
  };

  // export
  const handleExport = () => {
    if (!users.length) return showAlert("No users to export");

    let table = `<table border="1"><tr>
      <th>Id</th><th>First</th><th>Last</th><th>Email</th>
      <th>Phone</th><th>Organization</th><th>Whatsapp</th>
    </tr>`;

    users.forEach((u, i) => {
      table += `<tr>
        <td>${i + 1}</td>
        <td>${u.First_Name}</td>
        <td>${u.Last_Name}</td>
        <td>${u.email}</td>
        <td>${u.phone}</td>
        <td>${u.organization}</td>
        <td>${u.whatsapp_enabled}</td>
      </tr>`;
    });

    table += "</table>";

    const blob = new Blob([table], { type: "application/vnd.ms-excel" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "users.xls";
    a.click();
  };

  // search
  const filteredUsers = users.filter((u) =>
    Object.values(u).some((v) => v && v.toString().toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // delete handlers
  const openDeleteModal = (index) => {
    setDeleteIndex(index);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    setUsers((prev) => prev.filter((_, i) => i !== deleteIndex));
    setShowDeleteModal(false);
    setDeleteIndex(null);
    showAlert("User deleted successfully");
  };

  return (
    <>
      <Navbar />

      <div className="container mt-5">
        <h3 className="mb-4">Users</h3>

        <div className="card shadow-sm">
          <div className="card-header bg-white">
            <div className="row g-2">
              <div className="col-md-8 position-relative">
                <FaSearch className="position-absolute top-50 start-0 translate-middle-y ms-3" />
                <input
                  className="form-control ps-5"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="col-md-4 d-flex justify-content-end gap-2">
                <label className="btn btn-primary rounded-pill">
                  <FaUpload className="me-2" /> Import
                  <input type="file" accept=".csv,.json" hidden onChange={handleImport} />
                </label>

                <button className="btn btn-success rounded-pill" onClick={handleExport}>
                  <FaDownload className="me-2" /> Export
                </button>
              </div>
            </div>
          </div>

          <div className="card-body p-0 table-responsive">
            <table className="table table-bordered table-hover text-center">
              <thead className="table-dark">
                <tr>
                  <th>Id</th>
                  <th>First</th>
                  <th>Last</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Organization</th>
                  <th>Whatsapp Enabled</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan="8">No users found</td>
                  </tr>
                ) : (
                  filteredUsers.map((u, i) => (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>{u.First_Name}</td>
                      <td>{u.Last_Name}</td>
                      <td>{u.email}</td>
                      <td>{u.phone}</td>
                      <td>{u.organization}</td>
                      <td>{u.whatsapp_enabled}</td>
                      <td>
                        <FaTrashAlt
                          className="text-danger"
                          style={{ cursor: "pointer" }}
                          onClick={() => openDeleteModal(i)}
                        />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ALERT MODAL */}
      <div
        className={`modal fade ${showModal ? "show d-block" : ""}`}
        style={{ background: "rgba(0,0,0,0.5)" }}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5>Alert</h5>
              <button className="btn-close" onClick={() => setShowModal(false)} />
            </div>
            <div className="modal-body">{modalMessage}</div>
            <div className="modal-footer">
              <button className="btn btn-primary" onClick={() => setShowModal(false)}>
                OK
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* DELETE CONFIRM MODAL */}
      <div
        className={`modal fade ${showDeleteModal ? "show d-block" : ""}`}
        style={{ background: "rgba(0,0,0,0.5)" }}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5>Confirm Delete</h5>
              <button className="btn-close" onClick={() => setShowDeleteModal(false)} />
            </div>
            <div className="modal-body">Are you sure you want to delete this user?</div>
            <div className="modal-footer">
              <button
                className="btn btn-secondary btn-fixed-size"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>
              <button className="btn btn-danger btn-fixed-size" onClick={confirmDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default User;
