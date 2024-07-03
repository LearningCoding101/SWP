// import React, { useEffect, useState } from 'react';
// import { Bar } from 'react-chartjs-2';
// import 'chart.js/auto';
// import axios from 'axios';
// import api from '../../config/axios';

// const BookingReport = () => {
//   const [data, setData] = useState({
//     labels: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
//     datasets: [{
//       label: 'Bookings by Day of Week',
//       data: [],
//       backgroundColor: [
//         'rgba(255, 99, 132, 0.2)',
//         'rgba(255, 159, 64, 0.2)',
//         'rgba(255, 205, 86, 0.2)',
//         'rgba(75, 192, 192, 0.2)',
//         'rgba(54, 162, 235, 0.2)',
//         'rgba(153, 102, 255, 0.2)',
//         'rgba(201, 203, 207, 0.2)'
//       ],
//       borderColor: [
//         'rgb(255, 99, 132)',
//         'rgb(255, 159, 64)',
//         'rgb(255, 205, 86)',
//         'rgb(75, 192, 192)',
//         'rgb(54, 162, 235)',
//         'rgb(153, 102, 255)',
//         'rgb(201, 203, 207)'
//       ],
//       borderWidth: 1
//     }]
//   });

//   useEffect(() => {
//     const token = 'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJzdHJpbmciLCJpYXQiOjE3MTkzNzQ4NTAsImV4cCI6MTcxOTQ2MTI1MH0.C19An1Q33c6us2aQaY_is0LTvoJFAg1E7gSjAfjp6oqUszbga9grKZgZK_Yz26Gz';

//     api.get('/bookingDetail/report', {
//       headers: {
//         'Authorization': `Bearer ${token}`
//       }
//     })
//     .then(response => response.json())
//     .then(data => {
//       const newData = {
//         labels: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
//         datasets: [{
//           label: 'Bookings by Day of Week',
//           data: [
//             data['Sunday'] || 0,
//             data['Monday'] || 0,
//             data['Tuesday'] || 0,
//             data['Wednesday'] || 0,
//             data['Thursday'] || 0,
//             data['Friday'] || 0,
//             data['Saturday'] || 0
//           ],
//           backgroundColor: [
//             'rgba(255, 99, 132, 0.2)',
//             'rgba(255, 159, 64, 0.2)',
//             'rgba(255, 205, 86, 0.2)',
//             'rgba(75, 192, 192, 0.2)',
//             'rgba(54, 162, 235, 0.2)',
//             'rgba(153, 102, 255, 0.2)',
//             'rgba(201, 203, 207, 0.2)'
//           ],
//           borderColor: [
//             'rgb(255, 99, 132)',
//             'rgb(255, 159, 64)',
//             'rgb(255, 205, 86)',
//             'rgb(75, 192, 192)',
//             'rgb(54, 162, 235)',
//             'rgb(153, 102, 255)',
//             'rgb(201, 203, 207)'
//           ],
//           borderWidth: 1
//         }]
//       };
//       setData(newData);
//     })
//     .catch(error => console.error('Error fetching data:', error));
//   }, []);

//   return (
//     <div>
//       <h2>Bookings Report by Day of Week</h2>
//       <Bar data={data} />
//     </div>
//   );
// };

// export default BookingReport;



import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import axios from "axios";
import api from "../../config/axios";

const BookingReport = () => {
  const [data, setData] = useState({
    labels: [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ],
    datasets: [
      {
        label: "Bookings by Day of Week",
        data: [0, 0, 0, 0, 0, 0, 0], // Initial data set to 0
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 205, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(201, 203, 207, 0.2)",
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
          "rgb(153, 102, 255)",
          "rgb(201, 203, 207)",
        ],
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    api
      .get("/bookingDetail/report")
      .then((response) => {
        console.log("API Response:", response.data); // Log the response data
        const newData = {
          labels: [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ],
          datasets: [
            {
              label: "Bookings by Day of Week",
              data: [
                response.data["Sunday"] || 0,
                response.data["Monday"] || 0,
                response.data["Tuesday"] || 0,
                response.data["Wednesday"] || 0,
                response.data["Thursday"] || 0,
                response.data["Friday"] || 0,
                response.data["Saturday"] || 0,
              ],
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(255, 159, 64, 0.2)",
                "rgba(255, 205, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(201, 203, 207, 0.2)",
              ],
              borderColor: [
                "rgb(255, 99, 132)",
                "rgb(255, 159, 64)",
                "rgb(255, 205, 86)",
                "rgb(75, 192, 192)",
                "rgb(54, 162, 235)",
                "rgb(153, 102, 255)",
                "rgb(201, 203, 207)",
              ],
              borderWidth: 1,
            },
          ],
        };
        setData(newData);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div>
      <h2>Bookings Report by Day of Week</h2>
      <Bar data={data} />
    </div>
  );
};

export default BookingReport;