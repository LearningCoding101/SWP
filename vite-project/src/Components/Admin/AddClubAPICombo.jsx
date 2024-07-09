// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// export const addClubAPICombo = async (phone, email, fullName, name, address, price, startHour, startMinute, endHour, endMinute, picture_location) => {

//     const token = localStorage.getItem("token")
//     const url = 'http://152.42.168.144:8080/api/clubCombo';
   

//     const payload = {
//         phone: phone,
//         email: email,
//         fullName: fullName,
//         name: name, 
//         address: address,
//         price: price,
//         startHour: startHour,
//         startMinute: startMinute,
//         endHour: endHour,
//         endMinute: endMinute,
//         picture_location: picture_location

//     };

//     try {
//         const response = await axios.post(url, payload, {
//             method: "POST",
//             headers: {
//                 'Content-Type': 'application/json',
//                 Authorization: `Bearer ${token}`
//             },
//         });

//         return response.data;
//     } catch (error) {
//         throw new Error(`Registration failed: ${error.response.status} - ${error.response.data}`);
//     }
// };

import axios from 'axios';

export const addClubAPICombo = async (phone, email, fullName, name, address, price, startHour, startMinute, endHour, endMinute, picture_location) => {

    const token = localStorage.getItem("token")
    const url = 'http://152.42.168.144:8080/api/clubCombo';

    const payload = {
        phone: phone,
        email: email,
        fullName: fullName,
        name: name, 
        address: address,
        price: price,
        startHour: startHour,
        startMinute: startMinute,
        endHour: endHour,
        endMinute: endMinute,
        picture_location: picture_location

    };

    try {
        const response = await axios.post(url, payload, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
        });

        return response.data;
    } catch (error) {
        throw new Error(`Registration failed: ${error.response.status} - ${error.response.data}`);
    }
};