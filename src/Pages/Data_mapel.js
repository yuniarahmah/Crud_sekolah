import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table, Pagination, Form, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenSquare, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import Navbarcom from "../Component/Navbar";

function Data_mapel() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const history = useHistory();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    axios
      .get("http://localhost:8080/users") // Adjusted to local server endpoint
      .then((res) => {
        setUsers(res.data);
      })
      .catch((error) => {
        Swal.fire("Error!", "Terjadi kesalahan: " + error, "error");
      });
  };

  const deleteUserAndUpdateList = (id) => {
    axios
      .delete(`http://localhost:8080/users/${id}`) // Adjusted to local server endpoint
      .then(() => {
        fetchUsers(); // Refresh users list
        Swal.fire("Deleted!", "The user has been deleted.", "success");
      })
      .catch((error) => {
        console.error("Deletion error:", error);
        Swal.fire("Failed!", "The user could not be deleted.", "error");
      });
  };

  const handleEdit = (id) => {
    history.push(`/edit/${id}`); // Assuming you have a route set up for editing
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteUserAndUpdateList(id);
      }
    });
  };

  // Pagination
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Search
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset pagination to first page when searching
  };

  return (
    <>
      <Navbarcom />
      <div style={{ padding: "50px", marginTop: "10%" }}>
        <Form>
          <Form.Group controlId="formSearch" style={{ width: "10%" }}>
            <Form.Control
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </Form.Group>
        </Form>
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
              <th>Nama Pengguna</th>
              <th>Alamat</th>
              <th>Kota</th>
              <th>Nomor</th>
              <th>Email</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user, index) => (
              <tr key={user.id}>
                <td>{index + 1}</td>
                <td>{user.username}</td>
                <td>{user.address.street}</td>
                <td>{user.address.city}</td>
                <td>{user.address.number}</td>
                <td>{user.email}</td>
                <td style={{ display: "flex", gap: "1px", marginRight: "" }}>
                  <Button
                    variant="success"
                    onClick={() => handleEdit(user.id)}
                    style={{
                      marginLeft: "2%",
                      border: "10%",
                      borderRadius: "10%",
                      color: "white",
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faPenSquare}
                      style={{ marginRight: "2px" }}
                    />
                  </Button>
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

export default Data_mapel;
