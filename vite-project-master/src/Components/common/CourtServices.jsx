

// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import api from "../../config/axios";
// import { Carousel, Card, Empty } from 'antd'; // Import Ant Design components

// const CourtServices = () => {
//   const [clubs, setClubs] = useState([]);
//   const accessToken = localStorage.getItem("token");
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchClubs = async () => {
//       try {
//         const response = await api.get("/clubs", {
//           headers: { Authorization: `Bearer ${accessToken}` },
//         });
//         setClubs(response.data); // Display 4 cards at once
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchClubs();
//   }, [accessToken]);

//   return (
//     <div className="court-services-container">
//       <Carousel autoplay={true} slidesToShow={4} dots={false}>
//         {clubs.length > 0 ? (
//           clubs.map((club) => (
//             <div key={club.id} className="club-card" style={{ margin: '10px'}}> {/* Added margin for spacing */}
//               <Card
//                 cover={<img alt={club.name} src={club.picture_location} />}
//                 className="custom-card"
//                 style={{gap: '20px'}}
//               >
//                 <Card.Meta title={club.name} description={`Open: ${club.open_time} - ${club.close_time}`} />
//               </Card>
//             </div>
//           ))
//         ) : (
//           <Empty description="No clubs found." />
//         )}
//       </Carousel>
//     </div>
//   );
// };

// export default CourtServices;


import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from "../../config/axios";
import { Carousel, Card, Empty } from 'antd';
import { Row, Col } from 'antd'; // Import Row and Col for responsive layout

const CourtServices = () => {
  const [clubs, setClubs] = useState([]);
  const accessToken = localStorage.getItem("token");
  const navigate = useNavigate();

  const MAX_CARDS_PER_ROW = 3; // Adjust this value to control responsiveness

  useEffect(() => {
    const fetchClubs = async () => {
      try {
        const response = await api.get("/clubs", {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        setClubs(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchClubs();
  }, [accessToken]);

  return (
    <div className="court-services-container">
      <Carousel autoplay={true}  slidesToShow={4} dots={false}>
        {clubs.length > 0 ? (
          clubs.map((club, index) => (
            <Row justify="center" key={club.clubId}> {/* Center cards horizontally */}
              <Col
              // xs={24} sm={12} md={8} lg={6} key={club.clubId}
                span={24 / MAX_CARDS_PER_ROW} // Adjust span based on desired cards per row
                style={{ padding: '10px' }} // Add padding for spacing
              >
                <Card
                //  size="large"
                  cover={<img alt={club.name} src={club.picture_location} style={{ width: '100%', height: '200px' }} />} // Ensure consistent image size
                  className="custom-card"
                  style={{ marginBottom: '20px' , width: 300, height: 400}} // Add spacing between cards
                >
                  <Card.Meta title={club.name} description={`Open: ${club.open_time} - ${club.close_time}`} />
                </Card>
              </Col>
            </Row>
          ))
        ) : (
          <Empty description="No clubs found." />
        )}
      </Carousel>
    </div>
  );
};

export default CourtServices;
