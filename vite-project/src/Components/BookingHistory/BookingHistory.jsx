// import React, { useState } from "react";
// import BookingDetails from "./BookingDetails";
// import { useNavigate } from "react-router-dom";

// const BookingHistory = (props) => {

//   let [showBookingDetail, updateShowBookingDetail] = useState(false);
//   function displayDetail() {
//     updateShowBookingDetail(true);
//   }
//   function hideDetail() {
//     updateShowBookingDetail(false);
//   }
//   return (
//     <li
//       className="list-group-item"
//       style={{ margin: 7, backgroundColor: "ivory" }}
//     >
//       <div className="container media align-items-lg-center flex-column flex-lg-row p-3 d-flex">
//         <div className="media-body col-8">
//           <h5 className="mt-0 font-weight-bold mb-2">
//             Order ID: {props.orderID}
//           </h5>
//           <p className="font-italic text-muted mb-0 small text-secondary">
//             Club: {props.club} - {props.address}
//           </p>
//           <p className="text-muted mb-0 small text-secondary padding-right-50">
//             Time: {props.time}
//           </p>
//           <p className="text-muted mb-0 small text-secondary">
//             Booking Create Time: {props.bookingCreateTime}
//           </p>
//         </div>
//         <div className="col-2 ">
//           <span className="text-center badge bg-success">{props.status}</span>
//         </div>
//         <div className="col-2 ">
//           <button className="bg-primary bg-opacity-50" onClick={displayDetail}>
//             Details
//           </button>
//         </div>
//         <BookingDetails
//           showDetail={showBookingDetail}
//           showId={props}
//           hideDetail={hideDetail}
//         ></BookingDetails>
//       </div>
//     </li>
//   );
// };

// export default BookingHistory;

import React, { useState } from "react";
import BookingDetails from "./BookingDetails"; // Assuming BookingDetails is also redesigned for Ant Design
import { Card, List, Space, Button, Collapse } from "antd";
import QRCode from "qrcode.react"; // Import QRCode from qrcode.react

const BookingHistory = (props) => {
  const [showBookingDetail, updateShowBookingDetail] = useState(false);

  const displayDetail = () => {
    updateShowBookingDetail(true);
  };

  const hideDetail = () => {
    updateShowBookingDetail(false);
  };

  const renderBookingDetails = () => (
    <Collapse.Panel header={`Order ID: ${props.orderID}`}>
      <BookingDetails booking={props} hideDetail={hideDetail} />
    </Collapse.Panel>
  );

  // Generate QR code value based on the format {"bookingId": booking.orderID}
  const qrCodeValue = JSON.stringify({ bookingId: props.orderID });

  return (
    <Card
      bordered={false}
      style={{
        margin: "16px 24px",
        padding: "16px",
        backgroundColor: "#f5f5f5", // Light grey background
      }}
    >
      <List
        itemLayout="horizontal"
        dataSource={[props]} // Assuming data is passed as a single object
        renderItem={(booking) => (
          <List.Item
            actions={[
              <Button type="link" onClick={displayDetail}>
                Details
              </Button>,
            ]}
          >
            <List.Item.Meta
              avatar={<div className="status-badge">{booking.status}</div>}
              title={`Order ID: ${booking.orderID}`}
              description={
                <Space direction="vertical">
                  <p>
                    Club: {booking.club} - {booking.address}
                  </p>
                  <p>
                    Booking Create Time:{" "}
                    {new Date(booking.bookingCreateTime).toLocaleDateString(
                      "en-GB",
                      { year: "numeric", month: "2-digit", day: "2-digit" }
                    )}
                  </p>
                  {/* Display QR Code */}
                  <div style={{ textAlign: "left" }}>
                    <QRCode value={qrCodeValue} />
                  </div>
                </Space>
              }
            />
            {showBookingDetail && renderBookingDetails()}
          </List.Item>
        )}
      />
      <BookingDetails
        showDetail={showBookingDetail}
        showId={props.orderID}
        hideDetail={hideDetail}
      ></BookingDetails>
    </Card>
  );
};

export default BookingHistory;
