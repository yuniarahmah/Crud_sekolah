import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Card, Form } from "react-bootstrap";
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

  const updateTeacher = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`${API_MAPEL}/${id}`, formData, {
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
          window.location.href = '/mapel';
        }
      });
    } catch (error) {
      console.error('Update error:', error.response || error);
      Swal.fire('Error', 'Terjadi kesalahan saat mengupdate data.', 'error');
    }
  };

  return (
    <Card className="mx-auto my-3 p-4" style={{ maxWidth: "900px" }}>
      <h2 className="text-center mb-4">Edit Data Mapel</h2>
      <Form onSubmit={updateTeacher}>
        {/* Repeat for each form field */}
        <Form.Group controlId="nama_mapel">
          <Form.Label>Nama Mapel</Form.Label>
          <Form.Control
            type="text"
            name="nama_mapel"
            value={formData.nama_mapel}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="nama_guru_mapel">
          <Form.Label>Nama Guru Mapel</Form.Label>
          <Form.Control
            type="text"
            name="nama_guru_mapel"
            value={formData.nama_guru_mapel}
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

export default UpdateMapel;
