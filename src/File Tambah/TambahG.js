import React, { useState } from "react";
import { Button, Form, Card } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom"; // Make sure to import useHistory

function TambahGuru() {
  const [nama_guru, setNama_Guru] = useState("");
  const [nik, setNIK] = useState("");
  const [alamat_guru, setAlamat_Guru] = useState("");
  const [nomer_hp, setNomer_hp] = useState("");
  const history = useHistory();

  // Fungsi untuk menangani submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Membuat objek siswa dari state
    const guru = {
      nama_guru : nama_guru,
      nik,
      alamat_guru,
      nomer_hp
    }; // Keep 'umur' as is

    try {
      // Mengirim data siswa ke server/API
      await axios.post("http://localhost:8080/api/guru", guru, {
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
          window.location.href = "/guru"; // Arahkan ke halaman "siswa" dengan full page reload
        },
      });

      // Optional: Reset state
      setNama_Guru("");
      setNIK("");
      setAlamat_Guru("");
      setNomer_hp("");
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
      <h2 className="text-center mb-4">Tambah Guru</h2>
      <Form onSubmit={handleSubmit}>
        {/* Form fields */}
        <Form.Group className="mb-3">
          <Form.Label>Nama Guru</Form.Label>
          <Form.Control
            type="text"
            value={nama_guru}
            onChange={(e) => setNama_Guru(e.target.value)}
            placeholder="Isi dengan nama guru"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Nik</Form.Label>
          <Form.Control
            type="number"
            value={nik}
            onChange={(e) => setNIK(e.target.value)}
            placeholder="silahkan ketik nik Guru"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Alamat Guru</Form.Label>
          <Form.Control
            type="text"
            value={alamat_guru}
            onChange={(e) => setAlamat_Guru(e.target.value)}
            placeholder="silahkan ketik alamat guru"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Nomer Hp</Form.Label>
          <Form.Control
            type="number"
            value={nomer_hp}
            onChange={(e) => setNomer_hp(e.target.value)}
            placeholder="silahkan ketik Nomer hp"
            required
          />
        </Form.Group>
        {/* Other Form Groups for NISN, Kelas, Jurusan, Alamat */}
        <Button variant="primary" type="submit">
          Tambah Guru
        </Button>
      </Form>
    </Card>
  );
}

export default TambahGuru;
