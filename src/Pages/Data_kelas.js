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
import Navbarcom from "../Component/Navbar";
import Swal from "sweetalert2";

function Data_kelas() {
  const [kelas, setKelas] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [kelasPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const history = useHistory();

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/kelas", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(res.data.data); // Log the data for inspection
        setKelas(res.data);
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
          await axios.delete(`http://localhost:8080/api/kelas/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          Swal.fire(
            "Hapus!",
            "Data sudah terhapus secara permanen",
            "success"
          ).then(() => {
            setKelas(kelas.filter((kelas) => kelas.id !== id));
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

  const filteredKelas = kelas.filter((kelasItem) => {
    // Gunakan toLowerCase() pada searchTerm sekali saja untuk efisiensi
    const searchLower = searchTerm.toLowerCase();

    // Cek eksistensi dan kondisi pencarian dengan optional chaining dan nullish coalescing
    const namaJurusanExists =
      kelasItem?.namaJurusan?.toLowerCase().includes(searchLower) ?? false;
    const namaKelasExists =
      kelasItem?.namaKelas?.toLowerCase().includes(searchLower) ?? false;
    const waliKelasExists =
      kelasItem?.waliKelas?.toLowerCase().includes(searchLower) ?? false;

    return namaJurusanExists || namaKelasExists || waliKelasExists;
  });

  // Pagination
  const indexOfLastUser = currentPage * kelasPerPage;
  const indexOfFirstUser = indexOfLastUser - kelasPerPage;
  const currentkelas = filteredKelas.slice(indexOfFirstUser, indexOfLastUser);

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
  <h1 style={{ marginBottom: "4%" }}>Tabel Data Kelas</h1>
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
        href="/tambahkelas"
        className="btn btn-primary"
        style={{ textDecoration: "none", color: "white" }}
      >
        <FontAwesomeIcon icon={faPlus} />
      </a>
    </Col>
  </Row>
  <div
    className="table-responsive"
    id="wrapper"
    style={{ marginTop: "8px", marginLeft: "20px" }}
  >
    <table id="keywords" cellSpacing="0" cellPadding="0">
      <thead>
        <tr>
          <th>No</th>
          <th>Nama Jurusan</th>
          <th>Nama Kelas</th>
          <th>Wali Kelas</th>
          <th>Aksi</th>
        </tr>
      </thead>
      <tbody>
        {currentkelas.map((kelas, index) => (
          <tr key={kelas.id}>
            <td>{index + 1 + (currentPage - 1) * kelasPerPage}</td>
            <td>{kelas.namaJurusan}</td>
            <td>{kelas.namaKelas}</td>
            <td>{kelas.waliKelas}</td>
            <td style={{ display: "flex", gap: "10px" }}>
              <a
                href={`/update_kelas/${kelas.id}`}
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
                onClick={() => handleDelete(kelas.id)}
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
  <Pagination>
    <Pagination.Prev
      onClick={() => paginate(currentPage - 1)}
      disabled={currentPage === 1}
    />
    {Array.from(
      { length: Math.ceil(filteredKelas.length / kelasPerPage) },
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
      disabled={currentPage === Math.ceil(filteredKelas.length / kelasPerPage)}
    />
  </Pagination>
</div>

    </>
  );
}

export default Data_kelas;
