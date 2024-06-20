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
import { Form, DatePicker, Button, message, Select, InputNumber } from "antd";
import moment from "moment";
import { Option } from "antd/es/mentions";
import NavBar from "../layout/NavBar";
import Footer from "../layout/Footer";
import api from "../../config/axios";
import BookingType1 from "./BookingType1";
import BookingType2 from "./BookingType2";
import BookingType3 from "./BookingType3";
import { useParams } from "react-router-dom";

const BookingForm = () => {
  const { id } = useParams();
  console.log(id);

  const [bookingType, setBookingType] = useState(null);
  const [bookingId, setBookingId] = useState();
  const [courtId, setCourtID] = useState();
  const [bookingDetailRequestCombos, setBookingDetailRequestCombos] = useState(
    []
  );
  console.log(bookingDetailRequestCombos);
  const [form] = Form.useForm();
  // //insert today
  // useEffect(() => {
  //   form.setFieldsValue({
  //     bookingDate: moment(),
  //   });
  // }, [form]);

  //post api, create booking
  const bookingDetailRequest = (items) => {
    console.log(items);
    setBookingDetailRequestCombos(items);
  };

  const onFinish = async (values) => {
    //   const payload = {
    //     bookingDate: values.bookingDate.toISOString(),
    //     club_id: id,
    //     booking_type_id: values.booking_type_id,
    //   };
    //   console.log(payload);
    //   try {
    //     const data = await api.post("/booking", payload); // Assuming your API endpoint
    //     message.success("Booking successful!");
    //     form.resetFields();
    //     form.setFieldsValue({
    //       bookingDate: moment(),
    //     });
    //     // console.log(data.data);
    //     setBookingId(data.data.id);
    //   } catch (error) {
    //     message.error("Booking failed, please try again.");
    //     console.error(error); // Log the error for debugging
    //   }
    // };
    // const postBooking = async () => {
    // Prepare bookingCreateRequest

    try {
      // Make the POST request
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
  // const accessToken = localStorage.getItem("token");

  useEffect(() => {
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

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <NavBar /> {/* Render NavBar at the top */}
      <div style={{ display: "flex", justifyContent: "center", marginTop: 20 }}>
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

            <Form.Item
              name="booking_type_id"
              label="Booking Type"
              rules={[
                { required: true, message: "Please select the booking type!" },
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
              ></BookingType3>
            )}

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BookingForm;
