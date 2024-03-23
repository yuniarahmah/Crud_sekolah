import React from 'react';
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBIcon,
  MDBInput,
  MDBCheckbox
}
from 'mdb-react-ui-kit';

function Login() {
  return (
    <MDBContainer fluid className="p-3 my-5">
    <MDBRow className="align-items-center">
      {/* Kolom untuk gambar */}
      <MDBCol col='12' md='6' className="d-flex justify-content-center">
        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg" className="img-fluid" alt="Phone image" />
      </MDBCol>
  
      {/* Kolom untuk inputan */}
      <MDBCol col='12' md='6'>
        <MDBInput wrapperClass='mb-4' label='Email address' id='formControlLg' type='email' size="lg"/>
        <MDBInput wrapperClass='mb-4' label='Password' id='formControlLg' type='password' size="lg"/>
  
        <div className="d-flex justify-content-between mx-4 mb-4">
          <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
          <a href="/daftar">Register</a>
        </div>
  
        <MDBBtn className="mb-4 w-100" size="lg">Sign in</MDBBtn>
      </MDBCol>
    </MDBRow>
  </MDBContainer>
  
  );
}

export default Login;