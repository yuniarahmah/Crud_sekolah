import React, { useEffect, useState } from "react";
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBInput,
} from "mdb-react-ui-kit";
import axios from "axios";
import Swal from "sweetalert2";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleRegister(e) {
    e.preventDefault();

    try {
      // Kirim data registrasi ke server backend
      const response = await axios.post("http://localhost:8080/register", {
        username: username,
        password: password,
        role: "admin", // Jika Anda ingin menetapkan peran secara default
      });

      console.log("Registration successful:", response.data);

      // Tampilkan pesan sukses
      Swal.fire({
        icon: "success",
        title: "Registration Successful!",
        text: "You have successfully registered.",
        showConfirmButton: false,
        timer: 2000,
      }).then(() => {
        // Redirect setelah timer berakhir
        window.location.href = "/masuk"; // Jika Anda ingin mengarahkan ke halaman login setelah registrasi
      });
    } catch (error) {
      console.error("Error during registration:", error);

      // Tampilkan pesan error
      const errorMessage =
        error.response?.data?.message ||
        "Failed to register. Please try again.";
      Swal.fire({
        icon: "error",
        title: "Registration Failed!",
        text: errorMessage,
      });
    }
  }

  return (
    <MDBContainer className="p-3 my-5">
      <MDBRow className="align-items-center">
        {/* Kolom untuk gambar */}
        <MDBCol col="12" md="6" className="d-flex justify-content-center">
          <img
            src="https://pwa.siasn.kukarkab.com/assets/pwa/img/bg-img/36.png"
            className="img-fluid"
            alt="Phone image"
          />
        </MDBCol>

        {/* Kolom untuk inputan */}
        <MDBCol col="12" md="6" onSubmit={handleRegister}>
          <h1 style={{ textAlign: "center", marginBottom: "3%" }}>
            {" "}
            <i>
              {" "}
              <u>REGISTRASI</u>{" "}
            </i>
          </h1>
          <h3 style={{ marginLeft: "5%", marginBottom: "5%" }}>
            Silahkan isi data Registrasi dibawah ini
          </h3>
          <MDBInput
            label="Username address"
            wrapperClass="mb-4"
            id="username"
            type="text"
            size="lg"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <MDBInput
            wrapperClass="mb-4"
            label="Password"
            id="password"
            type="password"
            size="lg"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="d-flex justify-content-between mx-4 mb-4">
            <a href="/login">Sudah punya akun? silahkan login</a>
          </div>

          <MDBBtn className="mb-4 w-100" size="lg" type="submit">
            Register
          </MDBBtn>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default Register;
