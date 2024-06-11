import axios from 'axios';

export const addCourt = async (name, address, startHour, startMinute, endHour, endMinute, picture_location) => {
    const url = 'http://152.42.168.144:8080/api/club';

    const payload = {
        name: name,
        address: address,
        startHour: startHour,
        startMinute: startMinute,
        endHour: endHour,
        endMinute: endMinute,
        picture_location: picture_location,
        
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