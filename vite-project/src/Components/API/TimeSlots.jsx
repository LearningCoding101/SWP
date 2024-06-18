import React, { useState } from 'react'
 import { useEffect } from 'react';
const TimeSlot = () => {
    const [timeslots, setTimeslots] = useState([])
    useEffect(() => {
            fetch('')//insert court api
            .then((res) =>{
                return res.json;
            })
            .then((data) =>{
                console.log(data); //just to test if the api load data
                setTimeslots(data);
            })
        }, []);
  return (
        <div>
        {timeslots.map((timeslot) =>{
            <div key={timeslot.timeslot_id}>
            <p>{timeslot.start_time}</p>
            <p>{timeslot.end_time}</p>
            </div>
        })}
        </div>
  )
}

export default TimeSlot