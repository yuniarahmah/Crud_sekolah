import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import axiosInstance from "./api"; // Ensure this path is correct
import Navbarcom from "../Component/Navbar";

function Dashboard() {
  const [data, setData] = useState({
    murids: [],
    kelas: [],
    guru: [],
    mapel: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Using the axiosInstance to make requests to the API
        const responses = await Promise.all([
          axiosInstance.get('/murid'),
          axiosInstance.get('/kelas'),
          axiosInstance.get('/guru'),
          axiosInstance.get('/mapel'),
        ]);
        
        // Updating state with the fetched data
        setData({
          murids: responses[0].data,
          kelas: responses[1].data,
          guru: responses[2].data,
          mapel: responses[3].data,
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Ensure you're displaying data correctly
  return (
    <>
      <Navbarcom />
      <div
        style={{
          background: "#f0f0f0",
          padding: "20px",
          borderRadius: "8px",
          marginBottom: "20px",
          fontWeight: "bold",
          fontSize: "40px",
          marginTop: "5%" 
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
        {/* Example card for displaying number of students */}
        <Card style={{ width: "24rem", height:"10rem", background: "rgba(238, 153, 194, 0.7)" }}>
          <Card.Body>
            <Card.Title>Siswa</Card.Title>
            <Card.Text>
              Jumlah: {data.murids.length}
            </Card.Text>
          </Card.Body>
        </Card>
        <Card style={{ width: "24rem", height:"10rem", background: "rgba(238, 153, 194, 0.7)" }}>
          <Card.Body>
            <Card.Title>Guru</Card.Title>
            <Card.Text>
              Jumlah: {data.guru.length}
            </Card.Text>
          </Card.Body>
        </Card>
        <Card style={{ width: "24rem", height:"10rem", background: "rgba(238, 153, 194, 0.7)" }}>
          <Card.Body>
            <Card.Title>kelas</Card.Title>
            <Card.Text>
              Jumlah: {data.kelas.length}
            </Card.Text>
          </Card.Body>
        </Card>

        {/* Repeat similar structure for Guru, Kelas, and Mapel with their respective data */}
        {/* Ensure you replace "This is card content for card X." with actual data */}

      </div>
      <footer style={{ textAlign: "center", marginTop: "20px" }}>
        <p>&copy;2024 Tugas Java.25 March Bootcamp.</p>
      </footer>
    </>
  );
}

export default Dashboard;
