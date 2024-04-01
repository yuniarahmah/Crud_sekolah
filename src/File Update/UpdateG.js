import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Card, Form } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { useParams, useHistory } from 'react-router-dom';

const API_GURU = 'http://localhost:8080/api/guru';

function UpdateGuru() {
  const { id } = useParams();
  const history = useHistory(); // Ini digunakan untuk navigasi
  const [formData, setFormData] = useState({
    nik: '',
    nama_guru: '',
    alamat_guru: '',
    nomer_hp: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_GURU}/${id}`, {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
        });
        const data = response.data;
        setFormData({
          nama_guru: data.nama_guru,
          nik: data.nik,
          alamat_guru: data.alamat_guru,
          nomer_hp: data.nomer_hp,
        });
      } catch (error) {
        console.error('Fetch error:', error);
        Swal.fire('Error', 'Gagal memuat data guru.', 'error');
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

  const updateGuru = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${API_GURU}/${id}`, formData, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
      });
      Swal.fire({
        title: 'Sukses!',
        text: 'Data berhasil diubah!',
        icon: 'success',
        timer: 1200,
        showConfirmButton: false
      }).then(() => {
        history.goBack(); // Mengganti window.location.href dengan history.push untuk navigasi
      });
    } catch (error) {
      console.error('Update error:', error.response || error);
      Swal.fire('Error', 'Terjadi kesalahan saat mengupdate data.', 'error');
    }
  };

  return (
    <Card className="mx-auto my-3 p-4" style={{ maxWidth: '900px' }}>
      <h2 className="text-center mb-4">Edit Data Guru</h2>
      <Form onSubmit={updateGuru}>
        {/* Form fields */}
        <Form.Group controlId="nama_guru">
          <Form.Label>Nama Guru</Form.Label>
          <Form.Control
            type="text"
            name="nama_guru"
            value={formData.nama_guru}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="nik">
          <Form.Label>NIK</Form.Label>
          <Form.Control
            type="text"
            name="nik"
            value={formData.nik}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="alamat_guru">
          <Form.Label>Alamat Guru</Form.Label>
          <Form.Control
            type="text"
            name="alamat_guru"
            value={formData.alamat_guru}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="nomer_hp">
          <Form.Label>Nomer HP</Form.Label>
          <Form.Control
            type="text"
            name="nomer_hp"
            value={formData.nomer_hp}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <div className="text-center my-2">
          <Button variant="primary" type="submit">Simpan</Button>
        </div>
      </Form>
    </Card>
  );
}

export default UpdateGuru;