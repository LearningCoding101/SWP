import axios from 'axios';

export const addCourt = async (name, address, open_time, close_time, picture_location, email) => {
    const url = 'http://152.42.168.144:8080/api/club';

    const payload = {
        name: name,
        address: address,
        open_time: open_time,
        close_time: close_time,
        picture_location: picture_location,
        email: email,
    };

    try {
        const response = await axios.post(url, payload, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return response.data;
    } catch (error) {
        throw new Error(`Registration failed: ${error.response.status} - ${error.response.data}`);
    }
};