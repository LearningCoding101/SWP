import axios from 'axios';

export const newPass = async (password) => {
  const url = 'http://152.42.168.144:8080/api/reset-password'; 
  const payload = {
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
    throw new Error(`Reset failed: ${error.response.status} - ${error.response.data}`);
  }
};