import React from "react";
import Card from "react-bootstrap/Card";
import logo from "../asset/Fotbar.jpg"; // Pastikan jalur benar
import Navbarcom from "../Component/Navbar";
// Import gambar yang digunakan di kartu
import foto1 from "../asset/foto.jpg"; // Perbarui jalur sesuai kebutuhan
import foto2 from "../asset/foto2.webp"; // Perbarui jalur sesuai kebutuhan
import foto3 from "../asset/foto3.jpg"; // Perbarui jalur sesuai kebutuhan

function Home() {
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
      <Navbarcom />
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
          <p style={{ textTransform: "uppercase", fontSize: "3rem" }}>
            {" "}
            <i>
              {" "}
              <b>Selamat Datang di dalam Website Sekolah Smk Binanusantara </b>
            </i>
          </p>
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

      <div
        style={{
          padding: "10%",
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <Card
          bg="danger" // Represents Red
          key="Red"
          text="white"
          style={{ width: "18rem" }}
          className="mb-2"
        >
          <Card.Body>
            <Card.Title>Red Card Title</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
          </Card.Body>
        </Card>
        <Card
          bg="primary" // Represents Red
          key="Red"
          text="white"
          style={{ width: "18rem" }}
          className="mb-2"
        >
          <Card.Body>
            <Card.Title>Red Card Title</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
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
        <h1 style={{ textAlign: "center" }}>
          <b>
            <u>Prestasi yang diraih oleh siswa Binanusantara</u>
          </b>
        </h1>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "5%",
          }}
        >
          {/* Kartu-kartu */}
          <CardComponent
            title="Penghargaan Siswa"
            text="Pemberian piagam penghargaan untuk siswa yang memiliki nilai diatas rata-rata"
            image={foto1}
          />
          <CardComponent
            title="Prestasi Kejuaraan Pramuka"
            text="Siswa kelas XII TKJ yang dikirim dari SMK Binanusantara untuk mengikuti kejuaraan ubaloka-4 memborong piala kemenangan"
            image={foto2}
          />
          <CardComponent
            title="Juara Pencak Silat Putra"
            text="Beberapa siswa dari Binanusantara diturunkan di gelanggang kejuaraan Kendal championship meraih juara yang membanggakan"
            image={foto3}
          />
        </div>
      </div>

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
  return (
    <Card
      style={{
        width: "25rem",
        marginTop: "5%",
        marginBottom: "15%",
        textAlign: "center",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.4)",
      }}
    >
      <Card.Img variant="top" src={image} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{text}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default Home;
