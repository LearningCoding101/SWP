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

const StaffBookingForm = () => {
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
  //--------------------------------------------------------------------------------------------------------------------------------
  const [selectedDate, setSelectedDate] = useState(null);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [selectedSchedule, setSelectedSchedule] = useState([]);
  const [courtTimeSlots, setCourtTimeSlots] = useState([]);
  const [typeDetailList, setTypeDetailList] = useState([]);
  const [numberOfDays, setNumberOfDays] = useState();

  console.log(typeDetailList);
  let isDisabled = typeDetailList.length != numberOfDays ? false : true;
  console.log(isDisabled);

  const handleDateChange = async (date) => {
    setSelectedDate(date.format("YYYY-MM-DD"));
    await fetchCourtTimeSlots(date.format("YYYY-MM-DD"));
  };

  //GET Court Time Slot
  const fetchCourtTimeSlots = async (date) => {
    try {
      const response = await api.get(`/courtTimeSlot/${props.courtId}/${date}`);
      const slotFilter = response.data;
      setCourtTimeSlots(response.data);
      console.log(response.data);
      setAvailableTimes(
        slotFilter.filter((item) => item.status == "AVAILABLE")
      );
      console.log(slotFilter.filter((item) => item.status == "AVAILABLE"));
      // const data = response.data;
      // const bookingId = data.id;
      // localStorage.setItem("Id", bookingId);
    } catch (error) {
      setError(error.message);
    }
  };

  // Check dublicate for date && Prepare + Check dublicate bookingDetailRequestCombos
  const handleAddToSchedule = (id, startTime, endTime) => {
    // const newEntry = { date: selectedDate.format("YYYY-MM-DD"), time };
    const newEntry = { id, date: selectedDate, startTime, endTime };
    const bookingTypeDetail = {
      courtTSId: id, // Update with correct value if available
      bookingDate: selectedDate,
      durationInMonths: 0, // Update with correct value if available
      dayOfWeek: null, // Update with correct value if available
    };

    const isDateDuplicate = selectedSchedule.some(
      (entry) =>
        entry.id === newEntry.id &&
        entry.date === newEntry.date &&
        entry.startTime === newEntry.startTime &&
        entry.endTime === newEntry.endTime
    );
    const isBookingDuplicate = typeDetailList.some(
      (entry) =>
        entry.courtTSId === bookingTypeDetail.courtTSId &&
        entry.bookingDate === bookingTypeDetail.bookingDate
    );

    if (isDateDuplicate) {
      message.warning("This schedule is already added");
    } else {
      setSelectedSchedule([...selectedSchedule, newEntry]);
      message.success(
        `Added ${newEntry.date} at ${newEntry.startTime} - ${newEntry.endTime} to schedule`
      );
    }
    if (!isBookingDuplicate) {
      setTypeDetailList([...typeDetailList, bookingTypeDetail]);
      console.log(typeDetailList);

      props.bookingDetail([...typeDetailList, bookingTypeDetail]);
    }

    props.isEnoughDay(numberOfDays);
  };

  // Prepare bookingDetailRequestCombos
  // const onChange = (values) => {
  //   const bookingTypeDetail = {
  //     courtTSId: values.target.value, // Update with correct value if available
  //     bookingDate: selectedDate,
  //     durationInMonths: 0, // Update with correct value if available
  //     dayOfWeek: null, // Update with correct value if available
  //   };

  //   const isDuplicate = typeDetailList.some(
  //     (entry) =>
  //       entry.courtTSId === bookingTypeDetail.courtTSId &&
  //       entry.bookingDate === bookingTypeDetail.bookingDate
  //   );

  //   if (!isDuplicate) {
  //     setTypeDetailList([...typeDetailList, bookingTypeDetail]);
  //     console.log(typeDetailList);

  //     props.bookingDetail([...typeDetailList, bookingTypeDetail]);
  //   }

  //   props.isEnoughDay(numberOfDays);
  // };

  const handleDeleteFromSchedule = (index) => {
    const newSchedule = [...selectedSchedule];
    newSchedule.splice(index, 1);
    setSelectedSchedule(newSchedule);

    const selectedBooking = [...typeDetailList];
    selectedBooking.splice(index, 1);
    setTypeDetailList(selectedBooking);
    props.bookingDetail(selectedBooking);

    message.success("Schedule entry deleted");
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
            >
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

              <div name="bookingType3Form" layout="vertical">
                <div className="row">
                  <div className="col-md-6">
                    <Form.Item
                      label="Select Booking Date"
                      name="bookingDate"
                      rules={[
                        {
                          required: true,
                          message: "Please select the date you want to book!",
                        },
                      ]}
                    >
                      <DatePicker onChange={handleDateChange} />
                    </Form.Item>
                  </div>
                  {/* <div className="col-md-6">
                    <Form.Item
                      name="numberOfDays"
                      label="Number of slots"
                      rules={[
                        {
                          required: true,
                          message:
                            "Please select the number of days you want to assign!",
                        },
                      ]}
                    >
                      <Select onChange={(value) => setNumberOfDays(value)}>
                        <Option value={10}>10 slots</Option>
                        <Option value={20}>20 slots</Option>
                        <Option value={30}>30 slots</Option>
                        <Option value={40}>40 slots</Option>
                        <Option value={45}>45 slots</Option>
                        <Option value={50}>50 slots</Option>
                      </Select>
                    </Form.Item>
                  </div> */}
                </div>
                {/* {numberOfDays && ( */}
                <Form.Item
                  name="time"
                  label="Available Times"
                  // rules={[{ required: true, message: "Please select a time!" }]}
                >
                  <Radio.Group>
                    {availableTimes.map((item, index) => (
                      <Radio.Button
                        key={index}
                        value={item.courtTimeSlotId}
                        disabled={isDisabled}
                        onClick={() =>
                          handleAddToSchedule(
                            item.courtTimeSlotId,
                            item.start_time,
                            item.end_time
                          )
                        }
                        // onChange={onChange}
                      >
                        {item.start_time} - {item.end_time}
                      </Radio.Button>
                    ))}
                  </Radio.Group>
                  {/* {availableTimes.map((item, index) => (
            <Button key={index} onClick={() => handleAddToSchedule(item.time)}>
              {item.time}
            </Button>
          ))} */}
                </Form.Item>
                {/* )} */}

                <Form.Item label="Selected Schedule">
                  <List
                    bordered
                    dataSource={selectedSchedule}
                    renderItem={(item, index) => (
                      <List.Item>
                        <div>
                          {index + 1}. {item.date} at {item.startTime} -{" "}
                          {item.endTime}
                          <Button
                            type="link"
                            onClick={() => handleDeleteFromSchedule(index)}
                          >
                            Delete
                          </Button>
                        </div>
                      </List.Item>
                    )}
                  />
                </Form.Item>
              </div>

              <Form.Item>
                <Button type="link" onClick={handleClick}>
                  Total: {clickCount > 0 && `${sum.moneyback}`}₫
                </Button>
                <Button
                  type="primary"
                  htmlType="submit"
                  // disabled={!isDisabled}
                >
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

export default StaffBookingForm;