import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaEdit, FaTrashAlt, FaSearch } from "react-icons/fa";
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

      if (role === "admin") {
        setUsers(res.data);
      } else {
        setUsers(res.data.filter((u) => u.email === email));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // DELETE USER (USES USER_API_URL ✅)
  const deleteUser = async (id) => {
    if (!window.confirm("Are you sure?")) return;

    try {
      await axios.delete(`${USER_API_URL}/${id}/`, {
        headers: getAuthHeader(),
      });
      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  // SEARCH FILTER (USES FaSearch ✅)
  const filteredUsers = users.filter(
    (u) =>
      u.first_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.last_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Navbar />

      <div className="container mt-5">
        <h3 className="mb-4">Users</h3>

        {/* SEARCH */}
        <div className="position-relative mb-3">
          <FaSearch className="position-absolute top-50 start-0 translate-middle-y ms-3 text-secondary" />
          <input
            className="form-control ps-5"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <table className="table table-bordered text-center">
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
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan="5">No users found</td>
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

                    <td className="d-flex justify-content-center gap-2">
                      {/* EDIT (FaEdit ✅) */}
                      <button
                        className="btn btn-outline-warning btn-sm"
                        disabled={role !== "admin"}
                        title="Edit"
                      >
                        <FaEdit />
                      </button>

                      {/* DELETE (FaTrashAlt + USER_API_URL ✅) */}
                      <button
                        className="btn btn-outline-danger btn-sm"
                        disabled={role !== "admin"}
                        title="Delete"
                        onClick={() => deleteUser(u.id)}
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
      </div>
    </>
  );
}

export default UserAdd;
