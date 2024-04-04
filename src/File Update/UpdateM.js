import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import Swal from "sweetalert2";
import { useParams, useHistory } from "react-router-dom";

const API_MAPEL = "http://localhost:8080/api/mapel";

function UpdateMapel() {
  const { id } = useParams();
  const history = useHistory();
  const [formData, setFormData] = useState({
    nama_mapel: "",
    nama_guru_mapel: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_MAPEL}/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        const data = response.data;
        setFormData({
          nama_mapel: data.nama_mapel,
          nama_guru_mapel: data.nama_guru_mapel,
        });
      } catch (error) {
        console.error("Fetch error:", error);
        Swal.fire("Error", "Gagal memuat data Mapel.", "error");
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const updateMapel = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${API_MAPEL}/${id}`, formData, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
      });
      // Use Swal.fire to show a success message without a button, and with a timer.
      Swal.fire({
        title: 'Success!',
        text: 'Data berhasil diubah!',
        icon: 'success',
        timer: 1200,
        showConfirmButton: false,
      }).then(() => {
        window.location.href = '/mapel';
      });
    } catch (error) {
      console.error("Update error:", error.response || error);
      Swal.fire("Error", "Terjadi kesalahan saat mengupdate data.", "error");
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col xs={12} md={8} lg={6}>
          <Card className="p-4">
            <h2 className="text-center mb-4">Edit Data Mapel</h2>
            <Form onSubmit={updateMapel}>
              {/* Dynamically create form fields */}

              <Form.Group as={Row} className="mb-3" controlId="nama_guru_mapel">
                <Form.Label column sm="3">
                  Nama Guru Mapel
                </Form.Label>
                <Col sm="9">
                  <Form.Control
                    type="text"
                    name="nama_guru_mapel"
                    value={formData.nama_guru_mapel}
                    onChange={handleChange}
                    required
                  />
                </Col>
              </Form.Group>
              
              <Form.Group as={Row} className="mb-3" controlId="nama_mapel">
                <Form.Label column sm="3">
                  Nama Mapel
                </Form.Label>
                <Col sm="9">
                  <Form.Control
                    type="text"
                    name="nama_mapel"
                    value={formData.nama_mapel}
                    onChange={handleChange}
                    required
                  />
                </Col>
              </Form.Group>

              <div className="text-center my-2">
                <Button variant="primary" type="submit">
                  Simpan
                </Button>
              </div>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default UpdateMapel;
