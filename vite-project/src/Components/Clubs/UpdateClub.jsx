import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Alert } from "antd";
import { Link } from 'react-router-dom';

import uploadFile from '../util/useUpload';
import { updateClubAPI } from '../API/UpdateClubAPI';
const UpdateClub = () => {
    const { clubId } = useParams();
    const [clubAddress, setClubAddress] = useState('');
    const [clubName, setClubName] = useState('');
    const [clubStartHour, setClubStartHour] = useState('');
    const [clubStartMinute, setClubStartMinute] = useState('');
    const [clubEndHour, setClubEndHour] = useState('');
    const [clubEndMinute, setClubEndMinute] = useState('');
    const [clubPrice, setClubPrice] = useState('');
    const [uploadImage, setUploadImage] = useState(null);
    const [error, setError] = useState('');

    const handleUpdate = async (e) => {
        e.preventDefault();
        if (clubName.trim() === '' || clubAddress.trim() === '') {
            setError('Please enter all fields');
        } else {
            try {
                const img = await uploadFile(uploadImage);
                console.log(img);

                const data = await updateClubAPI(clubId, clubName, clubAddress, clubPrice, clubStartHour, clubStartMinute, clubEndHour, clubEndMinute, img);

                //console.log('Updated successfully!', data);

                if (data) {
                    alert("Club updated successfully!");
                }

            } catch (err) {
                console.error(err);
                setError(err.message);
            }
        }
    }; return (
        <div className="login-container" style={{ height: '50%', paddingTop: "20px" }}>
            <div className="login-card" >


                <form onSubmit={handleUpdate} className="login-form">
                    <div className="form-group">
                        <label htmlFor="clubName">Club Name</label>
                        <input
                            type="text"
                            required
                            placeholder='Enter club name'
                            id="clubName"
                            value={clubName}
                            onChange={(e) => setClubName(e.target.value)}
                            className="form-input"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="clubAddress">Club Address</label>
                        <input
                            type="text"
                            required
                            placeholder='Enter club address'
                            id="clubAddress"
                            value={clubAddress}
                            onChange={(e) => setClubAddress(e.target.value)}
                            className="form-input"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="Price">Price</label>
                        <input
                            type="number"
                            required

                            placeholder='Price'
                            id="price"
                            value={clubPrice}
                            onChange={(e) => setClubPrice(e.target.value)}
                            className="form-input"
                        />
                    </div>
                    <div className="column flex-column">
                        <div className="form-group row justify-content-center">
                            <label htmlFor="openTime">Open time</label>
                            <input
                                type="number"
                                required
                                min={7}
                                max={23}
                                placeholder='Open hour'
                                id="openTime"
                                value={clubStartHour}
                                onChange={(e) => setClubStartHour(e.target.value)}
                                className="form-input col-md-5 me-5"
                            />
                            <input
                                type="number"
                                required
                                min={0}
                                max={59}
                                placeholder='Open minute'
                                id="openTime"
                                value={clubStartMinute}
                                onChange={(e) => setClubStartMinute(e.target.value)}
                                className="form-input col-md-5"
                            />
                        </div>
                        <div className="form-group row justify-content-center">
                            <label htmlFor="closeTime">Close time</label>
                            <input
                                type="number"
                                required
                                min={7}
                                max={23}
                                placeholder='Close hour'
                                id="closeTime"
                                value={clubEndHour}
                                onChange={(e) => setClubEndHour(e.target.value)}
                                className="form-input col-md-5 me-5"
                            />
                            <input
                                type="number"
                                required
                                min={0}
                                max={59}
                                placeholder='Close minute'
                                id="closeTime"
                                value={clubEndMinute}
                                onChange={(e) => setClubEndMinute(e.target.value)}
                                className="form-input col-md-5"
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="picture_location">Club picture</label>
                        <input
                            type="file"
                            required
                            name="picture_location"
                            id="picture_location"
                            onChange={(e) => setUploadImage(e.target.files[0])}
                            className="form-input"
                        />

                    </div>
                    <button onClick={handleUpdate} type="submit" className="login-button">Update Club</button>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                </form>
                <Link to="/clubManage" className="btn btn-warning">Back to Club List</Link>
            </div>
        </div>
    );
};

export default UpdateClub;
