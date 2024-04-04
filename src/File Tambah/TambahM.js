import React, { useState } from "react";
import { Button, Form, Card, Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom"; // Ensure useHistory is imported

function TambahMapel() {
  const [nama_guru_mapel, setNama_Guru_Mapel] = useState("");
  const [nama_mapel, setNama_mapel] = useState("");
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const mapel = {
      nama_mapel: nama_mapel,
      nama_guru_mapel
    };

    try {
      await axios.post("http://localhost:8080/api/mapel", mapel, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      Swal.fire({
        title: "Success!",
        text: "Mapel berhasil ditambahkan.",
        icon: "success",
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false,
      }).then(() => {
        history.push("/mapel"); // Redirecting using React Router for smoother page transition
      });

      setNama_mapel("");
      setNama_Guru_Mapel("");
    } catch (error) {
      Swal.fire(
        "Error!",
        `Terjadi kesalahan: ${error.response?.data?.message || error.message}`,
        "error"
      );
    }
  };

  return (
    <Container style={{ paddingTop: "20px", paddingBottom: "20px" }}>
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="p-4 shadow-sm">
            <h2 className="text-center mb-4">Tambah Mapel</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Nama Guru Mapel</Form.Label>
                <Form.Control
                  type="text"
                  value={nama_guru_mapel}
                  onChange={(e) => setNama_Guru_Mapel(e.target.value)}
                  placeholder="Isi dengan nama guru"
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Nama Mapel</Form.Label>
                <Form.Control
                  type="text"
                  value={nama_mapel}
                  onChange={(e) => setNama_mapel(e.target.value)}
                  placeholder="Isi dengan nama mapel"
                  required
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Tambah Mapel
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default TambahMapel;