import React, { useState, useRef } from "react";
import QrScanner from "react-qr-scanner";
import "bootstrap/dist/css/bootstrap.min.css";
import "./QRScanner.css";
import api from "../../config/axios";

const QRScanner = () => {
  const [scanResult, setScanResult] = useState("");
  const [bookingDetails, setBookingDetails] = useState([]);
  const [transactionData, setTransactionData] = useState(null);
  const [scannerKey, setScannerKey] = useState(Date.now());
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const lastScannedCodeRef = useRef(null);
  const token =
    "eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJuZ3V5ZW5uaG0ubC4xOTIyQGdtYWlsLmNvbSIsImlhdCI6MTcxODgxMzM5NywiZXhwIjoxNzE4ODk5Nzk3fQ.T_S2lUWTTxwObnHbosL83_Ex44LNNabPfFNEZ3CeqpPWkwzNYdSCwmAeoteqChnu"; // Store the token in environment variables

  const handleError = (error) => {
    console.error("QR Scanner Error:", error);
    setError("Error scanning QR code. Please try again.");
  };

  const handleScan = (result) => {
    if (result && result.text !== lastScannedCodeRef.current) {
      console.log("QR Code Scanned:", result.text);
      try {
        const data = JSON.parse(result.text);
        console.log("Parsed QR Code Data:", data);
        const bookingId = parseInt(data.bookingId, 10);

        if (!isNaN(bookingId)) {
          lastScannedCodeRef.current = result.text;
          setScanResult(bookingId);
          fetchBookingDetails(bookingId);
          fetchTransactionData(bookingId);
        } else {
          console.error("Invalid bookingId format");
          setError("Invalid bookingId format.");
        }
      } catch (error) {
        console.error("Error parsing QR code data:", error);
        setError("Error parsing QR code data.");
      }
    }
  };

  const fetchBookingDetails = async (bookingId) => {
    setLoading(true);
    setError(null);
    try {
      console.log(`Fetching booking details for ID: ${bookingId}`);
      const response = await api.get(
        `http://badcourts.click:8080/api/bookingDetail/${bookingId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Booking Details Response:", response.data);
      setBookingDetails(response.data);
    } catch (error) {
      console.error("Error fetching booking details:", error);
      setError("Error fetching booking details.");
    } finally {
      setLoading(false);
    }
  };

  const fetchTransactionData = async (bookingId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get(
        `http://badcourts.click:8080/api/transactions/${bookingId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "*/*",
          },
        }
      );
      setTransactionData(response.data);
    } catch (error) {
      console.error("Error fetching transaction data:", error);
      setError("Error fetching transaction data.");
    } finally {
      setLoading(false);
    }
  };

  const updateTransactionStatus = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post(
        `http://badcourts.click:8080/api/transactions/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "*/*",
          },
        }
      );
      console.log("Update Transaction Status Response:", response.data);
      setTransactionData((prevData) => ({
        ...prevData,
        status: "FULLY_PAID",
      }));
    } catch (error) {
      console.error("Error updating transaction status:", error);
      setError("Error updating transaction status.");
    } finally {
      setLoading(false);
    }
  };

  const handleCheckIn = async (bookingDetailsId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post(
        `http://badcourts.click:8080/api/bookingDetail/checkin/${bookingDetailsId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Check-In Response:", response.data);
      setBookingDetails((prevDetails) =>
        prevDetails.map((detail) =>
          detail.bookingDetailsId === bookingDetailsId
            ? { ...detail, status: "CHECKED_IN" }
            : detail
        )
      );
    } catch (error) {
      console.error("Error during check-in:", error);
      setError("Error during check-in.");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date)) {
      return "Invalid Date";
    }
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredBookingDetails = bookingDetails.filter((detail) => {
    return formatDate(detail.bookingDate).includes(searchQuery);
  });

  const refreshScanner = () => {
    setScannerKey(Date.now());
    setScanResult("");
    setBookingDetails([]);
    setTransactionData(null);
    setError(null);
    lastScannedCodeRef.current = null;
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-8">
          <div className="card mb-4">
            <div className="card-body">
              <h2 className="card-title">Search Booking Details by Date:</h2>
              <input
                type="date"
                className="form-control"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="YYYY-MM-DD"
              />
            </div>
          </div>
          {filteredBookingDetails.length > 0 && (
            <div className="card">
              <div className="card-body">
                <h2 className="card-title">Booking Details:</h2>
                <div className="table-responsive">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>Booking Date</th>
                        <th>Court Name</th>
                        <th>Full Name</th>
                        <th>Phone Number</th>
                        <th>Start Time</th>
                        <th>End Time</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredBookingDetails.map((detail, index) => (
                        <tr key={index}>
                          <td>{formatDate(detail.bookingDate)}</td>
                          <td>{detail.courtName}</td>
                          <td>{detail.fullnameoforder}</td>
                          <td>{detail.phonenumber}</td>
                          <td>{detail.start_time}</td>
                          <td>{detail.end_time}</td>
                          <td>{detail.status}</td>
                          <td>
                            {detail.status !== "CHECKED_IN" && (
                              <button
                                className="btn btn-custom-primary"
                                onClick={() =>
                                  handleCheckIn(detail.bookingDetailsId)
                                }
                              >
                                Check-In
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="col-md-4">
          <div className="card mb-4">
            <div className="card-body">
              <h2 className="card-title">QR Scanner</h2>
              <QrScanner
                key={scannerKey}
                delay={300}
                onError={handleError}
                onScan={handleScan}
                style={{ width: "100%", maxWidth: "100%" }}
              />
              <button
                className="btn btn-custom-secondary"
                onClick={refreshScanner}
              >
                Refresh Scanner
              </button>
              {scanResult && (
                <div className="alert alert-success mt-3">
                  <h2>Booking ID: {scanResult}</h2>
                </div>
              )}
              {loading && (
                <div className="loading-overlay">
                  <div className="spinner-border text-primary" role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
                </div>
              )}
              {error && <div className="alert alert-danger mt-3">{error}</div>}
            </div>
          </div>
          {transactionData && (
            <div className="card">
              <div className="card-body">
                <h2 className="card-title">Transaction Details:</h2>
                <form>
                  <div className="form-group">
                    <label>Transaction ID:</label>
                    <input
                      type="text"
                      className="form-control"
                      value={transactionData.id}
                      readOnly
                    />
                  </div>
                  <div className="form-group">
                    <label>Amount:</label>
                    <input
                      type="text"
                      className="form-control"
                      value={transactionData.totalAmount}
                      readOnly
                    />
                  </div>
                  <div className="form-group">
                    <label>Deposit:</label>
                    <input
                      type="text"
                      className="form-control"
                      value={transactionData.depositAmount}
                      readOnly
                    />
                  </div>
                  <div className="form-group">
                    <label>Date:</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formatDate(transactionData.paymentDate)}
                      readOnly
                    />
                  </div>
                  <div className="form-group">
                    <label>Status:</label>
                    <input
                      type="text"
                      className="form-control"
                      value={transactionData.status}
                      readOnly
                    />
                  </div>
                  {transactionData.status === "DEPOSITED" && (
                    <button
                      type="button"
                      className="btn btn-custom-success"
                      onClick={() =>
                        updateTransactionStatus(transactionData.transactionId)
                      }
                    >
                      Update Status
                    </button>
                  )}
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QRScanner;
