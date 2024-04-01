import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Card, Form } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { useParams, useHistory } from 'react-router-dom';

const API_KELAS = 'http://localhost:8080/api/kelas';

function UpdateKelas() {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    namaJurusan: '',
    namaKelas: '',
    waliKelas: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_KELAS}/${id}`, {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
        });
        const data = response.data;
        setFormData({
          namaJurusan: data.namaJurusan,
          namaKelas: data.namaKelas,
          waliKelas: data.waliKelas,
        });
      } catch (error) {
        console.error('Fetch error:', error);
        Swal.fire('Error', 'Gagal memuat data kelas.', 'error');
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

  const updateClass = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`${API_KELAS}/${id}`, formData, {
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
          window.location.href = '/kelas';
        }
      });
    } catch (error) {
      console.error('Update error:', error.response || error);
      Swal.fire('Error', 'Terjadi kesalahan saat mengupdate data.', 'error');
    }
  };  

  return (
    <Card className="mx-auto my-3 p-4" style={{ maxWidth: '900px' }}>
      <h2 className="text-center mb-4">Edit Data Kelas</h2>
      <Form onSubmit={updateClass}>
        {/* Repeat for each form field */}
        <Form.Group controlId="namaJurusan">
          <Form.Label>Nama Jurusan</Form.Label>
          <Form.Control
            type="text"
            name="namaJurusan"
            value={formData.namaJurusan}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="namaKelas">
          <Form.Label>Nama Kelas:</Form.Label>
          <Form.Control
            type="text"
            name="namaKelas"
            value={formData.namaKelas}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="waliKelas">
          <Form.Label>Wali Kelas:</Form.Label>
          <Form.Control
            type="text"
            name="waliKelas"
            value={formData.waliKelas}
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

export default UpdateKelas;