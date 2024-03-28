import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { MDBBtn, MDBCol, MDBInput, MDBRow } from "mdb-react-ui-kit";

const apiUrl = 'http://localhost:8080';

const Login = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // The showPassword state and its related functionality are removed.

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${apiUrl}/login`, {
        email,
        username,
        password,
      });
      if (response && response.data) {
        const token = response.data.token;
        const username = response.data.username;

        localStorage.setItem("token", token);
        localStorage.setItem("username", username);

        Swal.fire({
          icon: "success",
          title: "Login Successful",
          html: `Token: ${token}`,
          confirmButtonText: "OK",
        });

        window.location.href = "/dashboard";
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
   <MDBRow className="align-items-center justify-content-center" style={{ marginTop: '50px' }}>
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
            <i><u>Login</u></i>
          </h1>
          
          <MDBInput
            wrapperClass="mb-4"
            label="Username"
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
            <a href="/forgot-password">Forgot Password</a>
            <a href="/daftar">Belum punya akun? ayo Registrasi dulu</a>
          </div>

          <MDBBtn type="submit">
            Sign in
          </MDBBtn>
        </form>
      </MDBCol>
    </MDBRow>
    </>
  );
};

export default Login;