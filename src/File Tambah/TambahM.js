import React, { useState } from "react";
import { Button, Form, Card } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom"; // Make sure to import useHistory

function TambahMapel() {
  const [nama_guru_mapel, setNama_Guru_Mapel] = useState("");
  const [nama_mapel, setNama_mapel] = useState("");
  const history = useHistory();

  // Fungsi untuk menangani submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Membuat objek siswa dari state
    const mapel = {
      nama_mapel: nama_mapel,
      nama_guru_mapel
    }; // Keep 'umur' as is

    try {
      // Mengirim data siswa ke server/API
      await axios.post("http://localhost:8080/api/mapel", mapel, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      // Menampilkan pesan sukses dengan timer
      Swal.fire({
        title: "Success!",
        text: "Siswa berhasil ditambahkan.",
        icon: "success",
        timer: 1000, // Timer selama 2000 ms atau 2 detik
        timerProgressBar: true, // Menampilkan progress bar pada timer
        showConfirmButton: false, // Tidak menampilkan tombol konfirmasi
        didClose: () => {
          window.location.href = "/mapel"; // Arahkan ke halaman "siswa" dengan full page reload
        },
      });

      // Optional: Reset state
      setNama_mapel("");
      setNama_Guru_Mapel("");
    } catch (error) {
      // Menampilkan pesan error
      Swal.fire(
        "Error!",
        `Terjadi kesalahan: ${error.response?.data?.message || error.message}`,
        "error"
      );
    }
  };

  return (
    <Card className="mx-auto my-3 p-4" style={{ maxWidth: "900px" }}>
      <h2 className="text-center mb-4">Tambah Siswa</h2>
      <Form onSubmit={handleSubmit}>
        {/* Form fields */}
        <Form.Group className="mb-3">
          <Form.Label>Nama Guru Mapel</Form.Label>
          <Form.Control
            type="text"
            value={nama_guru_mapel}
            onChange={(e) => setNama_Guru_Mapel(e.target.value)}
            placeholder="Isi dengan nama anda"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Nama Mapel</Form.Label>
          <Form.Control
            type="text"
            value={nama_mapel}
            onChange={(e) => setNama_mapel(e.target.value)}
            placeholder="silahkan ketik Nisn anda"
            required
          />
        </Form.Group>
        {/* Other Form Groups for NISN, Kelas, Jurusan, Alamat */}
        <Button variant="primary" type="submit">
          Tambah Siswa
        </Button>
      </Form>
    </Card>
  );
}

export default TambahMapel;
