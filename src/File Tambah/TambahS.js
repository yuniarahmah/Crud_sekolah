import React, { useState } from "react";
import { Button, Form, Card } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom"; // Make sure to import useHistory

function TambahSiswa() {
  const [namaSiswa, setNamaSiswa] = useState("");
  const [nisn, setNisn] = useState("");
  const [kelas, setKelas] = useState("");
  const [jurusan, setJurusan] = useState("");
  const [alamat, setAlamat] = useState("");
  const [hobi, setHobi] = useState("");
  const [umur, setUmur] = useState(""); // Change this line to use lowercase 'umur'
  const history = useHistory();

  // Fungsi untuk menangani submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Membuat objek siswa dari state
    const siswa = {
      nama_siswa: namaSiswa,
      nisn,
      kelas,
      jurusan,
      alamat,
      hobi,
      umur,
    }; // Keep 'umur' as is

    try {
      // Mengirim data siswa ke server/API
      await axios.post("http://localhost:8080/api/data_siswa", siswa, {
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
          window.location.href = "/siswa"; // Arahkan ke halaman "siswa" dengan full page reload
        },
      });

      // Optional: Reset state
      setNamaSiswa("");
      setNisn("");
      setKelas("");
      setJurusan("");
      setAlamat("");
      setHobi("");
      setUmur("");
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
          <Form.Label>Nama Siswa</Form.Label>
          <Form.Control
            type="text"
            value={namaSiswa}
            onChange={(e) => setNamaSiswa(e.target.value)}
            placeholder="Isi dengan nama anda"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>NISN</Form.Label>
          <Form.Control
            type="number"
            value={nisn}
            onChange={(e) => setNisn(e.target.value)}
            placeholder="silahkan ketik Nisn anda"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Hobi</Form.Label>
          <Form.Control
            type="text"
            value={hobi}
            onChange={(e) => setHobi(e.target.value)}
            placeholder="Silahkan tulis hobi anda"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Umur</Form.Label>
          <Form.Control
            type="number"
            value={umur}
            onChange={(e) => setUmur(e.target.value)}
            placeholder="Silahkan isi data umur anda"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Jurusan</Form.Label>
          <Form.Control
            type="text"
            value={jurusan}
            onChange={(e) => setJurusan(e.target.value)}
            placeholder="silahkan ketikan jurusan anda"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>kelas</Form.Label>
          <Form.Control
            type="text"
            value={kelas}
            onChange={(e) => setKelas(e.target.value)}
            placeholder="silahkan ketik kelas anda"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Alamat</Form.Label>
          <Form.Control
            type="text"
            value={alamat}
            onChange={(e) => setAlamat(e.target.value)}
            placeholder="ketikan alamat an"
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

export default TambahSiswa;
