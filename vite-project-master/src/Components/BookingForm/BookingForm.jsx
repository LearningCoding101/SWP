
import React, { createContext, useContext, useEffect, useState } from "react";
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
import useGetParams from './../../assets/hooks/useGetParams';
import TransactionSuccess from "../Payment/TransactionSuccess";
import Transaction from "../Payment/Transaction";
import { connect } from 'react-redux';
const BookingForm = ({ children }) => {
  // const BookingIdContext = createContext(null);
  const handleSetId = (id) => {
    props.setId(id); // Dispatch an action to update state
  };
  const param = useGetParams();
  const { id } = useParams();
  console.log(id);

  const [bookingType, setBookingType] = useState(null);
  const [bookingId, setBookingId] = useState();
  const [courtId, setCourtID] = useState();
  const [bookingConfirm, setBookingConfirm] = useState([]);
  const [bookingData, setBookingData] = useState([]);
  const [totalPrice, setTotalPrice] = useState("");
  const [bookId, setBookId] = useState("");
  const [bookingDate, setBookingDate] = useState("");
  const [parentId, setParentId] = useState(null);
  const [bookingDetailRequestCombos, setBookingDetailRequestCombos] = useState(
    []
  );
  console.log(bookingDetailRequestCombos);
  const [form] = Form.useForm();
  const [form2] = Form.useForm();
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
    try {
      // Make the POST request
      const response = await api.post("/booking/bookingCombo", {
        club_id: +id,
        booking_type_id: values.booking_type_id,
        bookingDetailRequestCombos: bookingDetailRequestCombos,
      });
      console.log(response)
      // Handle response here

      const bId = response.data.bookingResponse.id
      setBookId(bId)
      setBookingDate(response.data.bookingResponse.bookingDate)
      const res = await api.get(`/transactions/price/${bId}`) 
      setTotalPrice(res.data.totalPriceNeedToPay)
      console.log(res.data.totalPriceNeedToPay)
      localStorage.setItem("totalPrice", res.data.totalPriceNeedToPay)
      setBookingConfirm(res.data)
      console.log(res.data)
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

  const handlePayament = async () => {
    const payment = {
      bookingId: bookId,
      amount: totalPrice
    }

   

    try {
      const paymentResponse = await api.post("/pay", payment)
      const paymentURL = paymentResponse.data; // Assuming the entire response is the URL
      if (paymentURL) {
        window.location.href = paymentURL;
      } else {
        console.error("No paymentURL found in response");
      }
      
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    
    <div style={{ display: "flex", flexDirection: "row", gap: "20px", justifyContent: "center" }}>
  
      <NavBar /> {/* Render NavBar at the top */}
      <div style={{ display: "flex", justifyContent: "flex-start", marginTop: 150 }}>
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
                Confirm Booking
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>


      {/* Right form */}
      <div style={{ display: "flex", justifyContent: "flex-start", marginTop: 150 }}>
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
            form={form2}
            name="bookingForm"
            layout="vertical"
            onFinish={handlePayament}
          >
            <div>
              <h3>Booking summary</h3>
              <p>Price: {bookingConfirm?.fullPrice}</p>
              <p>Discount: {bookingConfirm?.salePrice}</p>
              <p>Total: {bookingConfirm?.totalPriceNeedToPay}</p>
            </div>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Checkout
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
