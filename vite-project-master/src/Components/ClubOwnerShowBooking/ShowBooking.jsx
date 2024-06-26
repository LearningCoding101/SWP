import React, { useEffect, useState } from "react";
import { Card, Descriptions, List, Spin } from "antd";
import api from "../../config/axios";

const ShowBooking = (props) => {
  console.log(props);
  // const { bookings } = props;
  // console.log(bookings);
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
        // grid={{ gutter: 16, column: 1 }}
        itemLayout="horizontal"
        dataSource={[props]} // Use bookings array here
        renderItem={(booking) => (
          <List.Item>
            <List.Item.Meta
              // avatar={<div className="status-badge">{booking.status}</div>}
              title={`Booking ID: ${booking.bookingID}`}
              description={
                <Descriptions bordered>
                  <Descriptions.Item label="Court TS ID">
                    {booking.courtTSId}
                  </Descriptions.Item>
                  <Descriptions.Item label="Booking Date">
                    {new Date(booking.bookingDate).toLocaleDateString("en-GB", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    })}
                  </Descriptions.Item>
                  <Descriptions.Item label="Booking Details ID">
                    {booking.bookingDetailsId}
                  </Descriptions.Item>
                  <Descriptions.Item label="Court Name">
                    {booking.courtName}
                  </Descriptions.Item>
                  <Descriptions.Item label="Full Name of Order">
                    {booking.fullnameoforder}
                  </Descriptions.Item>
                  <Descriptions.Item label="Phone Number">
                    {booking.phonenumber}
                  </Descriptions.Item>
                  <Descriptions.Item label="Start Time">
                    {booking.start_time}
                  </Descriptions.Item>
                  <Descriptions.Item label="End Time">
                    {booking.end_time}
                  </Descriptions.Item>
                  <Descriptions.Item label="Status">
                    {booking.status}
                  </Descriptions.Item>
                </Descriptions>
              }
            />
          </List.Item>
        )}
      />
    </Card>
    // <li className="list-group-item" style={{ margin: 7 }}>
    //   <div className="container media align-items-lg-center flex-column flex-lg-row p-3 d-flex">
    //     <div className="media-body col-8">
    //       <Descriptions bordered>
    //         <Descriptions.Item label="Court TS ID">
    //           {props.courtTSId}
    //         </Descriptions.Item>
    //         <Descriptions.Item label="Booking Date">
    //           {props.bookingDate}
    //         </Descriptions.Item>
    //         <Descriptions.Item label="Booking Details ID">
    //           {props.bookingDetailsId}
    //         </Descriptions.Item>
    //         <Descriptions.Item label="Court Name">
    //           {props.courtName}
    //         </Descriptions.Item>
    //         <Descriptions.Item label="Full Name of Order">
    //           {props.fullnameoforder}
    //         </Descriptions.Item>
    //         <Descriptions.Item label="Phone Number">
    //           {props.phonenumber}
    //         </Descriptions.Item>
    //         <Descriptions.Item label="Start Time">
    //           {props.start_time}
    //         </Descriptions.Item>
    //         <Descriptions.Item label="End Time">
    //           {props.end_time}
    //         </Descriptions.Item>
    //         <Descriptions.Item label="Status">{props.status}</Descriptions.Item>
    //       </Descriptions>
    //     </div>
    //   </div>
    // </li>
  );
};

export default ShowBooking;
