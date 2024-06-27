// import React, { useEffect } from "react";
// import { Form, DatePicker, Button, message, Select, InputNumber } from "antd";
// import axios from "axios";
// import moment from "moment";
// import { Option } from "antd/es/mentions";
// import NavBar from "../layout/NavBar";
// import Footer from "../layout/Footer";
// import api from "../../config/axios";

// // const { Option } = Select;

// const BookingForm = () => {
//   const [form] = Form.useForm();

//   useEffect(() => {
//     form.setFieldsValue({
//       bookingDate: moment(),
//     });
//   }, [form]);

//   const onFinish = async (values) => {
//     const payload = {
//       bookingDate: values.bookingDate.toISOString(),
//       club_id: values.club_id,
//       booking_type_id: values.booking_type_id,
//     };

//      const data = await api.post("/booking", payload)
//       .then((response) => {
//         message.success("Booking successful!");
//         form.resetFields();
//         form.setFieldsValue({
//           bookingDate: moment(),
//         });
//       })
//       .catch((error) => {
//         message.error("Booking failed, please try again.");
//       });
//     console.log(data);
//   };

//   return (
//     <div>
//     <NavBar/>
//     <Form
//       form={form}
//       name="bookingForm"
//       layout="vertical"
//       onFinish={onFinish}
//       initialValues={{
//         bookingDate: moment(),
//       }}
//     >
//       <Form.Item
//         name="bookingDate"
//         label="Booking Date"
//         rules={[{ required: true, message: "Please select the booking date!" }]}
//         style={{ display: "none" }} // Hide the field
//       >
//         {/* <DatePicker showTime format="YYYY-MM-DDTHH:mm:ss.SSSZ" /> */}
//         <DatePicker showTime format="YYYY-MM-DD" />
//       </Form.Item>

//       <Form.Item
//         name="club_id"
//         label="Club ID"
//         rules={[{ required: true, message: "Please input the club ID!" }]}
//       >
//         <InputNumber min={0} style={{ width: "100%" }} />
//       </Form.Item>

//       <Form.Item
//         name="booking_type_id"
//         label="Booking Type"
//         rules={[{ required: true, message: "Please select the booking type!" }]}
//       >
//         <Select>
//           <Option value={1}>Theo giờ</Option>
//           <Option value={2}>Theo tuần</Option>
//           <Option value={3}>Theo tháng</Option>
//         </Select>
//       </Form.Item>

//       <Form.Item>
//         <Button type="primary" htmlType="submit">
//           Submit
//         </Button>
//       </Form.Item>
//     </Form>
//     <Footer/>
//     </div>
//   );
// };

// export default BookingForm;
import React, { useContext, useEffect, useState } from "react";
import {
  Form,
  DatePicker,
  Button,
  message,
  Select,
  InputNumber,
  Flex,
  Input,
} from "antd";
import moment from "moment";
import { Option } from "antd/es/mentions";
import NavBar from "../layout/NavBar";
import Footer from "../layout/Footer";
import api from "../../config/axios";
import BookingType1 from "./BookingType1";
import BookingType2 from "./BookingType2";
import BookingType3 from "./BookingType3";
import { Link, useParams } from "react-router-dom";

