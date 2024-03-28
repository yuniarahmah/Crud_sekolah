import axios from 'axios';

const apiUrl = 'http://localhost:8080';

export const login = async (email, username, password) => {
  try {
    // Ensure the apiUrl is used for consistency
    const response = await axios.post(`${apiUrl}/login`, { email, username, password });
    const token = response.data.token;
    localStorage.setItem("token", token);
    return token;
  } catch (error) {
    // More robust error handling
    if (error.response && error.response.data) {
      throw error.response.data;
    } else {
      throw error.message || "An unexpected error occurred";
    }
  }
};

export const register = async (username, email, password) => {
  try {
    // Use of template literals for consistency
    const response = await axios.post(`${apiUrl}/register`, {
      username,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    // More robust error handling
    if (error.response && error.response.data) {
      throw error.response.data;
    } else {
      throw error.message || "An unexpected error occurred";
    }
  }
};
