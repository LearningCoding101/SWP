

import React, { useState } from "react";
import BookingDetails from "./BookingDetails"; // Assuming BookingDetails is also redesigned for Ant Design
import { Card, List, Space, Button, Collapse } from "antd";
import QRCode from "qrcode.react"; // Import QRCode from qrcode.react
import { Link } from "react-router-dom";

const BookingHistory = (props) => {
  const [showBookingDetail, updateShowBookingDetail] = useState(false);

  const displayDetail = () => {
    showBookingDetail == false
      ? updateShowBookingDetail(true)
      : updateShowBookingDetail(false);
  };

  const hideDetail = () => {
    updateShowBookingDetail(false);
  };

  // const renderBookingDetails = () => (
  //   <Collapse.Panel header={`Order ID: ${props.orderID}`}>
  //     <BookingDetails booking={props} hideDetail={hideDetail} />
  //   </Collapse.Panel>
  // );

  // Generate QR code value based on the format {"bookingId": booking.orderID}
  const qrCodeValue = JSON.stringify({ bookingId: props.orderID });

  return (
    <div>
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
                <Button type="primary" onClick={displayDetail}>
                  Details
                </Button>,
                booking.status === "COMPLETED" && (
                <Link to={`/feedback/${props.orderID}`}>
                  <Button type="primary">
                  Feedback
                  </Button>
                </Link>
                ),
                booking.status === "PENDING" && (
                  <Link to={`/UpdateForCustomer/${booking.orderID}/${props.clubId}`}>
                    <Button type="primary">
                    Update Booking
                    </Button>
                  </Link>
                ),
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
              {/* {showBookingDetail && renderBookingDetails()} */}
            </List.Item>
          )}
        />
        {showBookingDetail && (
          <div
            className={`alert ${props.showDetail ? "" : "hidden"}`}
            role="alert"
          // style={{ backgroundColor: "white", maxWidth: "1200px", display: "" }}
          // style={{
          //   backgroundColor: "white",
          //   overflowY: "auto",
          //   maxHeight: "400px",
          // }}
          >
            <BookingDetails
              showDetail={showBookingDetail}
              showId={props.orderID}
            // hideDetail={hideDetail}
            ></BookingDetails>
          </div>
        )}
      </Card>
    </div>
  );
};

export default BookingHistory;
