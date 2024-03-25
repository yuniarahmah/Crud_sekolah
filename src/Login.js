import React, { useState } from 'react';
import { MDBContainer, MDBCol, MDBRow, MDBBtn, MDBInput } from 'mdb-react-ui-kit';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    fetch('https://fakestoreapi.com/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: email,
        password: password,
      }),
    })
      .then(res => res.json())
      .then(json => console.log(json))
      .catch(error => console.error('Error:', error));
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
            <a href="/register">Belum punya akun? ayo Registerrasi dulu</a>
          </div>

          <MDBBtn className="mb-4 w-100" size="lg" onClick={handleLogin}>Sign in</MDBBtn>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default Login;
