import React, { useState } from 'react';
import axios from 'axios'; // Tambahkan import axios
import Swal from 'sweetalert2'; // Tambahkan import SweetAlert
import { navigate } from 'gatsby'; // Tambahkan import navigate jika menggunakan Gatsby
import { MDBContainer, MDBCol, MDBRow, MDBBtn, MDBInput } from 'mdb-react-ui-kit';

function Login() {
  const [email, setEmail] = useState(''); // Definisikan state untuk email
  const [password, setPassword] = useState(''); // Definisikan state untuk password

  const handleLogin = async (e) => {
    e.preventDefault();
    const data = {
      email: email,
      password: password,
    };

    try {
      const response = await axios.post("http://localhost:7070/login", data); // Menggunakan URL yang benar
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.userData.role);
      navigate("/"); // Pastikan Anda memiliki navigate yang diimpor jika menggunakan Gatsby
      console.log("success login");

      // Tambahkan SweetAlert berhasil login di sini
      Swal.fire({
        icon: "success",
        title: "Login Berhasil",
        text: "Selamat datang!",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <MDBContainer className="p-3">
      <MDBRow className="align-items-center justify-content-center">
        <MDBCol col='12' md='6' className="d-flex justify-content-center">
          <img src="https://psb.binbaz.or.id/login/images/ilustrasi2.jpg" className="img-fluid" alt="Phone image" />
        </MDBCol>

        <MDBCol col='12' md='6'>
          <h1 style={{ textAlign: "center", marginBottom: "3%" }}> <i> <u>Login</u> </i></h1>
          <MDBInput
            wrapperClass='mb-4'
            label='Email address'
            id='email'
            type='email'
            size="lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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

          <MDBBtn className="mb-4 w-100" size="lg" onClick={handleLogin}>Sign in</MDBBtn>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default Login;