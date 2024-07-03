// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { ResponsiveLine } from '@nivo/line';
// import api from '../../config/axios';

// const MyResponsiveLine = () => {
//     const [data, setData] = useState([]);
//     const token = "eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJzdHJpbmciLCJpYXQiOjE3MTkzNzQ4NTAsImV4cCI6MTcxOTQ2MTI1MH0.C19An1Q33c6us2aQaY_is0LTvoJFAg1E7gSjAfjp6oqUszbga9grKZgZK_Yz26Gz    ";
//     const [selectedYear, setSelectedYear] = useState(new Date().getFullYear() - 1); // Initial selected year, can be changed

//     useEffect(() => {
//         fetchData(selectedYear);
//     }, [selectedYear]);

//     const fetchData = async (year) => {
//         try {

//             const response = await api.get(`/transactions/totalAmountByMonth?year=${year}`, {
//                 headers: {
//                     'Authorization': `Bearer ${token}`
//                 }
//             })
    
//             const transformedData = transformData(response.data);
//             setData(transformedData);
//         } catch (error) {
//             console.error('Error fetching data:', error);
//         }
//     };

//     const transformData = (data) => {
//         // Initialize array for 12 months with total amount 0
//         const months = Array.from({ length: 12 }, (_, index) => index + 1);
//         const transformedData = months.map(month => {
//             const found = data.find(item => item.month === month);
//             return {
//                 x: `${month}`,
//                 y: found ? found.totalAmount : 0
//             };
//         });

//         return [
//             {
//                 id: 'Total Amount',
//                 data: transformedData
//             }
//         ];
//     };
//     const handleYearChange = (event) => {
//         const year = parseInt(event.target.value);
//         setSelectedYear(year);
//     };

//     const currentYear = new Date().getFullYear();
//     const years = Array.from({ length: currentYear - 2000 + 1 }, (_, index) => currentYear - index);

//     return (
//         <div>
//             <div style={{ marginBottom: '20px' }}>
//                 <label htmlFor="year">Select Year:</label>
//                 <select id="year" onChange={handleYearChange} value={selectedYear}>
//                     {years.map(year => (
//                         <option key={year} value={year}>{year}</option>
//                     ))}
//                 </select>
//             </div>
//             <div style={{ height: '500px' }}> {/* Ensure the parent container has a defined height */}
//                 {data.length === 0 ? (
//                     <p>No transactions in {selectedYear}</p>
//                 ) : (
//                     <ResponsiveLine
//                         data={data}
//                         margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
//                         xScale={{ type: 'point' }}
//                         yScale={{
//                             type: 'linear',
//                             min: 'auto',
//                             max: 'auto',
//                             stacked: true,
//                             reverse: false
//                         }}
//                         yFormat=" >-.2f"
//                         axisTop={null}
//                         axisRight={null}
//                         axisBottom={{
//                             tickSize: 5,
//                             tickPadding: 5,
//                             tickRotation: 0,
//                             legend: 'Month',
//                             legendOffset: 36,
//                             legendPosition: 'middle'
//                         }}
//                         axisLeft={{
//                             tickSize: 5,
//                             tickPadding: 5,
//                             tickRotation: 0,
//                             legend: 'Total Amount',
//                             legendOffset: -40,
//                             legendPosition: 'middle'
//                         }}
//                         pointSize={10}
//                         pointColor={{ theme: 'background' }}
//                         pointBorderWidth={2}
//                         pointBorderColor={{ from: 'serieColor' }}
//                         pointLabel="yFormatted"
//                         pointLabelYOffset={-12}
//                         enableTouchCrosshair={true}
//                         useMesh={true}
//                         legends={[
//                             {
//                                 anchor: 'bottom-right',
//                                 direction: 'column',
//                                 justify: false,
//                                 translateX: 100,
//                                 translateY: 0,
//                                 itemsSpacing: 0,
//                                 itemDirection: 'left-to-right',
//                                 itemWidth: 80,
//                                 itemHeight: 20,
//                                 itemOpacity: 0.75,
//                                 symbolSize: 12,
//                                 symbolShape: 'circle',
//                                 symbolBorderColor: 'rgba(0, 0, 0, .5)',
//                                 effects: [
//                                     {
//                                         on: 'hover',
//                                         style: {
//                                             itemBackground: 'rgba(0, 0, 0, .03)',
//                                             itemOpacity: 1
//                                         }
//                                     }
//                                 ]
//                             }
//                         ]}
//                     />
//                 )}
//             </div>
//         </div>
//     );
// }

