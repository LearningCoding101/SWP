
import React, { useEffect, useState } from "react";
import { Form, DatePicker, Button, message, Select, InputNumber } from "antd";
import axios from "axios"; // Assuming you're using axios for API calls
import moment from "moment";
import { Option } from "antd/es/mentions";
import NavBar from "../layout/NavBar";
import Footer from "../layout/Footer";
import api from "../../config/axios";
import BookingType1 from './BookingType1';
import BookingType2 from './BookingType2';
import BookingType3 from './BookingType3';
import { useNavigate } from "react-router-dom";

const BookingForm = (test) => {
  const [form] = Form.useForm();
  const [bookingType, setBookingType] = useState(null);
  const navigate = useNavigate();


  useEffect(() => {
    form.setFieldsValue({
      bookingDate: moment(),
    });
  }, [form]);

  const onFinish = async (values) => {
    const payload = {
      bookingDate: values.bookingDate.toISOString(),
      club_id: values.club_id,
      booking_type_id: values.booking_type_id,
    };

    try {
      const data = await api.post("/booking", payload); // Assuming your API endpoint
      message.success("Booking successful!");
      form.resetFields();
      form.setFieldsValue({
        bookingDate: moment(),
      });
      const IdData = data.data
      const Id = IdData?.id
      localStorage.setItem("bookingId", Id)
      navigate(`/transaction/${Id}`)
      console.log(data)
    } catch (error) {
      message.error("Booking failed, please try again.");
      console.error(error); // Log the error for debugging
      
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <NavBar /> {/* Render NavBar at the top */}
      <div style={{ display: "flex", justifyContent: "center", marginTop: 90 }}> {/* Added margin-top for space */}
        <div
          style={{
            width: "500px",
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
            initialValues={{
              bookingDate: moment(),
            }}
          >
            <Form.Item
              name="bookingDate"
              label="Booking Date"
              rules={[{ required: true, message: "Please select the booking date!" }]}
            >
              <DatePicker showTime format="YYYY-MM-DD" />
            </Form.Item>

            <Form.Item
              name="club_id"
              label="Club ID"
              rules={[{ required: true, message: "Please input the club ID!" }]}
            >
              <InputNumber min={0} style={{ width: "100%" }} />
            </Form.Item>

            <Form.Item
              name="booking_type_id"
              label="Booking Type"
              rules={[{ required: true, message: "Please select the booking type!" }]}
            >
              <Select onChange={(value) => setBookingType(value)}>
                <Option value={1}>Theo giờ (Hourly)</Option>
                <Option value={3}>Theo tuần (Weekly)</Option>
                <Option value={2}>Theo tháng (Monthly)</Option>
              </Select>
            </Form.Item>

            {bookingType === 1 && <BookingType1/>}
            {bookingType === 2 && <BookingType2/>}
            {bookingType === 3 && <BookingType3/>}

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
