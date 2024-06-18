import React, { useState } from "react";
import {
  Form,
  Select,
  Radio,
  InputNumber,
  Button,
  DatePicker,
  List,
} from "antd";
import axios from "axios";
import moment from "moment";
import { Option } from "antd/es/mentions";

const timeSlots = [{ time: "07:00" }, { time: "08:00" }, { time: "09:00" }];

const BookingType2 = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [selectedSchedule, setSelectedSchedule] = useState([]);

  const handleDeleteFromSchedule = (index) => {
    const newSchedule = [...selectedSchedule];
    newSchedule.splice(index, 1);
    setSelectedSchedule(newSchedule);
    message.success("Schedule entry deleted");
  };
  return (
    <div className="row">
      <div className="col-md-6">
        <div className="col-md-6">
          <Form.Item
            name="bookingDate"
            label="Select Start Date"
            rules={[
              { required: true, message: "Please select the booking date!" },
            ]}
          >
            <DatePicker format="YYYY-MM-DD" />
          </Form.Item>
        </div>
      </div>
      <div className="col-md-6">
        <div>
          <Form.Item
            name="month"
            label="Month"
            rules={[{ required: true, message: "Please input the month!" }]}
          >
            <InputNumber min={1} style={{ width: "100%" }} />
          </Form.Item>
        </div>
      </div>

      <div className="row"></div>
      <div className="col-md-6">
        <Form.Item
          name="day_in_week_id"
          label="Day"
          rules={[
            { required: true, message: "Please select the booking type!" },
          ]}
        >
          <Select>
            <Option value={0}>Sunday</Option>
            <Option value={1}>Monday</Option>
            <Option value={2}>Tuesday</Option>
            <Option value={3}>Wednesday</Option>
            <Option value={4}>Thursday</Option>
            <Option value={5}>Friday</Option>
            <Option value={6}>Saturday</Option>
          </Select>
        </Form.Item>
      </div>
      <div className="col-md-6">
        <Form.Item
          name="time"
          label="Select Time"
          rules={[{ required: true, message: "Please select a time!" }]}
        >
          <Radio.Group>
            {timeSlots.map((slot) => (
              <Radio.Button key={slot.time} value={slot.time}>
                {slot.time}
              </Radio.Button>
            ))}
          </Radio.Group>
        </Form.Item>
      </div>
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
    </div>
  );
};

export default BookingType2;
