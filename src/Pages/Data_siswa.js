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

  const filteredUsers = users.filter((user) =>
    user.nama_siswa.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

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
            <Form.Group controlId="formSearch" style={{ marginLeft: "5%", marginBottom: "2%" }}>
              <Form.Control
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={8} className="text-right">
            {/* Adjusted the link to match your requirement for adding data */}
            <a href="/tambah_siswa" className="btn btn-primary" style={{ textDecoration: "none", color: "white" }}>
              <FontAwesomeIcon icon={faPlus} />
            </a>
          </Col>
        </Row>
        <div className="table-responsive" style={{ marginTop: "8px", marginLeft: "20px" }}>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>No</th>
                <th>Name Siswa</th>
                <th>NISN</th>
                <th>Alamat</th>
                <th>Jurusan</th>
                <th>Umur</th>
                {/* Assuming you want to include actions here */}
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
                  <td>{user.umur}</td>
                  <td>
                    {/* Example actions */}
                    <Button variant="success" style={{ marginRight: "5px" }}>
                      <FontAwesomeIcon icon={faPenSquare} />
                    </Button>
                    <Button variant="danger">
                      <FontAwesomeIcon icon={faTrashAlt} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
        <Pagination>
          {[...Array(Math.ceil(filteredUsers.length / usersPerPage)).keys()].map(number => (
            <Pagination.Item key={number + 1} active={number + 1 === currentPage} onClick={() => setCurrentPage(number + 1)}>
              {number + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      </div>
    </>
  );
}

export default Data_siswa;
