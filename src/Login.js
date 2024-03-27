import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { MDBContainer, MDBCol, MDBRow, MDBBtn, MDBInput } from 'mdb-react-ui-kit';
import { useHistory } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();

  const handleLogin = async (e) => {
    e.preventDefault();
    axios.get("http://localhost:8080/login").then(({ data }) => {
      const user = data.find(
        (x) => x.username === username && x.password === password
      );
      if (user) {
        Swal.fire({
          icon: "success",
          title: "Masuk sebagai " + username,
          showConfirmButton: false,
          timer: 1500,
        });
        localStorage.setItem("id", user.id);
        history.push("/");
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        Swal.fire({
          icon: "error",
          title: "Your work has been saved",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };
console.log("error")
  return (
    <MDBContainer className="p-3">
      <MDBRow className="align-items-center justify-content-center">
        <MDBCol col='12' md='6' className="d-flex justify-content-center">
          <img src="https://psb.binbaz.or.id/login/images/ilustrasi2.jpg" className="img-fluid" alt="Phone image" />
        </MDBCol>

        <MDBCol col='12' md='6' onSubmit={handleLogin} method="POST">
          <h1 style={{ textAlign: "center", marginBottom: "3%" }}> <i> <u>Login</u> </i></h1>
          <MDBInput
            wrapperClass='mb-4'
            label='Username address'
            id='username'
            type='username'
            size="lg"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <MDBInput
            wrapperClass='mb-4'
            label='Password'
            id='password'
            type='password'
            size="lg"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="d-flex justify-content-between mx-4 mb-4">
            <a href="/forgot-password">Forgot Password</a>
            <a href="/daftar">Belum punya akun? ayo Registerrasi dulu</a>
          </div>

          <MDBBtn className="mb-4 w-100" size="lg" type="submit">Sign in</MDBBtn>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default Login;
