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
import Swal from "sweetalert2"; // Make sure to install sweetalert2 if you haven't
import Navbarcom from "../Component/Navbar";

function DataGuru() {
  const [guru, setGuru] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [guruPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const history = useHistory();

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/guru", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setGuru(res.data);
      })
      .catch((error) => {
        Swal.fire("Error", "Terjadi kesalahan: " + error.message, "error");
      });
  }, []);

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Yakin ingin menghapus data ini?",
      text: "jika dihapus maka data tidak dapat dipulihkan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ya, hapus data ini!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const token = localStorage.getItem("token");
          await axios.delete(`http://localhost:8080/api/guru/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          Swal.fire("Hapus!", "Data sudah terhapus secara permanen", "success").then(
            () => {
              setGuru(guru.filter((guru) => guru.id !== id));
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

  const filteredGuru = guru.filter((g) =>
    [g.nama_guru, g.nik, g.alamat_guru, g.nomer_hp].some((field) =>
      field.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const indexOfLastGuru = currentPage * guruPerPage;
  const indexOfFirstGuru = indexOfLastGuru - guruPerPage;
  const currentGuru = filteredGuru.slice(indexOfFirstGuru, indexOfLastGuru);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  return (
    <>
      <Navbarcom />
      <div style={{ padding: "50px", marginTop: "10%" }}>
      <h1 style={{ marginBottom: '4%' }}> Tabel Data Guru</h1>
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
              href="/tambah_guru"
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
              <th>Nama Guru</th>
              <th>Nik</th>
              <th>Alamat Guru</th>
              <th>Nomer Hp</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {currentGuru.map(
              (
                guru,
                index // Corrected from currentguru to currentGuru
              ) => (
                <tr key={guru.id}>
                  <td>{index + 1 + (currentPage - 1) * guruPerPage}</td>{" "}
                  {/* Adjusted index to show correct numbering */}
                  <td>{guru.nama_guru}</td>
                  <td>{guru.nik}</td>
                  <td>{guru.alamat_guru}</td>
                  <td>{guru.nomer_hp}</td>
                  <td
                    style={{
                      display: "flex",
                      gap: "10px",
                      // justifyContent: "center",
                    }}
                  >
                    <a
                      href={`/update_guru/${guru.id}`}
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
                      onClick={() => handleDelete(guru.id)}
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
              )
            )}
          </tbody>
        </Table>
        <Pagination>
          {[...Array(Math.ceil(guru.length / guruPerPage)).keys()].map(
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

export default DataGuru;
