import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import gambar from "../asset/logo.png"; // Mengimpor gambar logo

function Navbarcom() {
  return (
    <>
      <Navbar style={{ background: "#7EAA92", overflow: "hidden", position: "fixed", width: "100%", zIndex: "1000" }}>
        <Container>
          <Navbar.Brand href="#home" style={{ color: "white" }}>
            <span style={{ width: "7%" }}>
              <img
                src={gambar} // Menggunakan variabel gambar sebagai sumber gambar
                style={{ width: "10%", marginRight: "2%" }} // Menyesuaikan lebar gambar agar responsif
                alt="Logo"
              />
            </span>
            <i>Data Sekolah</i>
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Nav className="ml-auto" style={{ gap: "2vh" }}>
              <Nav.Link href="#login" style={{ color: "white" }}>
                <b>Sign in</b>
              </Nav.Link>
              <Nav.Link href="#signup" style={{ color: "white" }}>
                <b>Sign up</b>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div style={{ height: "42px" }} /> {/* Membuat placeholder untuk mencegah konten di bawahnya tumpang tindih dengan navbar */}
    </>
  );
}

export default Navbarcom;