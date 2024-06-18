import React, { useState } from "react";
import { Form, DatePicker, Button, List, message, Radio } from "antd";
import moment from "moment";

const BookingType3 = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [selectedSchedule, setSelectedSchedule] = useState([]);

  const bookingType3 = [
    { date: "2024-06-16", time: "7:00" },
    { date: "2024-06-16", time: "8:00" },
    { date: "2024-06-16", time: "9:00" },
    { date: "2024-06-15", time: "7:30" },
    { date: "2024-06-15", time: "8:30" },
    { date: "2024-06-15", time: "9:30" },
  ];

  const handleDateChange = (date) => {
    setSelectedDate(date);
    const timesForDate = bookingType3.filter(
      (item) => item.date === date.format("YYYY-MM-DD")
    );
    setAvailableTimes(timesForDate);
  };

  const handleAddToSchedule = (time) => {
    const newEntry = { date: selectedDate.format("YYYY-MM-DD"), time };

    const isDuplicate = selectedSchedule.some(
      (entry) => entry.date === newEntry.date && entry.time === newEntry.time
    );

    if (isDuplicate) {
      message.warning("This schedule is already added");
    } else {
      setSelectedSchedule([...selectedSchedule, newEntry]);
      message.success(`Added ${newEntry.date} at ${newEntry.time} to schedule`);
    }
  };

  const handleDeleteFromSchedule = (index) => {
    const newSchedule = [...selectedSchedule];
    newSchedule.splice(index, 1);
    setSelectedSchedule(newSchedule);
    message.success("Schedule entry deleted");
  };

  return (
    <Form name="bookingType3Form" layout="vertical">
      <Form.Item label="Select Booking Date" name="bookingDate">
        <DatePicker onChange={handleDateChange} />
      </Form.Item>

      {selectedDate && (
        <Form.Item label="Available Times">
          <Radio.Group>
            {availableTimes.map((item, index) => (
              <Radio.Button
                key={index}
                onClick={() => handleAddToSchedule(item.time)}
              >
                {item.time}
              </Radio.Button>
            ))}
          </Radio.Group>
          {/* {availableTimes.map((item, index) => (
            <Button key={index} onClick={() => handleAddToSchedule(item.time)}>
              {item.time}
            </Button>
          ))} */}
        </Form.Item>
      )}

      <Form.Item label="Selected Schedule">
        <List
          bordered
          dataSource={selectedSchedule}
          renderItem={(item, index) => (
            <List.Item>
              <div>
                {item.date} at {item.time}
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
    </Form>
  );
};

export default BookingType3;
