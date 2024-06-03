// LoginService.js
import axios from 'axios';

export const login = async (email, password) => {
  const url = 'http://152.42.168.144:8080/api/login'; 
  const payload = {
    email: email,
    password: password,
  };

  try {
    const response = await axios.post(url, payload, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    throw new Error(`Login failed: ${error.response.status} - ${error.response.data}`);
  }
};
