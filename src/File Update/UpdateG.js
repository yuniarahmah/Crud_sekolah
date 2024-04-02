import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
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
    <Container className="mt-5">
    <Row className="justify-content-md-center">
      <Col xs={12} md={8} lg={6}>
        <Card className="p-4">
          <h2 className="text-center mb-4">Edit Data Guru</h2>
          <Form onSubmit={updateGuru}>
            {/* Form fields with Col for better spacing and alignment */}
            <Form.Group as={Row} className="mb-3" controlId="nama_guru">
              <Form.Label column sm="3">
                Nama Guru
              </Form.Label>
              <Col sm="9">
                <Form.Control
                  type="text"
                  name="nama_guru"
                  value={formData.nama_guru}
                  onChange={handleChange}
                  required
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="nik">
              <Form.Label column sm="3">
                NIK
              </Form.Label>
              <Col sm="9">
                <Form.Control
                  type="text"
                  name="nik"
                  value={formData.nik}
                  onChange={handleChange}
                  required
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="alamat_guru">
              <Form.Label column sm="3">
                Alamat Guru
              </Form.Label>
              <Col sm="9">
                <Form.Control
                  type="text"
                  name="alamat_guru"
                  value={formData.alamat_guru}
                  onChange={handleChange}
                  required
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="nomer_hp">
              <Form.Label column sm="3">
                Nomer HP
              </Form.Label>
              <Col sm="9">
                <Form.Control
                  type="text"
                  name="nomer_hp"
                  value={formData.nomer_hp}
                  onChange={handleChange}
                  required
                />
              </Col>
            </Form.Group>

            <div className="text-center my-2">
              <Button variant="primary" type="submit">Simpan</Button>
            </div>
          </Form>
        </Card>
      </Col>
    </Row>
  </Container>
  );
}

export default UpdateGuru;