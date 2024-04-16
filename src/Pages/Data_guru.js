import axios from "axios";
import React, { useEffect, useState } from "react";
import { table, Pagination, Form, Button, Row, Col } from "react-bootstrap";
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

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/guru", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log("Data received:",res.data); // Tambahkan ini untuk melihat data yang diterima
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
          Swal.fire(
            "Hapus!",
            "Data sudah terhapus secara permanen",
            "success"
          ).then(() => {
            setGuru(guru.filter((guru) => guru.id !== id));
          });
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
        <h1 style={{ marginBottom: "4%" }}>Tabel Data Guru</h1>
        <Row>
          <Col md={12}>
            <div className="table-responsive" id="wrapper">
              <div className="d-flex justify-content-between mb-2">
                <Form.Group controlId="formSearch" className="mb-0">
                  <Form.Control
                    type="text"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </Form.Group>
                <a
                  href="/tambah_guru"
                  className="btn btn-primary"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  <FontAwesomeIcon icon={faPlus} /> Tambah Guru
                </a>
              </div>
              <table id="keywords" cellSpacing="0" cellPadding="0">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Nama Guru</th>
                    <th>Mapel</th>
                    <th>Nik</th>
                    <th>Alamat Guru</th>
                    <th>Nomer Hp</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {currentGuru.map((guru, index) => (
                    <tr key={guru.id}>
                      <td>{index + 1 + (currentPage - 1) * guruPerPage}</td>
                      <td>{guru.nama_guru}</td>
                      <td>
                        {guru.mapel ? guru.mapel.namaMapel : "Tidak Tersedia"}
                      </td>
                      <td>{guru.nik}</td>
                      <td>{guru.alamat_guru}</td>
                      <td>{guru.nomer_hp}</td>
                      <td style={{ display: "flex", gap: "10px" }}>
                        <a
                          href={`/update_guru/${guru.id}`}
                          className="btn btn-success"
                          style={{ textDecoration: "none", color: "white" }}
                        >
                          <FontAwesomeIcon icon={faPenSquare} />
                        </a>
                        <Button
                          variant="danger"
                          onClick={() => handleDelete(guru.id)}
                        >
                          <FontAwesomeIcon icon={faTrashAlt} />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="d-flex justify-content-center mt-4">
                <Pagination>
                  <Pagination.Prev
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                  />
                  {Array.from(
                    { length: Math.ceil(guru.length / guruPerPage) },
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
                    disabled={
                      currentPage === Math.ceil(guru.length / guruPerPage)
                    }
                  />
                </Pagination>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default DataGuru;
