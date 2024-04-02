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
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Use the token here
        },
      })
      .then((res) => {
        setUsers(res.data);
      })
      .catch((error) => {
        Swal.fire("Error", "Terjadi kesalahan: " + error.message, "error");
      });
  }, []);

  const handleDelete = async (id) => {
    // Same as your previous handleDelete function
  };

  const filteredUsers = users.filter(
    (user) =>
      user.nama_siswa?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.nisn?.toString().includes(searchTerm) ||
      user.kelas?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.jurusan?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.hobi?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.alamat?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.umur?.toString().includes(searchTerm)
  );

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <Navbarcom />
      <div className="container mt-5 pt-5">
        <h1 className="my-4">Tabel Data Siswa</h1>
        <Row className="mb-4">
          <Col md={4}>
            <Form.Group controlId="formSearch">
              <Form.Control
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={{ span: 4, offset: 4 }} className="text-right">
            <Button href="/tambah_siswa" variant="primary" className="btn-sm">
              <FontAwesomeIcon icon={faPlus} /> Tambah Siswa
            </Button>
          </Col>
        </Row>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>No</th>
              <th>Name Siswa</th>
              <th>NISN</th>
              <th>Alamat</th>
              <th>Jurusan</th>
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
                <td>{user.umur}</td>
                <td>
                  <div style={{ display: "flex", gap: "10px" }}>
                    <button
                      className="btn-edit"
                      onClick={() => history.push(`/update_siswa/${user.id}`)}
                    >
                      <FontAwesomeIcon icon={faPenSquare} />
                    </button>
                    <button
                      className="btn-delete"
                      onClick={() => handleDelete(user.id)}
                    >
                      <FontAwesomeIcon icon={faTrashAlt} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Pagination className="justify-content-center">
          {[
            ...Array(Math.ceil(filteredUsers.length / usersPerPage)).keys(),
          ].map((number) => (
            <Pagination.Item
              key={number + 1}
              active={number + 1 === currentPage}
              onClick={() => paginate(number + 1)}
            >
              {number + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      </div>
    </>
  );
}

export default Data_siswa;
