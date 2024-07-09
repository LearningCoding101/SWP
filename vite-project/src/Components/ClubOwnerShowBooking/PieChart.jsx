// import React, { useEffect, useState } from 'react';
// import { Pie } from 'react-chartjs-2';
// import 'chart.js/auto';
// import api from '../../config/axios';
// import { InputNumber, Row, Col, Layout } from 'antd';
// import Input from 'antd/es/input/Input';

// const PieChartComponent = () => {
//   const [clubId, setClubId] = useState(1); // default clubId
//   const [error, setError] = useState(null);
//   const [data, setData] = useState({
//     labels: ['CANCELED', 'COMPLETED'],
//     datasets: [
//       {
//         label: 'Booking Status',
//         data: [0, 0],
//         backgroundColor: ['#FF6384', '#36A2EB'],
//       },
//     ],
//   });

//   useEffect(() => {
//     const fetchStatus = async () => {
//       try {
//         const response = await api.get(`/booking/status-counts?clubId=${clubId}`);
//         const responseData = response.data;
//         setData({
//           labels: ['CANCELED', 'COMPLETED'],
//           datasets: [
//             {
//               label: 'Booking Status',
//               data: [responseData.CANCELED, responseData.COMPLETED],
//               backgroundColor: ['#FF6384', '#36A2EB'],
//             },
//           ],
//         });
//       } catch (error) {
//         setError(error.message);
//       }
//     };

//     fetchStatus();
//   }, [clubId]);

//   return (
//     <Layout style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
//        <h1>Booking Status Pie Chart</h1>
//       <Row gutter={16}>  
//         <Col span={8}>
//         <label htmlFor="pieChart">Club ID</label>
//         <input
//             type="number"
//             value={clubId}
//             onChange={(e) => setClubId(Number(e.target.value))}
//             min="1"
//             placeholder="Enter Club ID"
//           />
          
//         </Col>
//         <Col span={16}>
         
//             <Pie data={data} width={2000} height={2000} />
     
//           {error && <p style={{ color: 'red' }}>Error: {error}</p>}
//         </Col>
//       </Row>
//     </Layout>
//   );
// };

// export default PieChartComponent;

import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import api from '../../config/axios';
import { InputNumber, Row, Col, Layout } from 'antd';

const PieChartComponent = () => {
  const [clubId, setClubId] = useState(1); // default clubId
  const [error, setError] = useState(null);
  const [data, setData] = useState({
    labels: ['CANCELED', 'COMPLETED'],
    datasets: [
      {
        label: 'Booking Status',
        data: [0, 0],
        backgroundColor: ['#FF6384', '#36A2EB'],
      },
    ],
  });

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await api.get(`/booking/status-counts?clubId=${clubId}`);
        const responseData = response.data;
        setData({
          labels: ['CANCELED', 'COMPLETED'],
          datasets: [
            {
              label: 'Booking Status',
              data: [responseData.CANCELED, responseData.COMPLETED],
              backgroundColor: ['#FF6384', '#36A2EB'],
            },
          ],
        });
      } catch (error) {
        setError(error.message);
      }
    };

    fetchStatus();
  }, [clubId]);

  return (
    <Layout style={{ display: 'flex', flexDirection: 'column' }}>
      <Row gutter={8} style={{ padding: '8px' }}>
        <Col span={8}>
          <label htmlFor="pieChart">Club ID</label>
          <input
            type="number"
            value={clubId}
            onChange={(e) => setClubId(Number(e.target.value))}
            min="1"
            placeholder="Enter Club ID"
            style={{marginLeft: 20}}
          />
        </Col>
      </Row>
      <div style={{ width: 700, height: 700}}>
        <Pie data={data} style={{justifyContent: 'center'}}/>
        {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      </div>
    </Layout>
  );
};

export default PieChartComponent;