const BookingForm = () => {
  const { id } = useParams();
  console.log(id);

  const [bookingType, setBookingType] = useState(null);
  const [bookingId, setBookingId] = useState();
  const [courtId, setCourtID] = useState();
  const [sum, setSum] = useState(0);
  const [clickCount, setClickCount] = useState(0);
  const [bookingDetailRequestCombos, setBookingDetailRequestCombos] = useState(
    []
  );
  const [days, setDays] = useState(0);

  const isLoggedIn = localStorage.getItem("token");
  const userRole = localStorage.getItem("userRole");
  const [form] = Form.useForm();
  // //insert today
  // useEffect(() => {
  //   form.setFieldsValue({
  //     bookingDate: moment(),
  //   });
  // }, [form]);
  const isEnoughDay = (value) => {
    setDays(value);
  };

  //post api, create booking
  const bookingDetailRequest = (items) => {
    setBookingDetailRequestCombos(items);
  };

  const onFinish = async (values) => {
    if (bookingType === 3 && days != bookingDetailRequestCombos.length) {
      message.error("Not Booking enough slots");
      return;
    }
    try {
      // Make the POST request
      console.log("check");
      console.log(bookingDetailRequestCombos);
      const response = await api.post("/booking/bookingCombo", {
        club_id: +id,
        booking_type_id: values.booking_type_id,
        bookingDetailRequestCombos: bookingDetailRequestCombos,
      });
      // Handle response here
      console.log("Booking created:", response.data);
      message.success("Booking successful!");
    } catch (error) {
      // Handle error here
      console.error("Error creating booking:", error);
      message.error("Booking failed. Please try again.");
    }
  };

  //call for court name
  const [courts, setCourts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    //GET Court
    const fetchCourts = async () => {
      try {
        const response = await api.get(`/court/${id}`);

        console.log(response.data);
        setCourts(response.data);
        // const data = response.data;
        // const bookingId = data.id;
        // localStorage.setItem("Id", bookingId);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchCourts();
  }, []);

  //GET Summary
  const fetchSum = async () => {
    try {
      const sumResponse = await api.get(
        `/transactions/predictedPrice/${id}/${bookingType}/${bookingDetailRequestCombos.length}`
      );

      console.log(sumResponse.data);
      setSum(sumResponse.data);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleClick = () => {
    setClickCount(clickCount + 1);
    fetchSum();
  };
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <NavBar /> {/* Render NavBar at the top */}
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: 100 }}
      >
        {" "}
        {/* Added margin-top for space */}
        <div
          style={{
            width: "511px",
            padding: 20,
            backgroundColor: "#fff",
            borderRadius: 10,
            border: "1px solid #ccc",
          }}
        >
          {isLoggedIn ? (
            <Form
              form={form}
              name="bookingForm"
              layout="vertical"
              onFinish={onFinish}
              // initialValues={{
              //   bookingDate: moment(),
              // }}
            >
              {/* <Form.Item
              name="bookingDate"
              label="Booking Date"
              rules={[
                { required: true, message: "Please select the booking date!" },
              ]}
              style={{ display: "none" }} // Hide the field
            >
              <DatePicker showTime format="YYYY-MM-DD" />
            </Form.Item> */}

              <Form.Item
                name="name"
                label="Court Name"
                rules={[
                  { required: true, message: "Please select the court name!" },
                ]}
              >
                <Select
                  placeholder="Select a Court Name"
                  onChange={(key) => setCourtID(key)}
                >
                  {courts.map((court) => (
                    <Option key={court.id} value={court.id}>
                      {court.courtName}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              {/* {userRole === "ClUB_OWNER" ? (
                <Form.Item
                  label="Phone Number"
                  name="phonenumber"
                  rules={[
                    { required: true, message: "Please enter a phone number" },
                    {
                      pattern: /^\d+$/,
                      message: "Phone number must be numeric and non-negative",
                    },
                  ]}
                >
                  <Input
                    // value={phoneNumber}
                    // onChange={handlePhoneNumberChange}
                    placeholder="Phone number"
                  />
                </Form.Item>
              ) : null} */}

              <Form.Item
                name="booking_type_id"
                label="Booking Type"
                rules={[
                  {
                    required: true,
                    message: "Please select the booking type!",
                  },
                ]}
              >
                <Select onChange={(value) => setBookingType(value)}>
                  <Option value={1}>Lịch ngày</Option>
                  <Option value={2}>Lịch cố định</Option>
                  <Option value={3}>Lịch linh hoạt</Option>
                </Select>
              </Form.Item>

              {bookingType === 1 && (
                <BookingType1
                  courtId={courtId}
                  bookingDetail={bookingDetailRequest}
                ></BookingType1>
              )}
              {bookingType === 2 && (
                <BookingType2
                  courtId={courtId}
                  bookingDetail={bookingDetailRequest}
                ></BookingType2>
              )}
              {bookingType === 3 && (
                <BookingType3
                  courtId={courtId}
                  bookingDetail={bookingDetailRequest}
                  isEnoughDay={isEnoughDay}
                ></BookingType3>
              )}

              <Form.Item>
                <Button type="link" onClick={handleClick}>
                  Total: {clickCount > 0 && `${sum.moneyback}`}₫
                </Button>
                <Button type="primary" htmlType="submit">
                  Confirm Booking
                </Button>
              </Form.Item>
            </Form>
          ) : (
            <Form>
              <h1>You need to log in before booking a court</h1>
              <Form.Item form={form} name="bookingForm" layout="vertical">
                <Link to={"/login"}>
                  <Flex vertical gap="small" style={{ width: "100%" }}>
                    <Button type="primary" htmlType="submit">
                      Log in
                    </Button>
                  </Flex>
                </Link>
              </Form.Item>
            </Form>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BookingForm;
