import React, { useState } from "react";
import { Form, DatePicker, message, Radio } from "antd";
import moment from "moment";
import api from "../../config/axios";

const BookingType1 = (props) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [courtTimeSlots, setCourtTimeSlots] = useState([]);
  const [error, setError] = useState(null);
  console.log(selectedDate);
  // Validate date
  const disabledDate = (current) => {
    const today = moment().startOf("day");
    const maxDate = moment().add(30, "days").endOf("day");
    return current && (current < today || current > maxDate);
  };

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
      // setAvailableTimes(
      //   slotFilter.filter((item) => item.status == "AVAILABLE")
      // );
      // console.log(slotFilter.filter((item) => item.status == "AVAILABLE"));
      // const data = response.data;
      // const bookingId = data.id;
      // localStorage.setItem("Id", bookingId);

      const today = moment().format("YYYY-MM-DD");
      const now = moment();
      const twoHoursLater = now.clone().add(2, "hours");

      const filteredSlots = slotFilter.filter((item) => {
        if (date === today) {
          const startTime = moment(item.start_time, "HH:mm");
          return (
            item.status === "AVAILABLE" &&
            startTime.isBetween(now, twoHoursLater, null, "[]")
          );
        }
        return item.status === "AVAILABLE";
      });

      setAvailableTimes(filteredSlots);
      console.log(filteredSlots);

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
        courtTSId: values.target.value, // Update with correct value 
        bookingDate: selectedDate,
        durationInMonths: 0, 
        dayOfWeek: null,
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
        <DatePicker
          format="YYYY-MM-DD"
          onChange={handleDateChange}
          disabledDate={disabledDate}
        />
      </Form.Item>

      <Form.Item
        name="time"
        label="Available Times"
        rules={[{ required: true, message: "Please select a time!" }]}
      >
        <Radio.Group>
          {availableTimes.length > 0 ?(
            availableTimes.map((item, index) => (
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
            ))
          ) : (
            <h6>No available time</h6>
          )}
        </Radio.Group>
      </Form.Item>
    </div>
  );
};

export default BookingType1;
