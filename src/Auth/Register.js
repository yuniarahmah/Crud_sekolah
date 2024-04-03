import React, { useState } from "react";
import axios from "axios";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBBtn,
} from "mdb-react-ui-kit";
import Swal from "sweetalert2";

function Register() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("admin");
  const [showPassword, setShowPassword] = useState(false); // State baru untuk kontrol tampilan password

  async function handleRegister(e) {
    e.preventDefault();

    try {
      // Kirim data registrasi ke server backend termasuk role
      const response = await axios.post("http://localhost:8080/register", {
        username,
        password,
        email,
        role,
      });

      console.log("Registration successful:", response.data);

      // Tampilkan pesan sukses
      Swal.fire({
        icon: "success",
        title: "Registrasi anda Berhasil!",
        text: "Akun anda sudah terdaftar.",
        timer: 2000,
        showConfirmButton: false,
      }).then(() => {
        // Arahkan ke halaman login setelah timer habis
        window.location.href = "/login";
      });
    } catch (error) {
      console.error("Registrasi error :", error);

      // Tampilkan pesan error
      const errorMessage =
        error.response?.data?.message || "Anda gagal melakukan registrasi";
      Swal.fire({
        icon: "error",
        title: "Registrasi gagal!",
        text: errorMessage,
      });
    }
  }

  return (
    <MDBContainer className="p-5 my-5">
      <MDBRow className="align-items-center">
        {/* Kolom untuk gambar */}
        <MDBCol col="12" md="6" className="d-flex justify-content-center">
          <img
            src="https://pwa.siasn.kukarkab.com/assets/pwa/img/bg-img/36.png"
            className="img-fluid"
            alt="Phone image"
          />
        </MDBCol>

        {/* Kolom untuk form */}
        <MDBCol col="12" md="6">
          <form onSubmit={handleRegister} method="POST">
            <h1 style={{ textAlign: "center", marginBottom: "3%" }}>
              <i>
                <u>REGISTRASI</u>
              </i>
            </h1>
            <h3 style={{ marginLeft: "5%", marginBottom: "5%" }}>
              Silahkan isi data Registrasi dibawah ini
            </h3>
            <MDBInput
              label="Nama Pengguna"
              wrapperClass="mb-4"
              id="username"
              type="text"
              size="lg"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            {/* Email input field */}
            <MDBInput
              label="Email"
              wrapperClass="mb-4"
              id="email"
              type="email"
              size="lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <MDBInput
              wrapperClass="mb-4"
              label="Password"
              id="password"
              type={showPassword ? "text" : "password"} // Kontrol tipe input berdasarkan state showPassword
              size="lg"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="form-check mb-4">
              <input
                className="form-check-input"
                type="checkbox"
                id="showPasswordCheckbox"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)} // Mengubah state showPassword
              />
              <label
                className="form-check-label"
                htmlFor="showPasswordCheckbox"
              >
                Show Password
              </label>
            </div>

            <div className="d-flex justify-content-between mx-4 mb-4">
              <a href="/login">Sudah punya akun? silahkan login</a>
            </div>
            <MDBBtn type="submit">Register</MDBBtn>
          </form>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default Register;