// export default MyResponsiveLine;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { ResponsiveLine } from "@nivo/line";
import api from "../../config/axios";

const MyResponsiveLine = () => {
  const [data, setData] = useState([]);
  //   const token =
  //     "eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJzdHJpbmciLCJpYXQiOjE3MTkzNzQ4NTAsImV4cCI6MTcxOTQ2MTI1MH0.C19An1Q33c6us2aQaY_is0LTvoJFAg1E7gSjAfjp6oqUszbga9grKZgZK_Yz26Gz    ";
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear()); // Initial selected year, can be changed

  useEffect(() => {
    fetchData(selectedYear);
  }, [selectedYear]);

  const fetchData = async (year) => {
    try {
      const response = await api.get(
        `/transactions/totalAmountByMonth?year=${year}`
      );

      const transformedData = transformData(response.data);
      setData(transformedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const transformData = (data) => {
    // Initialize array for 12 months with total amount 0
    const months = Array.from({ length: 12 }, (_, index) => index + 1);
    const transformedData = months.map((month) => {
      const found = data.find((item) => item.month === month);
      return {
        x: `${month}`,
        y: found ? found.totalAmount : 0,
      };
    });

    return [
      {
        id: "Total Amount",
        data: transformedData,
      },
    ];
  };
  const handleYearChange = (event) => {
    const year = parseInt(event.target.value);
    setSelectedYear(year);
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 2000 + 1 },
    (_, index) => currentYear - index
  );

  return (
    <div>
      <div style={{ marginBottom: "20px" }}>
        <label htmlFor="year">Select Year:</label>
        <select id="year" onChange={handleYearChange} value={selectedYear}>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
      <div style={{ height: "500px" }}>
        {" "}
        {/* Ensure the parent container has a defined height */}
        {data.length === 0 ? (
          <p>No transactions in {selectedYear}</p>
        ) : (
          <ResponsiveLine
            data={data}
            margin={{ top: 50, right: 110, bottom: 50, left: 90 }}
            xScale={{ type: "point" }}
            yScale={{
              type: "linear",
              min: "auto",
              max: "auto",
              stacked: true,
              reverse: false,
            }}
            yFormat=" >-.2f"
            axisTop={null}
            axisRight={null}
            axisBottom={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: "Month",
              legendOffset: 36,
              legendPosition: "middle",
            }}
            axisLeft={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: "Total Amount",
              legendOffset: -60,
              legendPosition: "middle",
            }}
            pointSize={10}
            pointColor={{ theme: "background" }}
            pointBorderWidth={2}
            pointBorderColor={{ from: "serieColor" }}
            pointLabel="yFormatted"
            pointLabelYOffset={-12}
            enableTouchCrosshair={true}
            useMesh={true}
            legends={[
              {
                anchor: "bottom-right",
                direction: "column",
                justify: false,
                translateX: 100,
                translateY: 0,
                itemsSpacing: 0,
                itemDirection: "left-to-right",
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: "circle",
                symbolBorderColor: "rgba(0, 0, 0, .5)",
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemBackground: "rgba(0, 0, 0, .03)",
                      itemOpacity: 1,
                    },
                  },
                ],
              },
            ]}
          />
        )}
      </div>
    </div>
  );
};

export default MyResponsiveLine;

