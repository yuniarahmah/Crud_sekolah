import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

function Register() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [lastId, setLastId] = useState(0); // State untuk menyimpan ID terakhir

  // Mendapatkan ID terakhir setelah komponen di-mount
  useEffect(() => {
    const fetchLastId = async () => {
      try {
        const response = await axios.get('http://localhost:8080/register');
        const data = response.data.data;
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
      const response = await axios.post('http://localhost:8080/register', {
        id: newId,
        email,
        password,
      });

      console.log('Registration successful:', response.data.data);

      // Show success message
      Swal.fire({
        icon: 'success',
        title: 'Registration Successful!',
        text: 'You have successfully registered.',
        showConfirmButton: false,
        timer: 2000,
      }).then(() => {
        // Redirect after the timer expires
        window.location.href = '/login';
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
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form onSubmit={handleRegister}>
            <h1 className="text-center mb-4">Register</h1>
            <div className="form-group mb-3">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                className="form-control"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
              />
            </div>
            <div className="form-group mb-4">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
              />
            </div>
            <div className="d-flex justify-content-between">
              <a href="/login">Already have an account? Login</a>
              <button type="submit" className="btn btn-primary">
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
