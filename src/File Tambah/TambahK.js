import React, { useState } from "react";
import { Button, Form, Card } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";

function TambahKelas() {
  const [namaJurusan, setNama_jurusan] = useState("");
  const [namaKelas, setNama_kelas] = useState("");
  const [waliKelas, setWali_kelas] = useState("");
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Perbaikan terdapat di sini
    const kelas = {
      namaJurusan: namaJurusan, // menggunakan nama_jurusan yang sudah didefinisikan
      namaKelas,
      waliKelas,
    };

    try {
      await axios.post("http://localhost:8080/api/kelas", kelas, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
    
      Swal.fire({
        title: "Success!",
        text: "Siswa berhasil ditambahkan.",
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
    <Card className="mx-auto my-3 p-4" style={{ maxWidth: "900px" }}>
      <h2 className="text-center mb-4">Tambah Kelas</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Nama Jurusan</Form.Label>
          <Form.Control
            type="text"
            value={namaJurusan}
            onChange={(e) => setNama_jurusan(e.target.value)}
            placeholder="Isi Nama Jurusan"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Nama Kelas</Form.Label>
          <Form.Control
            type="text"
            value={namaKelas}
            onChange={(e) => setNama_kelas(e.target.value)}
            placeholder="Isi Nama Kelas"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Wali Kelas</Form.Label>
          <Form.Control
            type="text"
            value={waliKelas}
            onChange={(e) => setWali_kelas(e.target.value)}
            placeholder="Isi Nama Wali Kelas"
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Tambah Kelas
        </Button>
      </Form>
    </Card>
  );
}

export default TambahKelas;
