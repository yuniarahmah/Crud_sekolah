import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Card, Form } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { useParams } from 'react-router-dom';

const API_SISWA = 'http://localhost:8080/api/data_siswa';

function UpdateItemForm() {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    nama_siswa: '',
    nisn: '',
    kelas: '',
    jurusan: '',
    alamat: '',
    hobi: '',
    umur: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_SISWA}/${id}`, {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
        });
        const data = response.data;
        setFormData({
          nama_siswa: data.nama_siswa,
          nisn: data.nisn,
          kelas: data.kelas,
          jurusan: data.jurusan,
          alamat: data.alamat,
          hobi: data.hobi,
          umur: data.umur,
        });
      } catch (error) {
        console.error('Fetch error:', error);
        Swal.fire('Error', 'Gagal memuat data siswa.', 'error');
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const updateStudent = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`${API_SISWA}/${id}`, formData, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
      });
      // Use Swal.fire to show a success message without a button, and with a timer.
      Swal.fire({
        title: 'Success!',
        text: 'Data berhasil diubah!',
        icon: 'success',
        timer: 1200, // Set the timer to 1200ms
        showConfirmButton: false, // Hide the confirm button
        willClose: () => {
          // Redirect after the Swal closes
          window.location.href = '/siswa';
        }
      });
    } catch (error) {
      console.error('Update error:', error.response || error);
      Swal.fire('Error', 'Terjadi kesalahan saat mengupdate data.', 'error');
    }
  };

  return (
    <Card className="mx-auto my-3 p-4" style={{ maxWidth: '900px' }}>
      <h2 className="text-center mb-4">Edit Data Siswa</h2>
      <Form onSubmit={updateStudent}>
        {/* Repeat for each form field */}
        <Form.Group controlId="nama_siswa">
          <Form.Label>Nama Siswa</Form.Label>
          <Form.Control
            type="text"
            name="nama_siswa"
            value={formData.nama_siswa}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="nisn">
          <Form.Label>NISN:</Form.Label>
          <Form.Control
            type="text"
            name="nisn"
            value={formData.nisn}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="kelas">
          <Form.Label>Kelas:</Form.Label>
          <Form.Control
            type="text"
            name="kelas"
            value={formData.kelas}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="jurusan">
          <Form.Label>Jurusan:</Form.Label>
          <Form.Control
            type="text"
            name="jurusan"
            value={formData.jurusan}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="alamat">
          <Form.Label>Alamat:</Form.Label>
          <Form.Control
            type="text"
            name="alamat"
            value={formData.alamat}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="hobi">
          <Form.Label>Hobi:</Form.Label>
          <Form.Control
            type="text"
            name="hobi"
            value={formData.hobi}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="umur">
          <Form.Label>Umur:</Form.Label>
          <Form.Control
            type="text"
            name="umur"
            value={formData.umur}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <div className="text-center my-2">
          <Button variant="primary" type="submit">
            Simpan
          </Button>
        </div>
      </Form>
    </Card>
  );
}

export default UpdateItemForm;