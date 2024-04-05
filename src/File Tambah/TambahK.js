import React, { useState } from "react";
import { Button, Form, Card, Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";

function TambahKelas() {
  const [namaJurusan, setNamaJurusan] = useState("");
  const [namaKelas, setNamaKelas] = useState("");
  const [waliKelas, setWaliKelas] = useState("");
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const kelas = { namaJurusan, namaKelas, waliKelas };

    try {
      await axios.post("http://localhost:8080/api/kelas", kelas, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      Swal.fire({
        title: "Success!",
        text: "kelas berhasil ditambahkan.",
        icon: "success",
        timer: 1000, // Timer selama 2000 ms atau 2 detik
        timerProgressBar: true, // Menampilkan progress bar pada timer
        showConfirmButton: false, // Tidak menampilkan tombol konfirmasi
        didClose: () => {
          window.location.href = "/kelas"; // Arahkan ke halaman "siswa" dengan full page reload
        },
      });
    } catch (error) {
      Swal.fire(
        "Error!",
        `Terjadi kesalahan: ${error.response?.data?.message || error.message}`,
        "error"
      );
    }
  };

  return (
    <Container style={{ paddingTop: "10vh", paddingBottom: "5vh" }}>
      <Row>
        <Col xs={12} md={8} lg={6} className="mx-auto">
          <Card className="p-4">
            <h2 className="text-center mb-4">Tambah Kelas</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Nama Jurusan</Form.Label>
                <Form.Control
                  type="text"
                  value={namaJurusan}
                  onChange={(e) => setNamaJurusan(e.target.value)}
                  placeholder="Isi Nama Jurusan"
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Nama Kelas</Form.Label>
                <Form.Control
                  type="text"
                  value={namaKelas}
                  onChange={(e) => setNamaKelas(e.target.value)}
                  placeholder="Isi Nama Kelas"
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Wali Kelas</Form.Label>
                <Form.Control
                  type="text"
                  value={waliKelas}
                  onChange={(e) => setWaliKelas(e.target.value)}
                  placeholder="Isi Nama Wali Kelas"
                  required
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Tambah Kelas
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default TambahKelas;
