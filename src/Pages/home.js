import React from "react";
import Card from "react-bootstrap/Card";
import logo from "../asset/lomba-rev.jpg";
import foto1 from "../asset/foto.jpg";
import foto2 from "../asset/foto2.webp";
import foto3 from "../asset/foto1.webp";
import welcome from "../asset/tanda.svg";

function Home() {
  const backgroundStyle = {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.5)), url(${logo})`, // Menggunakan variabel gambar yang diimpor
    backgroundSize: "cover",
    backgroundPosition: "center top",
    backgroundRepeat: "no-repeat",
    minHeight: "100vh",
  };
  const blueTransparentColor = "rgba(0, 141, 218, 0.7)"; // Warna biru dengan tingkat transparansi

  return (
    <>
      <div
        style={{
          background: "#008DDA",
          height: "50vh",
          margin: "0",
          display: "flex",
          justifyContent: "space-between", // Mengatur jarak antara elemen-elemen di dalam flex container
          alignItems: "center",
        }}
      >
        {/* gambar */}
        <div style={{ marginRight: "30px" }}>
          <img
            src={welcome}
            alt="Gambar"
            style={{ width: "40rem", height: "30%" }}
          />
        </div>
        {/* text */}
        <div style={{ order: "-1" }}>
          {" "}
          {/* Menggeser teks ke kiri dengan nilai order yang lebih kecil */}
          <h1
            style={{ marginBottom: "10%", marginTop: "0", marginLeft: "10%" }}
          >
            Selamat Data didalam Website Sekolah Smk Binanusantara
          </h1>
        </div>
      </div>

      <h1 style={{ textAlign: "center" }}>
        {" "}
        <b>
          {" "}
          <u>Prestasi yang diraih oleh siswa Binanusantara</u>
        </b>
      </h1>
      <div style={{ display: "flex", marginLeft: "5%", gap: "5%" }}>
        <Card
          style={{
            width: "30rem",
            marginTop: "5%",
            marginBottom: "15%",
            textAlign: "center",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.4)", // Menambahkan bayangan
          }}
        >
          <Card.Img variant="top" src={foto1} />
          <Card.Body>
            <Card.Title>Penghargaan Siswa</Card.Title>
            <Card.Text>
              pemberian piagam penghargaan untuk siswa yang memiliki nilai diatas rata-rata
            </Card.Text>
          </Card.Body>
        </Card>
        <Card
          style={{
            width: "30rem",
            marginTop: "5%",
            marginBottom: "15%",
            textAlign: "center",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.4)", // Menambahkan bayangan
            position: "relative"
          }}
        >
          <Card.Img variant="top" src={foto2} />
          <Card.Body>
            <Card.Title>Prestasi Kejuaraan Pramuka</Card.Title>
            <Card.Text>
              Siswa kelas Xll Tkj yang dikirm dari smk binanusantara untuk mengikuti kejuaraan ubaloka-4 memborong piala kemenangan
            </Card.Text>
          </Card.Body>
        </Card>
        <Card
          style={{
            width: "30rem",
            marginTop: "5%",
            marginBottom: "15%",
            textAlign: "center",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.4)", // Menambahkan bayangan
          }}
        >
          <Card.Img variant="top" src={foto3} />
          <Card.Body>
            <Card.Title>Juara Pencaksilat putra</Card.Title>
            <Card.Text>
             beberapa siswa dari binanusantara diturunkan di gelanggang kejuaraan Kendal championship meraih juara yang membanggakan
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
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
                backgroundColor: blueTransparentColor, // Menggunakan warna pink dengan transparansi
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.4)", // Menambahkan bayangan
              }}
            >
              <Card.Body>
                <Card.Title style={{ color: "white", textAlign: "center" }}>
                  Ekstrakurikuler
                </Card.Title>
                <Card.Text style={{ color: "white", margin: "10px" }}>
                  Smk Binanusantara Memiliki ekstrakurikuler yang menarik loh
                  ayo kepoin sekolah binanusantara semarang. cari selengkapnya
                  dibawah ini yaa
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
                backgroundColor: blueTransparentColor, // Menggunakan warna pink dengan transparansi
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.4)", // Menambahkan bayangan
              }}
            >
              <Card.Body>
                <Card.Title style={{ color: "white", textAlign: "center" }}>
                  Prestasi
                </Card.Title>
                <Card.Text style={{ color: "white" }}>
                  Smk Binanusantara juga memiliki banyak murid berprestasi,
                  apakah kamu ingin menjadi salah satu murid berprestasi Smk
                  binanusantara? ayo daftar di Smk binanusantara.
                </Card.Text>
              </Card.Body>
            </Card>
            <Card
              style={{
                width: "29rem",
                marginTop: "34%",
                height: "",
                backgroundColor: blueTransparentColor, // Menggunakan warna pink dengan transparansi
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.4)", // Menambahkan bayangan
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
                backgroundColor: blueTransparentColor, // Menggunakan warna pink dengan transparansi
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.4)", // Menambahkan bayangan
              }}
            >
              <Card.Body>
                <Card.Title style={{ color: "white", textAlign: "center" }}>
                  Fasilitas
                </Card.Title>
                <Card.Text style={{ color: "white" }}>
                  Fasilitas Smk Binanusantara dilengkapi oleh yayasan terdapat
                  Lab untuk setiap jurusan, ada juga kantin dan koprasi yang
                  disediakan, ada juga uks untuk tempat kesehatan dan masih
                  banyak lagi fasilitas lainnya.
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
        <footer style={{ textAlign: "center", marginTop: "20px" }}>
          <p>&copy; 2024 Tugas Java.25 march Bootcamp.</p>
        </footer>
    </>
  );
}

export default Home;
