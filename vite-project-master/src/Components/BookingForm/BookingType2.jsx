import React from "react";

const BookingType2 = () => {
  return (
    <div className="row">
      <div className="col-md-6">
        <div className="form-group">
          <input className="form-control" type="date" required />
          <span className="form-label">Start Date</span>
        </div>
      </div>
      <div className="col-md-6">
        <div className="form-group">
          <input className="form-control" type="date" required />
          <span className="form-label">End Date</span>
        </div>
      </div>
    </div>
  );
};

export default BookingType2;
