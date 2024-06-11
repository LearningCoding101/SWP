import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { addCourt } from '../API/AddCourt';
import Alert from '@mui/material/Alert';
import 'bootstrap/dist/css/bootstrap.min.css';
const AddClub = () => {
    const [courtAddress, setCourtAddress] = useState('');
    const [courtName, setCourtName] = useState('');
    const [courtStartHour, setCourtStartHour] = useState('')
    const [courtStartMinute, setCourtStartMinute] = useState('')
    const [courtEndHour, setCourtEndHour] = useState('')
    const [courtEndMinute, setCourtEndMinute] = useState('')
    const [courtLocation, setCourtLocation] = useState('')
    const [courtEmail, setCourtEmail] = useState('')
    const [error, setError] = useState('');
    const handleAdd = async (e) => {
        e.preventDefault();
        if (courtName.trim() === '' || courtAddress.trim() === '' || courtStartHour.trim() === '' || courtStartMinute.trim() === '' || courtEndHour.trim() === '' || courtEndMinute.trim() === '' || courtLocation.trim() === '' || courtEmail.trim() === '') {
            setError('Please enter all fields');
        }
        else {
            try {
                const data = await addCourt(courtName, courtAddress, courtStartHour, courtStartMinute, courtEndHour, courtEndMinute, courtLocation, courtEmail);
                console.log('Added successful!', data);

                if (data) {
                    <Alert severity="success">Added club successfully!</Alert>
                }

                // Handle successful 
            } catch (err) {
                console.error(err);
                setError(err.message);
            }
        }
    }
    return (

        <div className="login-container">
            <div className="login-card">
                {/* <h2 className="login-title">Add</h2> */}
                {error && <div className="error">{error}</div>}
                <form onSubmit={handleAdd} className="login-form">
                    <div className="form-group">
                        <label htmlFor="name">Club name</label>
                        <input
                            type="text"
                            required
                            placeholder='Enter club name'
                            id="name"
                            value={courtName}
                            onChange={(e) => setCourtName(e.target.value)}
                            className="form-input"
                        />
                    </div>
                    <div className="form-group ">
                        <label htmlFor="address">Club address</label>
                        <input
                            type="text"
                            required
                            placeholder='Enter club address'
                            id="address"
                            value={courtAddress}
                            onChange={(e) => setCourtAddress(e.target.value)}
                            className="form-input"
                        />

                    </div>
                    <div className='column flex-column'>
                        <div className="form-group row justify-content-center ">
                            <label htmlFor="openTime">Open time</label>
                            <input
                                type="number"
                                required
                                min={7}
                                max={23}
                                placeholder='Open hour'
                                id="openTime"
                                value={courtStartHour}
                                onChange={(e) => setCourtStartHour(e.target.value)}
                                className="form-input col-md-5 me-5"
                            />
                            <input
                                type="number"
                                required
                                min={0}
                                max={59}
                                placeholder='Open minute'
                                id="openTime"
                                value={courtStartMinute}
                                onChange={(e) => setCourtStartMinute(e.target.value)}
                                className="form-input col-md-5 "
                            />

                        </div>
                        <div className="form-group row justify-content-center ">
                            <label htmlFor="closeTime">Close time</label>
                            <input
                                type="number"
                                required
                                min={7}
                                max={23}
                                placeholder='Close hour'
                                id="closeTime"
                                value={courtEndHour}
                                onChange={(e) => setCourtEndHour(e.target.value)}
                                className="form-input col-md-5 me-5"
                                
                            />
                            <input
                                type="number"
                                required
                                min={0}
                                max={59}
                                placeholder='Close minute'
                                id="closeTime"
                                value={courtEndMinute}
                                onChange={(e) => setCourtEndMinute(e.target.value)}
                                className="form-input col-md-5"
                            />

                        </div>
                    </div>
                    <div className="form-group ">
                        <label htmlFor="location">Club picture url</label>
                        <input
                            type="text"
                            required
                            placeholder='Enter url of your picture'
                            id="location"
                            value={courtLocation}
                            onChange={(e) => setCourtLocation(e.target.value)}
                            className="form-input"
                        />

                    </div>
                    <div className="form-group ">
                        <label htmlFor="address">Club owner email</label>
                        <input
                            type="email"
                            required
                            placeholder='Enter email'
                            id="address"
                            value={courtEmail}
                            onChange={(e) => setCourtEmail(e.target.value)}
                            className="form-input"
                        />

                    </div>


                    <button onClick={handleAdd} type="submit" className="login-button">
                        Add club
                    </button>

                </form>

            </div>
        </div>
    )
}

export default AddClub