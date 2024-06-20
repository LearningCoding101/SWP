import React, { useState } from "react";
import { Form, DatePicker, message, Radio } from "antd";
import api from "../../config/axios";

const BookingType1 = (props) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [courtTimeSlots, setCourtTimeSlots] = useState([]);
  const [error, setError] = useState(null);
  console.log(selectedDate);
  const handleDateChange = async (date) => {
    setSelectedDate(date.format("YYYY-MM-DD"));
    await fetchCourtTimeSlots(date.format("YYYY-MM-DD"));
  };

  const handleTimeSelection = (startTime, endTime) => {
    message.success(`Selected time: ${startTime} - ${endTime}`);
    // Perform further actions (e.g., submit form with selected time)
  };

  //GET Court Time Slot
  const fetchCourtTimeSlots = async (date) => {
    console.log(props.courtId);
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
      console.error(error);
      setError(error.message);
    }
  };

  // Prepare bookingDetailRequestCombos
  const onChange = (values) => {
    // console.log(values);
    const bookingTypeDetail = [
      {
        courtTSId: values.target.value, // Update with correct value if available
        bookingDate: selectedDate,
        durationInMonths: 0, // Update with correct value if available
        dayOfWeek: null, // Update with correct value if available
      },
    ];

    console.log(bookingTypeDetail);
    props.bookingDetail(bookingTypeDetail);
  };

  return (
    <div name="bookingType1Form" layout="vertical">
      <Form.Item
        name="Date"
        label="Select Booking Date"
        rules={[{ required: true, message: "Please select the booking date!" }]}
      >
        <DatePicker format="YYYY-MM-DD" onChange={handleDateChange} />
      </Form.Item>

      <Form.Item
        name="time"
        label="Availble Times"
        rules={[{ required: true, message: "Please select a time!" }]}
      >
        <Radio.Group>
          {availableTimes.map((item, index) => (
            <Radio.Button
              key={index}
              value={item.courtTimeSlotId}
              onClick={() =>
                handleTimeSelection(item.start_time, item.end_time)
              }
              onChange={onChange}
            >
              {item.start_time} - {item.end_time}
            </Radio.Button>
          ))}
        </Radio.Group>
      </Form.Item>
    </div>
  );
};

export default BookingType1;
