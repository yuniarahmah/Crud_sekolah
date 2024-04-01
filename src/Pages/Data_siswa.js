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
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const token = localStorage.getItem("token");
          await axios.delete(`http://localhost:8080/api/data_siswa/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          Swal.fire("Deleted!", "The user has been deleted.", "success").then(
            () => {
              setUsers(users.filter((user) => user.id !== id));
            }
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
      <div style={{ padding: "50px", marginTop: "10%" }}>
        <h1 style={{ marginBottom: "4%" }}> Tabel Data Siswa</h1>
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
            <a
              href="/tambah_siswa"
              className="btn btn-primary" // Use Bootstrap primary button class
              style={{
                textDecoration: "none", // Remove underline from link
                color: "white", // Set text color to white for visibility
                display: "inline-flex", // Align items in a flex container
                alignItems: "center", // Center items vertically
                justifyContent: "center", // Center items horizontally
                padding: "0.375rem 0.75rem", // Adjust padding to match Bootstrap buttons
                fontSize: "1.5rem", // Adjust font size to match Bootstrap buttons
                lineHeight: 1.8, // Adjust line height to match Bootstrap buttons
                borderRadius: "0.25rem", // Set border radius to match Bootstrap buttons
              }}
            >
              <FontAwesomeIcon icon={faPlus} />
            </a>{" "}
          </Col>
        </Row>
        <Table
          striped
          bordered
          hover
          style={{
            marginTop: "8px",
            marginLeft: "20px",
            width: "calc(95% - 10px)",
          }}
        >
          <thead>
            <tr>
              <th>No</th>
              <th>Nama Siswa</th>
              <th>Nisn</th>
              <th>Kelas</th>
              <th>Jurusan</th>
              <th>Hobi</th>
              <th>Alamat</th>
              <th>Umur</th>
              <th>aksi</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user, index) => (
              <tr key={user.id}>
                <td>{index + 1}</td>
                <td>{user.nama_siswa}</td>
                <td>{user.nisn}</td>
                <td>{user.kelas}</td>
                <td>{user.jurusan}</td>
                <td>{user.hobi}</td>
                <td>{user.alamat}</td>
                <td>{user.umur}</td>
                <td style={{ display: "flex", gap: "1px", marginRight: "" }}>
                  {/* <Link
                    to={`/edit_murid/${user.id}`}
                    className="btn btn-primary me-2"
                  />
                    
                    </Link> */}
                  <a
                    href={`/data_siswa/${user.id}`}
                    className="btn btn-success" // Use Bootstrap button classes
                    style={{
                      textDecoration: "none", // Remove underline from link
                      color: "white", // Set text (icon) color
                      display: "inline-flex", // Use flex to align icon and text
                      alignItems: "center", // Center items vertically
                      justifyContent: "center", // Center items horizontally
                      padding: "0.375rem 0.75rem", // Bootstrap button padding
                      fontSize: "1rem", // Font size to match Bootstrap buttons
                      lineHeight: 1.5, // Line height to match Bootstrap buttons
                      borderRadius: "0.25rem", // Border radius to match Bootstrap buttons
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
                      border: "10%",
                      borderRadius: "10%",
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
        </Table>
        <Pagination>
          {[...Array(Math.ceil(users.length / usersPerPage)).keys()].map(
            (number) => (
              <Pagination.Item
                key={number + 1}
                active={number + 1 === currentPage}
                onClick={() => paginate(number + 1)}
              >
                {number + 1}
              </Pagination.Item>
            )
          )}
        </Pagination>
      </div>
    </>
  );
}

export default Data_siswa;
