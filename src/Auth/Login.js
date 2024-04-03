import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import {
  MDBBtn,
  MDBCol,
  MDBContainer,
  MDBInput,
  MDBRow,
} from "mdb-react-ui-kit";

const apiUrl = "http://localhost:8080";

const Login = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State baru untuk kontrol tampilan password

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${apiUrl}/login`, {
        username,
        password,
      });
      if (response && response.data) {
        const token = response.data.token;
        const username = response.data.username;

        localStorage.setItem("token", token);
        localStorage.setItem("username", username);

        // Menampilkan alert tanpa tombol konfirmasi dan mengatur timer
        Swal.fire({
          icon: "success",
          title: "Login Successful",
          html: `Token: ${token}`,
          showConfirmButton: false,
          timer: 1500, // Alert akan hilang setelah 1.5 detik
        }).then(() => {
          // Pengalihan ke halaman dashboard setelah alert hilang
          window.location.href = "/siswa";
        });
      } else {
        throw new Error("Response data is missing.");
      }
    } catch (error) {
      console.error(error);
      const errorMessage = error.response?.data?.message || "An error occurred";
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: errorMessage,
      });
    }
  };

  return (
    <>
      <MDBContainer className="p-5 my-5">
        <MDBRow
          className="align-items-center justify-content-center"
          style={{ marginTop: "50px" }}
        >
          <MDBCol col="12" md="6" className="d-flex justify-content-center">
            <img
              src="https://psb.binbaz.or.id/login/images/ilustrasi2.jpg"
              className="img-fluid"
              alt="Phone illustration"
            />
          </MDBCol>

          <MDBCol col="12" md="6">
            <form onSubmit={handleLogin} method="POST">
              <h1 style={{ textAlign: "center", marginBottom: "3%" }}>
                <i>
                  <u>Login</u>
                </i>
              </h1>

              <MDBInput
                wrapperClass="mb-4"
                label="Nama"
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
                <a href="/daftar">Belum punya akun? ayo Registrasi dulu</a>
              </div>

              <MDBBtn type="submit">Sign in</MDBBtn>
            </form>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </>
  );
};

export default Login;
