import React, { useState } from "react";
import { Form, Select, Radio, InputNumber, Button, DatePicker } from "antd";
import axios from "axios";
import moment from "moment";

const timeSlots = [{ time: "07:00" }, { time: "08:00" }, { time: "09:00" }];

const BookingType1 = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [availableTimes, setAvailableTimes] = useState([]);

  // Static data (for demonstration)
  const bookingType2 = [
    { date: "2024-06-16", time: "7:00" },
    { date: "2024-06-16", time: "8:00" },
    { date: "2024-06-16", time: "9:00" },
    { date: "2024-06-15", time: "7:30" },
    { date: "2024-06-15", time: "8:30" },
    { date: "2024-06-15", time: "9:30" },
  ];

  const handleDateChange = (date) => {
    setSelectedDate(date);
    // Filter times based on selected date
    const timesForDate = bookingType2.filter(
      (item) => item.date === date.format("YYYY-MM-DD")
    );
    setAvailableTimes(timesForDate);
  };

  const handleTimeSelection = (time) => {
    message.success(`Selected time: ${time}`);
    // Perform further actions (e.g., submit form with selected time)
  };
  return (
    <div className="row">
      <div className="col-md-6">
        <Form.Item
          name="bookingDate"
          label="Select Booking Date"
          rules={[
            { required: true, message: "Please select the booking date!" },
          ]}
        >
          <DatePicker format="YYYY-MM-DD" onChange={handleDateChange} />
        </Form.Item>
      </div>
      <div className="col-md-6">
        <Form.Item
          name="time"
          label="Select Time"
          rules={[{ required: true, message: "Please select a time!" }]}
        >
          <Radio.Group>
            {availableTimes.map((item, index) => (
              <Radio.Button
                key={index}
                value={item.time}
                onClick={() => handleTimeSelection(item.time)}
              >
                {item.time}
              </Radio.Button>
            ))}
          </Radio.Group>
        </Form.Item>
      </div>
    </div>
  );
};

export default BookingType1;
