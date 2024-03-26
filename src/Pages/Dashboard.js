import React, { useEffect, useState } from "react";
import { Table, Card } from "react-bootstrap"; // Impor Button dari react-bootstrap
import axios from "axios";

function Dashboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getAll = () => {
      axios
        .get("https://fakestoreapi.com/users?limit=5") // Menambahkan parameter limit=5
        .then((res) => {
          setUsers(res.data);
        })
        .catch((error) => {
          alert("Terjadi kesalahan" + error);
        });
    };
    getAll();
  }, []);

  return (
    <>
      <div
        style={{
          background: "#f0f0f0",
          padding: "20px",
          borderRadius: "8px",
          marginBottom: "20px",
          fontWeight: "bold",
          fontSize: "40px",
        }}
      >
        Dashboard
      </div>

      <div
        style={{
          display: "flex",
          gap: "30px",
          marginBottom: "5%",
          textAlign: "center",
          marginLeft: "3%"
        }}
      >
        {/* Kartu */}
        <div style={{ gap: "4" }}>
          <Card style={{ width: "24rem", height:"10rem", background: "rgba(238, 153, 194, 0.7)" }}>
            <Card.Body>
              <Card.Title>Jumlah Siswa</Card.Title>
              <Card.Text>This is card content for card 1.</Card.Text>
            </Card.Body>
          </Card>
        </div>

        <div style={{ gap: "1" }}>
          <Card style={{ width: "24rem", height:"10rem", background: "rgba(238, 153, 194, 0.7)" }}>
            <Card.Body>
              <Card.Title>Guru</Card.Title>
              <Card.Text>This is card content for card 2.</Card.Text>
            </Card.Body>
          </Card>
        </div>

        <div style={{ gap: "1" }}>
          <Card style={{ width: "24rem", height:"10rem", background: "rgba(238, 153, 194, 0.7)" }}>
            <Card.Body>
              <Card.Title>Kelas</Card.Title>
              <Card.Text>This is card content for card 3.</Card.Text>
            </Card.Body>
          </Card>
        </div>

        <div style={{ gap: "1" }}>
          <Card style={{ width: "24rem", height:"10rem", background: "rgba(238, 153, 194, 0.7)" }}>
            <Card.Body>
              <Card.Title>Mapel</Card.Title>
              <Card.Text>This is card content for card 4.</Card.Text>
            </Card.Body>
          </Card>
        </div>
      </div>

      {/* Tabel */}
      <div style={{ marginBottom:"10%" }}>
        <Table
          striped
          bordered
          hover
          style={{
            marginTop: "8px",
            marginLeft: "35px",
            width: "calc(95% - 10px)",
          }}
        >
          <thead>
            <tr>
              <th>No</th>
              <th>Nama Pengguna</th>
              <th>Alamat</th>
              <th>Kota</th>
              <th>Nomor</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.id}>
                <td>{index + 1}</td>
                <td>{user.username}</td>
                <td>{user.address.street}</td>
                <td>{user.address.city}</td>
                <td>{user.address.number}</td>
                <td>{user.email}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* Footer */}
      <footer style={{ textAlign: "center", marginTop: "20px" }}>
        <p>&copy;2024 Tugas Java.25 march Bootcamp.</p>
      </footer>
    </>
  );
}

export default Dashboard;
