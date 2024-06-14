import React, { useState } from "react";
import "./BookingForm.css";
import BookingType1 from "./BookingType1";
import BookingType2 from "./BookingType2";
import BookingType3 from "./BookingType3";
import { Link } from 'react-router-dom';

const BookingForm = () => {
  const [filterValue, updateFilter] = useState();

  const onFilterValueChanged = (event) => {
    // console.log(event.target.value);
    updateFilter(event.target.value);
  };

  return (
    <div id="booking" className="section">
      <div className="section-center">
        <div className="container">
          <div className="row">
            <div className="booking-form">
              <form>
                <div className="form-group">
                  <select className="form-control" required>
                    <option value="" selected hidden>
                      Select Court
                    </option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                  </select>
                  <span className="select-arrow"></span>
                  <span className="form-label">Court</span>
                </div>
                <div className="form-group">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Enter your Name"
                  />
                  <span className="form-label">Name</span>
                </div>
                <div className="form-group">
                  <input
                    className="form-control"
                    type="tel"
                    placeholder="Enter your Phone number"
                  />
                  <span className="form-label">Phone</span>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <select
                        className="form-control"
                        required
                        onChange={onFilterValueChanged}
                      >
                        <option value="" selected hidden>
                          Select Booking Type
                        </option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                      </select>
                      <span className="select-arrow"></span>
                      <span className="form-label">Booking Type</span>
                    </div>
                  </div>
                </div>
                {/* <div className="form-group">
                  <input
                    className="form-control"
                    type="tel"
                    placeholder="Enter an origin location"
                  />
                  <span className="form-label">Pickup Location</span>
                </div>
                <div className="form-group">
                  <input
                    className="form-control"
                    type="tel"
                    placeholder="Enter a destination location"
                  />
                  <span className="form-label">Destination Location</span>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <input className="form-control" type="date" required />
                      <span className="form-label">Pickup Date</span>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <input className="form-control" type="time" required />
                      <span className="form-label">Pickup Time</span>
                    </div>
                  </div>
                </div> */}

                {filterValue === "1" && (
                  <>
                    <BookingType1></BookingType1>
                  </>
                )}
                {filterValue === "2" && (
                  <>
                    <BookingType2></BookingType2>
                  </>
                )}
                {filterValue === "3" && (
                  <>
                    <BookingType3></BookingType3>
                  </>
                )}
                <div className="row flex-row">
                  <div className="form-btn col-md-7">
                    <button className="submit-btn">Book Now</button>
                  </div>
                  <div className="form-btn col-md">
                    <Link to={"/clubs"}><button className="submit-btn">Cancel</button></Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;
