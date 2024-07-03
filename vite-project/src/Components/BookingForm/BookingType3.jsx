// import React, { useState } from "react";
// import { Form, DatePicker, Button, List, message, Radio } from "antd";
// import moment from "moment";
// import api from "../../config/axios";

// const BookingType3 = (props) => {
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [availableTimes, setAvailableTimes] = useState([]);
//   const [selectedSchedule, setSelectedSchedule] = useState([]);
//   const [courtTimeSlots, setCourtTimeSlots] = useState([]);
//   const [typeDetailList, setTypeDetailList] = useState([]);
//   const [error, setError] = useState(null);

//   const handleDateChange = async (date) => {
//     setSelectedDate(date.format("YYYY-MM-DD"));
//     await fetchCourtTimeSlots(date.format("YYYY-MM-DD"));
//   };

//   //GET Court Time Slot
//   const fetchCourtTimeSlots = async (date) => {
//     try {
//       const response = await api.get(`/courtTimeSlot/${props.courtId}/${date}`);
//       const slotFilter = response.data;
//       setCourtTimeSlots(response.data);
//       console.log(response.data);
//       setAvailableTimes(
//         slotFilter.filter((item) => item.status == "AVAILABLE")
//       );
//       console.log(slotFilter.filter((item) => item.status == "AVAILABLE"));
//       // const data = response.data;
//       // const bookingId = data.id;
//       // localStorage.setItem("Id", bookingId);
//     } catch (error) {
//       setError(error.message);
//     }
//   };

//   const handleAddToSchedule = (id, startTime, endTime) => {
//     // const newEntry = { date: selectedDate.format("YYYY-MM-DD"), time };
//     const newEntry = { id, date: selectedDate, startTime, endTime };

//     const isDuplicate = selectedSchedule.some(
//       (entry) =>
//         entry.id === newEntry.id &&
//         entry.date === newEntry.date &&
//         entry.startTime === newEntry.startTime &&
//         entry.endTime === newEntry.endTime
//     );

//     if (isDuplicate) {
//       message.warning("This schedule is already added");
//     } else {
//       setSelectedSchedule([...selectedSchedule, newEntry]);
//       message.success(
//         `Added ${newEntry.date} at ${newEntry.startTime} - ${newEntry.endTime} to schedule`
//       );
//     }
//   };

//   const handleDeleteFromSchedule = (index) => {
//     const newSchedule = [...selectedSchedule];
//     newSchedule.splice(index, 1);
//     setSelectedSchedule(newSchedule);

//     const selectedBooking = [...typeDetailList];
//     selectedBooking.splice(index, 1);
//     setTypeDetailList(selectedBooking);

//     message.success("Schedule entry deleted");
//   };

//   // Prepare bookingDetailRequestCombos
//   const onChange = (values) => {
//     const bookingTypeDetail = {
//       courtTSId: values.target.value, // Update with correct value if available
//       bookingDate: selectedDate,
//       durationInMonths: 0, // Update with correct value if available
//       dayOfWeek: null, // Update with correct value if available
//     };

//     setTypeDetailList([...typeDetailList, bookingTypeDetail]);
//     console.log(typeDetailList);

//     props.bookingDetail([...typeDetailList, bookingTypeDetail]);
//   };

//   return (
//     <div name="bookingType3Form" layout="vertical">
//       <Form.Item label="Select Booking Date" name="bookingDate">
//         <DatePicker onChange={handleDateChange} />
//       </Form.Item>

//       {/* {selectedDate && ( */}
//       <Form.Item
//         name="time"
//         label="Available Times"
//         // rules={[{ required: true, message: "Please select a time!" }]}
//       >
//         <Radio.Group>
//           {availableTimes.map((item, index) => (
//             <Radio.Button
//               key={index}
//               value={item.courtTimeSlotId}
//               onClick={() =>
//                 handleAddToSchedule(
//                   item.courtTimeSlotId,
//                   item.start_time,
//                   item.end_time
//                 )
//               }
//               onChange={onChange}
//             >
//               {item.start_time} - {item.end_time}
//             </Radio.Button>
//           ))}
//         </Radio.Group>
//         {/* {availableTimes.map((item, index) => (
//             <Button key={index} onClick={() => handleAddToSchedule(item.time)}>
//               {item.time}
//             </Button>
//           ))} */}
//       </Form.Item>
//       {/* )} */}

//       <Form.Item label="Selected Schedule">
//         <List
//           bordered
//           dataSource={selectedSchedule}
//           renderItem={(item, index) => (
//             <List.Item>
//               <div>
//                 {item.date} at {item.startTime} - {item.endTime}
//                 <Button
//                   type="link"
//                   onClick={() => handleDeleteFromSchedule(index)}
//                 >
//                   Delete
//                 </Button>
//               </div>
//             </List.Item>
//           )}
//         />
//       </Form.Item>
//     </div>
//   );
// };

// export default BookingType3;



import React, { useState } from "react";
import { Form, DatePicker, Button, List, message, Radio, Select } from "antd";
import moment from "moment";
import api from "../../config/axios";

const BookingType3 = (props) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [selectedSchedule, setSelectedSchedule] = useState([]);
  const [courtTimeSlots, setCourtTimeSlots] = useState([]);
  const [typeDetailList, setTypeDetailList] = useState([]);
  const [error, setError] = useState(null);
  const [numberOfDays, setNumberOfDays] = useState();

  let isDisabled = typeDetailList.length != numberOfDays ? false : true;

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

  // Prepare bookingDetailRequestCombos
  // const onChange = (values) => {
  //   const bookingTypeDetail = {
  //     courtTSId: values.target.value, // Update with correct value if available
  //     bookingDate: selectedDate,
  //     durationInMonths: 0, // Update with correct value if available
  //     dayOfWeek: null, // Update with correct value if available
  //   };

  //   setTypeDetailList([...typeDetailList, bookingTypeDetail]);
  //   console.log(typeDetailList);

  //   props.bookingDetail([...typeDetailList, bookingTypeDetail]);
  // };

  return (
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
        <div className="col-md-6">
          <Form.Item
            name="numberOfDays"
            label="Number of slots"
            rules={[
              {
                required: true,
                message: "Please select the number of days you want to assign!",
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
        </div>
      </div>

      {numberOfDays && (
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
      )}

      <Form.Item label="Selected Schedule">
        <List
          bordered
          dataSource={selectedSchedule}
          renderItem={(item, index) => (
            <List.Item>
              <div>
                {index + 1}. {item.date} at {item.startTime} - {item.endTime}
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

export default BookingType3;
