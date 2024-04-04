import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Card, Form, Container, Row, Col } from 'react-bootstrap';
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
      await axios.put(`${API_SISWA}/${id}`, formData, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
      });
      Swal.fire({
        title: 'Success!',
        text: 'Data berhasil diubah!',
        icon: 'success',
        timer: 1200,
        showConfirmButton: false,
      }).then(() => {
        window.location.href = '/siswa';
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
            <h2 className="text-center mb-4">Edit Data Siswa</h2>
            <Form onSubmit={updateStudent}>
              {/* Adapt the Form.Group structure as seen in the example for each form field */}
              {/* Example for one field: */}
              <Form.Group as={Row} className="mb-3" controlId="nama_siswa">
                <Form.Label column sm="3">
                  Nama Siswa
                </Form.Label>
                <Col sm="9">
                  <Form.Control
                    type="text"
                    name="nama_siswa"
                    value={formData.nama_siswa}
                    onChange={handleChange}
                    required
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3" controlId="nisn">
                <Form.Label column sm="3">
                  Nisn
                </Form.Label>
                <Col sm="9">
                  <Form.Control
                    type="text"
                    name="nisn"
                    value={formData.nisn}
                    onChange={handleChange}
                    required
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3" controlId="kelas">
                <Form.Label column sm="3">
                  Kelas
                </Form.Label>
                <Col sm="9">
                  <Form.Control
                    type="text"
                    name="kelas"
                    value={formData.kelas}
                    onChange={handleChange}
                    required
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3" controlId="jurusan">
                <Form.Label column sm="3">
                  Jurusan
                </Form.Label>
                <Col sm="9">
                  <Form.Control
                    type="text"
                    name="jurusan"
                    value={formData.jurusan}
                    onChange={handleChange}
                    required
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3" controlId="alamat">
                <Form.Label column sm="3">
                  Alamat
                </Form.Label>
                <Col sm="9">
                  <Form.Control
                    type="text"
                    name="alamat"
                    value={formData.alamat}
                    onChange={handleChange}
                    required
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3" controlId="hobi">
                <Form.Label column sm="3">
                  Hobi
                </Form.Label>
                <Col sm="9">
                  <Form.Control
                    type="text"
                    name="hobi"
                    value={formData.hobi}
                    onChange={handleChange}
                    required
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3" controlId="umur">
                <Form.Label column sm="3">
                  Umur
                </Form.Label>
                <Col sm="9">
                  <Form.Control
                    type="text"
                    name="umur"
                    value={formData.umur}
                    onChange={handleChange}
                    required
                  />
                </Col>
              </Form.Group>
              {/* Repeat the structure above for the remaining fields: nisn, kelas, jurusan, alamat, hobi, umur */}

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

export default UpdateItemForm;
