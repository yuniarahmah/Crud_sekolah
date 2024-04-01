import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table, Pagination, Form, Button, Row, Col } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenSquare,
  faPlus,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import Navbarcom from "../Component/Navbar";

function Data_mapel() {
  const [mapel, setMapel] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [mapelPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const history = useHistory();

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/mapel", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Gunakan token di sini
        },
      })
      .then((res) => {
        setMapel(res.data);
      })
      .catch((error) => {
        Swal.fire("Error", "Terjadi kesalahan: " + error.message, "error");
      });
  }, []); // Gunakan array kosong untuk memanggil hanya sekali saat komponen dimuat

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
          await axios.delete(`http://localhost:8080/api/mapel/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          Swal.fire("Deleted!", "The user has been deleted.", "success").then(
            () => {
              setMapel(mapel.filter((mapel) => mapel.id !== id));
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

  // Filter data berdasarkan pencarian
  const filteredMapel = mapel.filter(
    (mapel) =>
      mapel.nama_guru_mapel.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mapel.nama_mapel.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination
  const indexOfLastUser = currentPage * mapelPerPage;
  const indexOfFirstUser = indexOfLastUser - mapelPerPage;
  const currentMapel = filteredMapel.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Fungsi penanganan perubahan pada kolom pencarian
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Atur halaman saat ini kembali ke halaman pertama ketika melakukan pencarian
  };

  return (
    <>
      <Navbarcom />
      <div style={{ padding: "50px", marginTop: "10%" }}>
        <h1 style={{ marginBottom: "4%" }}> Tabel Data Mapel</h1>
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
              href="/tambah_mapel"
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
              <th>Nama Guru Mapel</th>
              <th>Nama Mapel</th>
              {/* Tambahkan kolom lain di sini sesuai kebutuhan */}
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {currentMapel.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.nama_guru_mapel}</td>
                <td>{item.nama_mapel}</td>
                {/* Tambahkan kolom lain di sini sesuai kebutuhan */}
                <td style={{ display: "flex", gap: "1px", marginRight: "" }}>
                  <a
                    href={`/update_mapel/${item.id}`} // Perbaikan di sini
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
                    onClick={() => handleDelete(item.id)}
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
          {[
            ...Array(Math.ceil(filteredMapel.length / mapelPerPage)).keys(),
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

export default Data_mapel;
