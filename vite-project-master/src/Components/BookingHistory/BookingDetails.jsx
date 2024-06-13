import React from "react";
import "./BookingDetails.css";
import ReactDOM from "react-dom";

const BookingDetails = (props) => {
  return ReactDOM.createPortal(
    <>
      <div
        className={`alert ${props.showDetail ? "" : "hidden"}`}
        style={{ backgroundColor: "white" }}
      >
        <h2>This is an Alert!</h2>
        <p>
          This is a very simple example of how a custom alert window can be
          created and displayed dynamically using JavaScript.
        </p>
        <button className="modal-btn" onClick={props.hideDetail}>
          Cancel
        </button>
      </div>
      <div className={`overlay ${props.showDetail ? "" : "hidden"}`}></div>
    </>,
    document.getElementById("root-portal")
  );
};

export default BookingDetails;
