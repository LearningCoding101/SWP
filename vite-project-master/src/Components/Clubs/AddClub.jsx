import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

import Alert from '@mui/material/Alert';
import 'bootstrap/dist/css/bootstrap.min.css';
import uploadFile from '../util/useUpload';
import { addClubAPI } from '../API/AddClubAPI';


// import { storage } from '../../firebase';
// import { ref } from 'firebase/storage';
const AddClub = () => {
    
    const [courtAddress, setCourtAddress] = useState('');
    const [courtName, setCourtName] = useState('');
    const [courtStartHour, setCourtStartHour] = useState('')
    const [courtStartMinute, setCourtStartMinute] = useState('')
    const [courtEndHour, setCourtEndHour] = useState('')
    const [courtEndMinute, setCourtEndMinute] = useState('')
    // const [courtLocation] = useState('')
    // const [courtEmail, setCourtEmail] = useState('')
    const [uploadImage, setUploadImage] = useState(null)
    const [error, setError] = useState('');
    // const handleUpload = () => {
    //     if(uploadImage == null) return;
    //     const imageRef = ref(storage, `images/$`)
    // }
    const handleAdd = async (e) => {
        e.preventDefault();
        const img = await uploadFile(uploadImage) 
        console.log(img);
        if (courtName.trim() === '' || courtAddress.trim() === '' ) {
            setError('Please enter all fields');
        }
        else {
            try {
                const data = await addClubAPI(courtName, courtAddress, courtStartHour, courtStartMinute, courtEndHour, courtEndMinute, img.toString());
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
                                onChange={(e) => setCourtStartHour(e.target.valueAsNumber)}
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
                                onChange={(e) => setCourtStartMinute(e.target.valueAsNumber)}
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
                                onChange={(e) => setCourtEndHour(e.target.valueAsNumber)}
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
                                onChange={(e) => setCourtEndMinute(e.target.valueAsNumber)}
                                className="form-input col-md-5"
                            />

                        </div>
                    </div>
                    <div className="form-group ">
                        <label htmlFor="picture_location">Club picture url</label>
                        <input
                            type="file"
                            required
                            name="picture_location"
                            // placeholder='Enter url of your picture'
                            id="picture_location"
                            // value={courtLocation}
                            onChange={(e) => setUploadImage(e.target.files[0])}
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