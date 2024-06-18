import axios from 'axios';

export const register = async (phone, password, email, fullname) => {
  const url = 'http://152.42.168.144:8080/api/register'; 

  const payload = {
    phone: phone,
    password: password,
    email: email,
    fullName: fullname
  };

  try {
    const response = await axios.post(url, payload, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    throw new Error(`Registration failed: ${error.response.status} - ${error.response.data}`);
  }
};