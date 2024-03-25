import React from "react";
import Card from "react-bootstrap/Card";
import logo from "../asset/LDKO.png";

function Home() {
  const backgroundStyle = {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.5)), url(${logo})`, // Menggunakan variabel gambar yang diimpor
    backgroundSize: "cover",
    backgroundPosition: "center bottom",
    backgroundRepeat: "no-repeat",
    minHeight: "100vh",
  };
  const pinkTransparentColor = "rgba(238, 153, 194, 0.7)"; // Warna pink dengan tingkat transparansi

  return (
    <div style={backgroundStyle}>
      <div>
        <div
          style={{
            display: "flex",
            gap: "5px",
            marginRight: "5px",
            marginLeft: "5px",
          }}
        >
          <Card
            style={{
              width: "30rem",
              marginTop: "34%",
              height: "10%",
              backgroundColor: pinkTransparentColor, // Menggunakan warna pink dengan transparansi
            }}
          >
            <Card.Body>
              <Card.Title style={{ color: "white", textAlign: "center" }}>
                Ekstrakurikuler
              </Card.Title>
              <Card.Text style={{ color: "white", margin: "10px" }}>
                Smk Binanusantara Memiliki ekstrakurikuler yang menarik loh ayo
                kepoin sekolah binanusantara semarang. cari selengkapnya dibawah
                ini yaa
              </Card.Text>
              <a
                href="https://binusasmg.sch.id/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none" }}
              >
                <Card.Link style={{ color: "white", textAlign: "center" }}>
                  Ayo Kunjungi Websitenya
                </Card.Link>
              </a>
            </Card.Body>
          </Card>
          <Card
            style={{
              width: "29rem",
              marginTop: "34%",
              height: "",
              backgroundColor: pinkTransparentColor, // Menggunakan warna pink dengan transparansi
            }}
          >
            <Card.Body>
              <Card.Title style={{ color: "white", textAlign: "center" }}>
                Prestasi
              </Card.Title>
              <Card.Text style={{ color: "white" }}>
                Smk Binanusantara juga memiliki banyak murid berprestasi, apakah
                kamu ingin menjadi salah satu murid berprestasi Smk
                binanusantara? ayo daftar di Smk binanusantara.
              </Card.Text>
            </Card.Body>
          </Card>
          <Card
            style={{
              width: "29rem",
              marginTop: "34%",
              height: "",
              backgroundColor: pinkTransparentColor, // Menggunakan warna pink dengan transparansi
            }}
          >
            <Card.Body>
              <Card.Title style={{ color: "white", textAlign: "center" }}>
                Beasiswa
              </Card.Title>
              <Card.Text style={{ color: "white" }}>
                Smk Binanusatara juga menyediakan beasiswa buat siswa yang
                kurang mampu, dan berprestasi.
              </Card.Text>
            </Card.Body>
          </Card>
          <Card
            style={{
              width: "29rem",
              marginTop: "34%",
              height: "",
              backgroundColor: pinkTransparentColor, // Menggunakan warna pink dengan transparansi
            }}
          >
            <Card.Body>
              <Card.Title style={{ color: "white", textAlign: "center" }}>
                Fasilitas
              </Card.Title>
              <Card.Text style={{ color: "white" }}>
                Fasilitas Smk Binanusantara dilengkapi oleh yayasan terdapat Lab
                untuk setiap jurusan, ada juga kantin dan koprasi yang
                disediakan, ada juga uks untuk tempat kesehatan dan masih banyak
                lagi fasilitas lainnya.
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      </div>
      <footer style={{ textAlign: "center", marginTop: "20px" }}>
        <p>&copy; 2024 Tugas Java.25 march Bootcamp.</p>
      </footer>
    </div>
  );
}

export default Home;
