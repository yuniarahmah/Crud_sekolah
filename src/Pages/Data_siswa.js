import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table, Pagination, Form, Button, Row, Col } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenSquare,
  faTrashAlt,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import Navbarcom from "../Component/Navbar";
import Swal from "sweetalert2";

function Data_siswa() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/data_siswa",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setUsers(response.data);
      } catch (error) {
        Swal.fire("Error", "Terjadi kesalahan: " + error.message, "error");
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Yakin ingin menghapus data ini?",
      text: "Jika dihapus maka data tidak dapat dipulihkan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, hapus data ini!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://localhost:8080/api/data_siswa/${id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
          setUsers(users.filter((user) => user.id !== id));
          Swal.fire(
            "Hapus!",
            "Data sudah terhapus secara permanen.",
            "success"
          );
        } catch (error) {
          Swal.fire(
            "Error",
            "Could not delete the user: " + error.message,
            "error"
          );
        }
      }
    });
  };

  const filteredUsers = users.filter(
    (user) =>
      user.nama_siswa.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.nisn.toString().toLowerCase().includes(searchTerm.toLowerCase()) || // Assuming NISN is numeric
      user.alamat.toString().toLowerCase().includes(searchTerm.toLowerCase()) || // Assuming NISN is numeric
      user.jurusan
        .toString()
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) || // Assuming NISN is numeric
      user.hobi.toString().toLowerCase().includes(searchTerm.toLowerCase()) || // Assuming NISN is numeric
      user.umur.toString().toLowerCase().includes(searchTerm.toLowerCase()) // Assuming NISN is numeric
    // Add any other fields you want to include in the search
  );

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handle search term change
  const handleSearchChange = (value) => {
    setSearchTerm(value);
    setCurrentPage(1); // Reset to first page when search changes
  };

  return (
    <>
      <Navbarcom />
      <div style={{ padding: "50px", marginTop: "10%" }}>
        <h1 style={{ marginBottom: "4%" }}>Tabel Data Siswa</h1>
        <Row>
          <Col md={4}>
            <Form.Group
              controlId="formSearch"
              style={{ marginLeft: "5%", marginBottom: "2%" }}
            >
              <Form.Control
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={8} className="text-right">
            {/* Adjusted the link to match your requirement for adding data */}
            <a
              href="/tambah_siswa"
              className="btn btn-primary"
              style={{ textDecoration: "none", color: "white" }}
            >
              <FontAwesomeIcon icon={faPlus} />
            </a>
          </Col>
        </Row>
        <div
          className="table-responsive"
          style={{
            boxShadow:
              "0 4px 8px rgba(0, 0, 0, 0.1), 0 6px 20px rgba(0, 0, 0, 0.19)",
          }}          
        >
          <table id="keywords" className="table">
            <thead>
              <tr>
                <th>No</th>
                <th>Name Siswa</th>
                <th>NISN</th>
                <th>Alamat</th>
                <th>Jurusan</th>
                <th>Hobi</th>
                <th>Umur</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((user, index) => (
                <tr key={user.id}>
                  <td>{index + 1 + (currentPage - 1) * usersPerPage}</td>
                  <td>{user.nama_siswa}</td>
                  <td>{user.nisn}</td>
                  <td>{user.alamat}</td>
                  <td>{user.jurusan}</td>
                  <td>{user.hobi}</td>
                  <td>{user.umur}</td>
                  <td
                    style={{
                      display: "flex",
                      gap: "10px",
                      // justifyContent: "center",
                    }}
                  >
                    <a
                      href={`/data_siswa/${user.id}`}
                      className="btn btn-success"
                      style={{
                        textDecoration: "none",
                        color: "white",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "0.375rem 0.75rem",
                        fontSize: "1rem",
                        lineHeight: 1.5,
                        borderRadius: "0.25rem",
                      }}
                    >
                      <FontAwesomeIcon
                        icon={faPenSquare}
                        style={{ marginRight: "2px" }}
                      />
                    </a>
                    <Button
                      variant="danger"
                      onClick={() => handleDelete(user.id)}
                      style={{
                        border: "none",
                        borderRadius: "0.25rem",
                        color: "white",
                      }}
                    >
                      <FontAwesomeIcon
                        icon={faTrashAlt}
                        style={{ marginRight: "2px" }}
                      />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <br />
        <Pagination>
          <Pagination.Prev
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          />
          {Array.from(
            { length: Math.ceil(users.length / usersPerPage) },
            (_, i) => (
              <Pagination.Item
                key={i + 1}
                active={i + 1 === currentPage}
                onClick={() => paginate(i + 1)}
              >
                {i + 1}
              </Pagination.Item>
            )
          )}
          <Pagination.Next
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === Math.ceil(users.length / usersPerPage)}
          />
        </Pagination>
      </div>
    </>
  );
}

export default Data_siswa;
