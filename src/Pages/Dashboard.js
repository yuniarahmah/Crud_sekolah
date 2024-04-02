import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import axiosInstance from "./api"; // Ensure this path is correct
import Navbarcom from "../Component/Navbar";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Swal from "sweetalert2";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenSquare, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

function Dashboard() {
  const [data, setData] = useState({
    murids: [],
    kelas: [],
    guru: [],
    mapel: [],
  });
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const history = useHistory();

  // logika table
  // This useEffect remains the same, it's where you fetch your data.
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/data_siswa", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setUsers(res.data);
      })
      .catch((error) => {
        Swal.fire("Error", "Terjadi kesalahan: " + error.message, "error");
      });
  }, []);

  // This part filters the users based on the search term. The filtering should happen before pagination.
  const filteredUsers = users.filter((user) =>
    user.nama_siswa.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Now, calculate the current users to display after filtering
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  // Use the filtered list of users for pagination
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  // logika Card
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");

      const responses = await Promise.all([
        axiosInstance.get("/murid", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
        axiosInstance.get("/kelas", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
        axiosInstance.get("/guru", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
        axiosInstance.get("/mapel", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
      ]);

      const newData = {
        murids: responses[0].data,
        kelas: responses[1].data,
        guru: responses[2].data,
        mapel: responses[3].data,
      };

      // This should now work without issue
      setData(newData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  // Ensure you're displaying data correctly
  return (
    <>
      <Navbarcom />
      <div
        style={{
          // background: "#f0f0f0",
          padding: "20px",
          borderRadius: "8px",
          marginBottom: "20px",
          fontWeight: "bold",
          fontSize: "40px",
          marginTop: "5%",
        }}
      >
        Dashboard
      </div>

      <div
        style={{
          gap: "30px",
          marginBottom: "5%",
          textAlign: "center",
          marginLeft: "3%",
        }}
      >
        <div
          className="container mt-5"
          style={{
            flexDirection: "column",
            display: "flex",
            // alignItems: "center",
          }}
        >
          <div className="row" style={{ width: "100%", marginBottom: "2rem" }}>
            {/* Kartu Siswa */}
            <div className="col-md-3 col-sm-6 mb-4" >
              <div className="card border-0" style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.4)" }}>
                <div className="card-body d-flex align-items-center">
                  <div className="bg-primary rounded-circle p-3 me-3">
                  <svg
                        class="text-white"
                        stroke="currentColor"
                        fill="currentColor"
                        stroke-width="0"
                        viewBox="0 0 24 24"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path fill="none" d="M0 0h24v24H0z"></path>
                        <path d="M4 9h4v11H4zM16 13h4v7h-4zM10 4h4v16h-4z"></path>
                      </svg>
                  </div>
                  <div>
                    <p className="mb-2 text-muted">Siswa</p>
                    <h5 className="card-title mb-0">$340.5</h5>
                  </div>
                </div>
              </div>
            </div>

            {/* Kartu Guru */}
            <div className="col-md-3 col-sm-6 mb-4" >
              <div className="card border-0" style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.4)" }}>
                <div className="card-body d-flex align-items-center">
                  <div className="bg-primary rounded-circle p-3 me-3">
                     <svg
                        class="text-white"
                        stroke="currentColor"
                        fill="currentColor"
                        stroke-width="0"
                        viewBox="0 0 24 24"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path fill="none" d="M0 0h24v24H0z"></path>
                        <path d="M4 9h4v11H4zM16 13h4v7h-4zM10 4h4v16h-4z"></path>
                      </svg>
                  </div>
                  <div>
                    <p className="mb-2 text-muted">Guru</p>
                    <h5 className="card-title mb-0">$340.5</h5>
                  </div>
                </div>
              </div>
            </div>

            {/* Kartu Mapel */}
            <div className="col-md-3 col-sm-6 mb-4" >
              <div className="card border-0" style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.4)" }}>
                <div className="card-body d-flex align-items-center">
                  <div className="bg-primary rounded-circle p-3 me-3">
                     <svg
                        class="text-white"
                        stroke="currentColor"
                        fill="currentColor"
                        stroke-width="0"
                        viewBox="0 0 24 24"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path fill="none" d="M0 0h24v24H0z"></path>
                        <path d="M4 9h4v11H4zM16 13h4v7h-4zM10 4h4v16h-4z"></path>
                      </svg>
                  </div>
                  <div>
                    <p className="mb-2 text-muted">Mapel</p>
                    <h5 className="card-title mb-0">$340.5</h5>
                  </div>
                </div>
              </div>
            </div>

            {/* Kartu Ke */}
            <div className="col-md-3 col-sm-6 mb-4" >
              <div className="card border-0" style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.4)" }}>
                <div className="card-body d-flex align-items-center">
                  <div className="bg-primary rounded-circle p-3 me-3">
                     <svg
                        class="text-white"
                        stroke="currentColor"
                        fill="currentColor"
                        stroke-width="0"
                        viewBox="0 0 24 24"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path fill="none" d="M0 0h24v24H0z"></path>
                        <path d="M4 9h4v11H4zM16 13h4v7h-4zM10 4h4v16h-4z"></path>
                      </svg>
                  </div>
                  <div>
                    <p className="mb-2 text-muted">kelas</p>
                    <h5 className="card-title mb-0">$340.5</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-11 col-11 col-sm-11">
            <div className="card" style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.4)" }}>
              <div className="card-header">
                <h4>Table Siswa</h4>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th className="text-center">No</th>
                        <th>Name Siswa</th>
                        <th>NISN</th>
                        <th>Alamat</th>
                        <th>Jurusan</th>
                        <th>Umur</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredUsers.map((user, index) => (
                        <tr key={user.id}>
                          <td className="text-center">
                            {index + 1 + (currentPage - 1) * usersPerPage}
                          </td>
                          <td>{user.nama_siswa}</td>
                          <td>{user.nisn}</td>
                          <td>{user.alamat}</td>
                          <td>{user.jurusan}</td>
                          <td>{user.umur}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer style={{ textAlign: "center", marginTop: "20px" }}>
        <p>&copy;2024 Tugas Java.25 March Bootcamp.</p>
      </footer>
    </>
  );
}

export default Dashboard;
