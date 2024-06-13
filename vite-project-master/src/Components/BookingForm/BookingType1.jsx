import React from "react";

const BookingType1 = () => {
  return (
    <div className="row">
      <div className="col-md-6">
        <div className="form-group">
          <input className="form-control" type="date" required />
          <span className="form-label">Pickup Date</span>
        </div>
      </div>
    </div>
  );
};

export default BookingType1;
