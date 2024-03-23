import React from "react";
import Card from "react-bootstrap/Card";
import logo from "../asset/Background.jpg";

function Home() {
  const backgroundStyle = {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.5)), url(${logo})`, // Menggunakan variabel gambar yang diimpor
    backgroundSize: "cover",
    backgroundPosition: "center bottom",
    backgroundRepeat: "no-repeat",
    minHeight: "94vh",
  };

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
              backgroundColor: "rgba(126, 170, 146, 0.5)",
            }}
          >
            <Card.Body>
              <Card.Title style={{ color: "white", textAlign: "center" }}>
                Ekstrakurikuler
              </Card.Title>
              <Card.Text style={{ color: "white", margin: "10px" }}>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </Card.Text>
              <Card.Link href="#" style={{ color: "white" }}>
                Card Link
              </Card.Link>
              <Card.Link href="#" style={{ color: "white" }}>
                Another Link
              </Card.Link>
            </Card.Body>
          </Card>
          <Card
            style={{
              width: "29rem",
              marginTop: "34%",
              height: "",
              backgroundColor: "rgba(126, 170, 146, 0.5)",
            }}
          >
            <Card.Body>
              <Card.Title style={{ color: "white", textAlign: "center" }}>Prestasi</Card.Title>
              <Card.Text style={{ color: "white" }}>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </Card.Text>
              <Card.Link href="#" style={{ color: "white" }}>
                Card Link
              </Card.Link>
              <Card.Link href="#" style={{ color: "white" }}>
                Another Link
              </Card.Link>
            </Card.Body>
          </Card>
          <Card
            style={{
              width: "29rem",
              marginTop: "34%",
              height: "",
              backgroundColor: "rgba(126, 170, 146, 0.5)",
            }}
          >
            <Card.Body>
              <Card.Title style={{ color: "white", textAlign: "center" }}>Beasiswa</Card.Title>
              <Card.Text style={{ color: "white" }}>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </Card.Text>
              <Card.Link href="#" style={{ color: "white" }}>
                Card Link
              </Card.Link>
              <Card.Link href="#" style={{ color: "white" }}>
                Another Link
              </Card.Link>
            </Card.Body>
          </Card>
          <Card
            style={{
              width: "29rem",
              marginTop: "34%",
              height: "",
              backgroundColor: "rgba(126, 170, 146, 0.5)",
            }}
          >
            <Card.Body>
              <Card.Title style={{ color: "white", textAlign: "center" }}>Fasilitas</Card.Title>
              <Card.Text style={{ color: "white" }}>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </Card.Text>
              <Card.Link href="#" style={{ color: "white" }}>
                Card Link
              </Card.Link>
              <Card.Link href="#" style={{ color: "white" }}>
                Another Link
              </Card.Link>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Home;
