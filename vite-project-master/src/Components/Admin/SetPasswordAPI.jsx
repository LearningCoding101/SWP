import axios from 'axios';

export const emailConfirm = async (email) => {
  const url = 'http://152.42.168.144:8080/api/set-password'; 
  const payload = {
    email: email,
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
    throw new Error(`Email unavailable: ${error.response.status} - ${error.response.data}`);
  }
};