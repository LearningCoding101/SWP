import React, { useState, useRef, useEffect } from 'react';
import QrScanner from 'react-qr-scanner';
import axios from 'axios';

const QRScanner = () => {
    const [scanResult, setScanResult] = useState('');
    const [bookingDetails, setBookingDetails] = useState([]);
    const [transactionData, setTransactionData] = useState(null);
    const [scannerKey, setScannerKey] = useState(Date.now());
    const [searchQuery, setSearchQuery] = useState('');
    const lastScannedCodeRef = useRef(null);
    const token = "eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJvd25lciIsImlhdCI6MTcxODY3MzI4MSwiZXhwIjoxNzE4NzU5NjgxfQ.6DjLbORvLEHpdSEPgP_vKcLXLeca96_d5fmjXFdnVfj-Uk5y9ntVTHDs3vPQG_QZ";

    const handleError = (error) => {
        console.error('QR Scanner Error:', error);
    };

    const handleScan = (result) => {
        if (result && result.text !== lastScannedCodeRef.current) {
            console.log('QR Code Scanned:', result.text);
            try {
                const data = JSON.parse(result.text);
                console.log('Parsed QR Code Data:', data);
                const bookingId = parseInt(data.bookingId, 10);

                if (!isNaN(bookingId)) {
                    lastScannedCodeRef.current = result.text;
                    setScanResult(bookingId);
                    fetchBookingDetails(bookingId);
                    fetchTransactionData(bookingId);
                    setTimeout(() => {
                        setScanResult('');
                        setScannerKey(Date.now()); // Force re-render of the scanner component
                    }, 2000); // Adjust the timeout duration as needed
                } else {
                    console.error('Invalid bookingId format');
                }
            } catch (error) {
                console.error('Error parsing QR code data:', error);
            }
        }
    };

    const fetchBookingDetails = async (bookingId) => {
        try {
            console.log(`Fetching booking details for ID: ${bookingId}`);
            const response = await axios.get(`http://badcourts.click:8080/api/bookingDetail/${bookingId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('Booking Details Response:', response.data);
            setBookingDetails(response.data);
        } catch (error) {
            console.error("Error fetching booking details:", error);
        }
    };

    const fetchTransactionData = async (bookingId) => {
        try {
            const response = await axios.get(`http://badcourts.click:8080/api/transactions/${bookingId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: '*/*'
                }
            });
            setTransactionData(response.data);
        } catch (error) {
            console.error('Error fetching transaction data:', error);
        }
    };
    const updateTransactionStatus = async (id) => {
        try {
            const response = await axios.post(
                `http://badcourts.click:8080/api/transactions/${id}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: '*/*'
                    }
                }
            );
            console.log('Update Transaction Status Response:', response.data);
            // Update the status of the transaction to "FULLY_PAID"
            setTransactionData((prevData) => ({
                ...prevData,
                status: 'FULLY_PAID'
            }));
        } catch (error) {
            console.error('Error updating transaction status:', error);
        }
    };



    const handleCheckIn = async (bookingDetailsId) => {
        try {
            const response = await axios.post(
                `http://badcourts.click:8080/api/bookingDetail/checkin/${bookingDetailsId}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            console.log('Check-In Response:', response.data);
            // Update the status of the booking to "CHECKED_IN"
            setBookingDetails((prevDetails) =>
                prevDetails.map((detail) =>
                    detail.bookingDetailsId === bookingDetailsId
                        ? { ...detail, status: 'CHECKED_IN' }
                        : detail
                )
            );
        } catch (error) {
            console.error('Error during check-in:', error);
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        if (isNaN(date)) {
            return 'Invalid Date';
        }
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const filteredBookingDetails = bookingDetails.filter(detail => {
        return formatDate(detail.bookingDate).includes(searchQuery);
    });

    return (
        <div className="container my-4">
            <div className="row">
                <div className="col-md-8 mb-4">
                    <div className="card">
                        <div className="card-header">
                            <h2>Search Booking Details by Date</h2>
                        </div>
                        <div className="card-body">
                            <input
                                type="date"
                                className="form-control mb-3"
                                value={searchQuery}
                                onChange={handleSearchChange}
                                placeholder="YYYY-MM-DD"
                            />
                            {filteredBookingDetails.length > 0 && (
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th>Booking Date</th>
                                            <th>Court Name</th>
                                            <th>Full Name</th>
                                            <th>Phone Number</th>
                                            <th>Start Time</th>
                                            <th>End Time</th>
                                            <th>Status</th>
                                            <th>Actions</th>
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
                                                    {detail.status !== 'CHECKED_IN' && (
                                                        <button className="btn btn-primary btn-sm" onClick={() => handleCheckIn(detail.bookingDetailsId)}>
                                                            Check-In
                                                        </button>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card mb-4">
                        <div className="card-header">
                            <h2>QR Code Scanner</h2>
                        </div>
                        <div className="card-body">
                            <QrScanner
                                key={scannerKey}
                                delay={300}
                                onError={handleError}
                                onScan={handleScan}
                                style={{ width: '100%' }}
                            />
                            {scanResult && (
                                <div className="alert alert-info mt-3">
                                    Booking ID: {scanResult}
                                </div>
                            )}
                        </div>
                    </div>
                    {transactionData && (
                        <div className="card">
                            <div className="card-header">
                                <h2>Transaction Details</h2>
                            </div>
                            <div className="card-body">
                                <form>
                                    <div className="mb-3">
                                        <label className="form-label">Transaction ID:</label>
                                        <input type="text" className="form-control" value={transactionData.id} readOnly />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Amount:</label>
                                        <input type="text" className="form-control" value={transactionData.totalAmount} readOnly />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Deposit:</label>
                                        <input type="text" className="form-control" value={transactionData.depositAmount} readOnly />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Date:</label>
                                        <input type="text" className="form-control" value={formatDate(transactionData.paymentDate)} readOnly />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Status:</label>
                                        <input type="text" className="form-control" value={transactionData.status} readOnly />
                                    </div>
                                    {transactionData.status === 'DEPOSITED' && (
                                        <button type="button" className="btn btn-success" onClick={() => updateTransactionStatus(transactionData.transactionId)}>
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
