import axios from "axios";

export const setPass = async (token, password) => {
  const url = "http://152.42.168.144:8080/api/setPasswordActiveClub";
  const payload = {
    password: password,
  };

  try {
    const response = await axios.post(url, payload, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    throw new Error(
      `Reset failed: ${error.response.status} - ${error.response.data}`
    );
  }
};
