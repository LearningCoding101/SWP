import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { addCourt } from '../API/AddCourt';
import Alert from 'react-bootstrap/Alert';
const AddCourt = () => {
    const [courtAddress, setCourtAddress] = useState('');
    const [courtName, setCourtName] = useState('');
    const [courtOpenTime, setCourtOpenTime] = useState('')
    const [courtCloseTime, setCourtCloseTime] = useState('')
    const [courtLocation, setCourtLocation] = useState('')
    const [courtEmail, setCourtEmail] = useState('')
    const [error, setError] = useState('');
    const [show, setShow] = useState(false);
    const handleAdd = async (e) => {
        e.preventDefault();
        if (courtName.trim() === '' || courtAddress.trim() === '' || courtOpenTime.trim() === '' || courtCloseTime.trim() === '' || courtLocation.trim() === '' || courtEmail.trim() === '') {
            setError('Please enter all fields');
        }
        else {
            try {
                const data = await addCourt(courtName, courtAddress, courtOpenTime, courtCloseTime, courtLocation, courtEmail);
                console.log('Added successful!', data);
                setShow(true);
                if (show == true) {
                    <Alert variant="danger" onClose={() => setShow(false)} dismissible>
                        <Alert.Heading>Added new club!</Alert.Heading>
                    </Alert>
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
                            placeholder='Enter club address'
                            id="address"
                            value={courtAddress}
                            onChange={(e) => setCourtAddress(e.target.value)}
                            className="form-input"
                        />

                    </div>
                    <div className='column flex-column'>
                        <div className="form-group ">
                            <label htmlFor="openTime">Open time</label>
                            <input
                                type="text"
                                placeholder='Enter club price'
                                id="openTime"
                                value={courtOpenTime}
                                onChange={(e) => setCourtOpenTime(e.target.value)}
                                className="form-input"
                            />

                        </div>
                        <div className="form-group ">
                            <label htmlFor="closeTime">Close time</label>
                            <input
                                type="text"
                                placeholder='Enter club address'
                                id="closeTime"
                                value={courtCloseTime}
                                onChange={(e) => setCourtCloseTime(e.target.value)}
                                className="form-input"
                            />

                        </div>
                    </div>
                    <div className="form-group ">
                        <label htmlFor="location">Club address</label>
                        <input
                            type="text"
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
                            type="text"
                            placeholder='Enter email'
                            id="address"
                            value={courtEmail}
                            onChange={(e) => setCourtEmail(e.target.value)}
                            className="form-input"
                        />

                    </div>


                    <button onClick={handleAdd} type="submit" className="login-button">
                        Add court
                    </button>

                </form>

            </div>
        </div>
    )
}

export default AddCourt