// import React, { useEffect, useState } from "react";
// // import "./BookingDetails.css";
// import ReactDOM from "react-dom";
// import api from "../../config/axios";
// import { List, Card, Image, Typography, Button, Space, Empty } from "antd";
// import { useParams } from "react-router-dom";

// import Slider from "react-slick";

// const BookingDetails = (props) => {
//   var settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 2,
//     slidesToScroll: 1,
//   };

//   const [bookingDetails, setBookingDetails] = useState([]);

//   const test = props.showId;

//   useEffect(() => {
//     const fetch = async () => {
//       try {
//         const data2 = await api.get(`/bookingDetail/${test}`);
//         console.log("Booking details data", data2.data);
//         setBookingDetails(data2.data);
//       } catch (err) {
//         console.log(err);
//       }
//     };
//     fetch();
//   }, []);
//   return (
//     <>
//       <h2>Detail</h2>
//       <div>
//         {bookingDetails.length > 0 ? (
//           // <div className="container-booking">
//           //   <div className="row row-cols-1 row-cols-md-2 g-4">
//           //     {bookingDetails?.map((booking) => (
//           //       <div className="col" key={booking.bookingId}>
//           //         <div className="card">
//           //           <div className="card-body">
//           //             <h5 className="card-title">Court: {booking.courtName}</h5>
//           //             <p className="card-text">
//           //               Name: {booking.fullnameoforder} <br />
//           //               Phone: {booking.phonenumber}
//           //             </p>
//           //             <p className="card-text">
//           //               <span className="fw-bold">Time:</span>
//           //               <br />
//           //               Start: {booking.start_time} <br />
//           //               End: {booking.end_time}
//           //             </p>
//           //           </div>
//           //         </div>
//           //       </div>
//           //     ))}
//           //   </div>

//           // </div>
//           <List
//             itemLayout="horizontal"
//             dataSource={bookingDetails}
//             renderItem={(booking) => (
//               <List.Item style={{ overflowY: "auto", maxHeight: "300px" }}>
//                 <List.Item.Meta
//                   //
//                   title={
//                     <Typography.Title level={4}>
//                       Court: {booking.courtName}
//                     </Typography.Title>
//                   }
//                   description={
//                     <Space direction="vertical">
//                       <Typography.Text>
//                         Name: {booking.fullnameoforder}
//                       </Typography.Text>
//                       <Typography.Text>
//                         Phone: {booking.phonenumber}
//                       </Typography.Text>
//                       <Typography.Text strong>Time:</Typography.Text>
//                       <Typography.Text>
//                         Start: {booking.start_time}
//                       </Typography.Text>
//                       <Typography.Text>End: {booking.end_time}</Typography.Text>
//                     </Space>
//                   }
//                 />
//               </List.Item>
//             )}
//           />
//         ) : (
//           <Empty />
//         )}
//       </div>

//       {/* <div className={`overlay ${props.showDetail ? "" : "hidden"}`}></div> */}
//     </>
//   );
// };

// export default BookingDetails;


import React, { useEffect, useState } from "react";
// import "./BookingDetails.css";
import ReactDOM from "react-dom";
import api from "../../config/axios";
import { List, Card, Image, Typography, Button, Space, Empty } from "antd";
import { useParams } from "react-router-dom";
import { Row, Col } from "antd";
import Slider from "react-slick";

const BookingDetails = (props) => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
  };

  const [bookingDetails, setBookingDetails] = useState([]);

  const test = props.showId;

  useEffect(() => {
    const fetch = async () => {
      try {
        const data2 = await api.get(`/bookingDetail/${test}`);
        console.log("Booking details data", data2.data);
        setBookingDetails(data2.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetch();
  }, []);
  return (
    <>
      <h2>Detail</h2>
      <div>
        {bookingDetails.length > 0 ? (
          <Row gutter={[16, 16]}>
            {bookingDetails.map((booking) => {
              // Create a new Date object from the booking date
              const bookingDate = new Date(booking.bookingDate);

              // Format the date
              const year = bookingDate.getFullYear();
              const month = bookingDate.getMonth() + 1; // Months are zero-based
              const day = bookingDate.getDate();
              const dayOfWeek = bookingDate.toLocaleString('en-US', { weekday: 'long' }); // This will return the day of the week

              return (
                <Col span={12}>
                  <List.Item>
                    <List.Item.Meta
                      title={
                        <Typography.Title level={4}>
                          Court: {booking.courtName}
                        </Typography.Title>
                      }
                      description={
                        <Space direction="vertical">
                          <Typography.Text>
                            Name: {booking.fullnameoforder}
                          </Typography.Text>
                          <Typography.Text>
                            Phone: {booking.phonenumber}
                          </Typography.Text>
                          <Typography.Text strong>
                            Time: Start: {booking.start_time} - End: {booking.end_time}
                          </Typography.Text>
                          <Typography.Text strong>
                            Date: {month}/{day}/{year} ({dayOfWeek})
                          </Typography.Text>
                        </Space>
                      }
                    />
                  </List.Item>
                </Col>
              );
            })}
          </Row>
        ) : (
          <Empty />
        )}
      </div>
    </>
  );
};

export default BookingDetails;