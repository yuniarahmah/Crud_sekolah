import React, { useEffect, useState } from 'react';
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBInput
} from 'mdb-react-ui-kit';
import axios from 'axios';
import Swal from 'sweetalert2';

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [lastId, setLastId] = useState(0); // State untuk menyimpan ID terakhir
  
    // Mendapatkan ID terakhir setelah komponen di-mount
    useEffect(() => {
      const fetchLastId = async () => {
        try {
          const response = await axios.get('http://localhost:3030/users');
          const data = response.data;
          const lastId = data.length > 0 ? data[data.length - 1].id : 0;
          setLastId(lastId);
        } catch (error) {
          console.error('Error fetching last ID:', error);
        }
      };
  
      fetchLastId();
    }, []);
  
    async function handleRegister(e) {
      e.preventDefault();
  
      try {
        // Gunakan ID terakhir dan tambahkan 1 untuk mendapatkan ID baru
        const newId = lastId + 1;
  
        // Send registration data to the backend server
        const response = await axios.post('http://localhost:3030/users', {
          id: newId,
          email,
          password,
        });
  
        console.log('Registration successful:', response.data);
  
        // Show success message
        Swal.fire({
          icon: 'success',
          title: 'Registration Successful!',
          text: 'You have successfully registered.',
          showConfirmButton: false,
          timer: 2000,
        }).then(() => {
          // Redirect after the timer expires
          window.location.href = '/masuk';
        });
      } catch (error) {
        console.error('Error during registration:', error);
  
        // Display error message
        const errorMessage = error.response?.data?.message || 'Failed to register. Please try again.';
        Swal.fire({
          icon: 'error',
          title: 'Registration Failed!',
          text: errorMessage,
        });
      }
    }

  return (
    <MDBContainer className="p-3 my-5">
      <MDBRow className="align-items-center">
        {/* Kolom untuk gambar */}
        <MDBCol col='12' md='6' className="d-flex justify-content-center">
          <img src="https://pwa.siasn.kukarkab.com/assets/pwa/img/bg-img/36.png" className="img-fluid" alt="Phone image" />
        </MDBCol>

        {/* Kolom untuk inputan */}
        <MDBCol col='12' md='6'>
          <h1 style={{ textAlign:"center", marginBottom:"3%" }}> <i> <u>REGISTRASI</u> </i></h1>
        <h3 style={{ marginLeft:'5%', marginBottom:'5%' }}>Silahkan isi data Registrasi dibawah ini</h3>
          <MDBInput
            label='Email address'
            wrapperClass='mb-4'
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

          <MDBBtn className="mb-4 w-100" size="lg" onClick={handleRegister}>Register</MDBBtn>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default Register;
