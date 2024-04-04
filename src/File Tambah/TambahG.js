import React, { useState } from "react";
import { Button, Form, Card, Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";

function TambahGuru() {
  const [nama_guru, setNamaGuru] = useState("");
  const [nik, setNIK] = useState("");
  const [alamat_guru, setAlamatGuru] = useState("");
  const [nomer_hp, setNomerHp] = useState("");
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const guru = { nama_guru, nik, alamat_guru, nomer_hp };

    try {
      await axios.post("http://localhost:8080/api/guru", guru, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      Swal.fire({
        title: "Success!",
        text: "Guru berhasil ditambahkan.",
        icon: "success",
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false,
      }).then(() => {
        history.push("/guru");
      });

      setNamaGuru("");
      setNIK("");
      setAlamatGuru("");
      setNomerHp("");
    } catch (error) {
      Swal.fire("Error!", `Terjadi kesalahan: ${error.response?.data?.message || error.message}`, "error");
    }
  };

  return (
    <Container style={{ paddingTop: "10vh", paddingBottom: "5vh" }}>
      <Row>
        <Col xs={12} md={8} lg={6} className="mx-auto">
          <Card className="p-4">
            <h2 className="text-center mb-4">Tambah Guru</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Nama Guru</Form.Label>
                <Form.Control
                  type="text"
                  value={nama_guru}
                  onChange={(e) => setNamaGuru(e.target.value)}
                  placeholder="Isi dengan nama guru"
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>NIK</Form.Label>
                <Form.Control
                  type="number"
                  value={nik}
                  onChange={(e) => setNIK(e.target.value)}
                  placeholder="Silahkan ketik NIK Guru"
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Alamat Guru</Form.Label>
                <Form.Control
                  type="text"
                  value={alamat_guru}
                  onChange={(e) => setAlamatGuru(e.target.value)}
                  placeholder="Silahkan ketik alamat guru"
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Nomer Hp</Form.Label>
                <Form.Control
                  type="number"
                  value={nomer_hp}
                  onChange={(e) => setNomerHp(e.target.value)}
                  placeholder="Silahkan ketik nomer hp"
                  required
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Tambah Guru
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default TambahGuru;