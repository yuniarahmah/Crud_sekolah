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
          await axios.delete(`http://localhost:8080/api/mapel/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          Swal.fire(
            "Hapus!",
            "Data sudah terhapus secara permanen",
            "success"
          ).then(() => {
            setMapel(mapel.filter((mapel) => mapel.id !== id));
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
        <h1 style={{ marginBottom: "4%" }}>Tabel Data Mapel</h1>
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
              className="btn btn-primary"
              style={{ textDecoration: "none", color: "white" }}
            >
              <FontAwesomeIcon icon={faPlus} />
            </a>
          </Col>
        </Row>
        <div
          className="table-responsive" id="wrapper"
          style={{ marginTop: "8px", marginLeft: "20px" }}
        >
          <table cellSpacing="0" cellPadding="0" id="keywords">
            <thead>
              <tr>
                <th>No</th>
                <th>Nama Guru Mapel</th>
                <th>Nama Mapel</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {currentMapel.map((item, index) => (
                <tr key={item.id}>
                  <td>{(currentPage - 1) * mapelPerPage + index + 1}</td>
                  <td>{item.nama_guru_mapel}</td>
                  <td>{item.nama_mapel}</td>
                  <td style={{ display: "flex", gap: "10px" }}>
                    <a
                      href={`/update_mapel/${item.id}`}
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
                      onClick={() => handleDelete(item.id)}
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
            { length: Math.ceil(mapel.length / mapelPerPage) },
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
            disabled={currentPage === Math.ceil(mapel.length / mapelPerPage)}
          />
        </Pagination>
      </div>
    </>
  );
}

export default Data_mapel;
