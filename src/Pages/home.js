import React from "react";
import Card from "react-bootstrap/Card";
import logo from "../asset/Background.jpg"; // Pastikan jalur benar
import Navbarcom from "../Component/Navbar";
// Import gambar yang digunakan di kartu
import foto1 from "../asset/foto.jpg"; // Perbarui jalur sesuai kebutuhan
import foto2 from "../asset/foto2.webp"; // Perbarui jalur sesuai kebutuhan
import foto3 from "../asset/foto1.webp"; // Perbarui jalur sesuai kebutuhan
import foto4 from "../asset/kegiatan1.jpg"; // Perbarui jalur sesuai kebutuhan
import foto5 from "../asset/kegiatan 4.jpg"; // Perbarui jalur sesuai kebutuhan
import foto6 from "../asset/kegiatan 3.jpg"; // Perbarui jalur sesuai kebutuhan
import "../App.css";
import Aos from "aos";
import "aos/dist/aos.css"; // Impor stylesheet AOS
import { useEffect } from "react";

function Home() {
  useEffect(() => {
    Aos.init({ duration: 1000 }); // Inisialisasi AOS
  }, []);

  const backgroundStyle = {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${logo})`,
    backgroundSize: "cover",
    backgroundPosition: "center bottom",
    backgroundRepeat: "no-repeat",
    height: "100vh", // Mengubah tinggi agar bisa mengikuti konten
    width: "100%",
    zIndex: -1,
  };

  return (
    <>
      {/* <Navbarcom /> */}
      <div style={backgroundStyle}>
        {/* Teks dan Tombol */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "20px",
            paddingTop: "30vh", // Penambahan padding atas untuk menaikkan konten
            textAlign: "center", // Menyelaraskan teks ke tengah
            color: "white",
          }}
        >
          <h1 class="main-heading" style={{ color: "white" }}>
            <b>Selamat Datang di dalam Website Sekolah Smk Binanusantara </b>
          </h1>
          <h4>
            {" "}
            <b>
              {" "}
              <i>
                Ayo Kepoin Sekolah Smk Binusa yuk, Gurunya seru seru dn banyak{" "}
                <br />
                kegiatan menarik yang sering diadakan loh, ayo segera gabung
                lewat web kami <br />
                atau Langsung saja Login untuk mengetahui tentang sekolah kami{" "}
                <br />
              </i>{" "}
            </b>{" "}
          </h4>
          <div style={{ marginTop: "20px" }}>
            <a
              href="https://binusasmg.sch.id/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none", marginRight: "10px" }}
              className="btn-kunjungi"
            >
              Kunjungi Websitenya
            </a>
            <a href="/login" className="btn-login" style={{ border: "10%" }}>
              Login
            </a>
          </div>
        </div>
      </div>

      {/* Card */}
      <div
        style={{
          padding: "5%",
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
          height: "10%",
        }}
      >
        <Card
          key="department" // Ubah menjadi lebih deskriptif
          style={{
            backgroundColor: "#7ab8f2", // Biru muda yang tidak terlalu terang
            color: "white", // Warna teks
            width: "25rem",
            textAlign: "center",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.4)",
          }}
          className="card mb-2"
        >
          <Card.Body>
            <Card.Text style={{ fontSize: "5rem" }}>4</Card.Text>
            <Card.Text>Jurusan</Card.Text>
          </Card.Body>
        </Card>
        <Card
          key="extracurricular" // Ubah menjadi lebih deskriptif
          style={{
            backgroundColor: "#7ab8f2",
            color: "white",
            width: "25rem",
            textAlign: "center",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.4)",
          }}
          className="card mb-2"
        >
          <Card.Body>
            <Card.Text style={{ fontSize: "5rem" }}>6+</Card.Text>
            <Card.Text>Ekstraskurikuler</Card.Text>
          </Card.Body>
        </Card>
        <Card
          key="class" // Ubah menjadi lebih deskriptif
          style={{
            backgroundColor: "#7ab8f2",
            color: "white",
            width: "25rem",
            textAlign: "center",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.4)",
          }}
          className="card mb-2"
        >
          <Card.Body>
            <Card.Text style={{ fontSize: "5rem" }}>7+</Card.Text>
            <Card.Text>Kelas</Card.Text>
          </Card.Body>
        </Card>
        <Card
          key="teacher" // Ubah menjadi lebih deskriptif
          style={{
            backgroundColor: "#7ab8f2",
            color: "white",
            width: "25rem",
            textAlign: "center",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.4)",
          }}
          className="card mb-2"
        >
          <Card.Body>
            <Card.Text style={{ fontSize: "5rem" }}>10+</Card.Text>
            <Card.Text>Guru</Card.Text>
          </Card.Body>
        </Card>
      </div>

      {/* Bagian Prestasi */}
      <div
        className="prestasi-container"
        style={{
          // marginTop: "50px",
          backgroundColor: "#F6F5F5",
        }}
      >
        <div style={{ textAlign: "center", marginTop: "5%", padding: "5%" }}>
          <h1 class="main-heading">
            Prestasi dan Kegiatan Siswa Binanusantara
          </h1>
          <hr style={{ width: "10%", margin: "auto" }} />
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
            justifyContent: "center",
            padding: "0 10px", // Menambahkan padding di sisi kiri dan kanan
            maxWidth: "1700px", // Mengatur lebar maksimal dari kontainer
            margin: "0 auto", // Mengatur agar kontainer berada di tengah
          }}
        >
          {/* Kartu-kartu */}
          <CardComponent
            title="Penghargaan Siswa"
            // text="Pemberian piagam penghargaan untuk siswa yang memiliki nilai diatas rata-rata"
            image={foto1}
          />
          <CardComponent
            title="Prestasi Kejuaraan Pramuka"
            // text="Siswa kelas XII TKJ yang dikirim dari SMK Binanusantara untuk mengikuti kejuaraan ubaloka-4 memborong piala kemenangan"
            image={foto2}
          />
          <CardComponent
            title="Juara Pencak Silat Putra"
            // text="Beberapa siswa dari Binanusantara diturunkan di gelanggang kejuaraan Kendal championship meraih juara yang membanggakan"
            image={foto3}
          />
          <CardComponent
            title="Latihan Gabungan Penggalang binusa"
            // text="Beberapa siswa dari Binanusantara diturunkan di gelanggang kejuaraan Kendal championship meraih juara yang membanggakan"
            image={foto4}
          />
          <CardComponent
            title="Kegiatan Hari Santri"
            // text="Beberapa siswa dari Binanusantara diturunkan di gelanggang kejuaraan Kendal championship meraih juara yang membanggakan"
            image={foto5}
          />
          <CardComponent
            title="Kegiatan Pemilihan Ketua Osis"
            // text="Beberapa siswa dari Binanusantara diturunkan di gelanggang kejuaraan Kendal championship meraih juara yang membanggakan"
            image={foto6}
          />
        </div>
      </div>

      <div className=""></div>

      {/* Foote */}
      <footer
        style={{
          textAlign: "center",
          marginTop: "20px",
          zIndex: 2,
        }}
      >
        <p>&copy; 2024 Tugas Java.25 March Bootcamp.</p>
      </footer>
    </>
  );
}

// Card component for reuse

function CardComponent({ title, text, image }) {
  const handleMoreInfoClick = () => {
    window.location.href = "https://www.instagram.com/smkbinanusantara_smg/"; // Ganti URL sesuai kebutuhan
  };

  return (
    <Card
      className="card-hover" // Gunakan class untuk styling
      onClick={handleMoreInfoClick} // Menambahkan event handler untuk klik
    >
      <div style={{ position: "relative" }}>
        <Card.Img variant="top" src={image} />
        <div
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            height: "100%",
            width: "100%",
            opacity: 0,
            transition: "opacity .5s ease",
            backgroundColor: "rgba(0, 0, 255, 0.5)",
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "20px",
          }}
          className="hover-overlay"
          onMouseEnter={(e) => (e.currentTarget.style.opacity = 1)} // Menambahkan efek hover
          onMouseLeave={(e) => (e.currentTarget.style.opacity = 0)} // Menghilangkan efek hover
        >
          Lihat Selengkapnya
        </div>
      </div>
      <Card.Body style={{ height: "0%" }}>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{text}</Card.Text>
      </Card.Body>
    </Card>
  );
}
export default Home;
