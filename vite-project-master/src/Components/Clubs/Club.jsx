import React, { useState, useEffect } from 'react'
import { BsSearch } from 'react-icons/bs';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import NavBar from '../layout/NavBar';
import Footer from '../layout/Footer';
import api from '././../../Config/axios';
import { Empty } from 'antd'
function Club() {
    const [clubs, setClubs] = useState([]);
    // const [searchVal, setSearchVal] = useState("");

    useEffect(() => {
        const fetch = async () => {
            try {
                const data = await api.get("/club")
                console.log('Club data', data.data);
                setClubs(data.data);
            }
            catch (err) {
                console.log(err);
            }
        }
        fetch()
    }, [])

    // function handleSearchClick() {
    //     if (searchVal === "") { setClubs(clubs); return; }
    //     const filterBySearch = clubs.filter((item) => {
    //         if (item.toLowerCase()
    //             .includes(searchVal.toLowerCase())) { return item; }
    //     })
    //     setClubs(filterBySearch);
    // }




    return (
        <div>
            {/* <NavBar/> */}
            <div className='text-lg-center'>
                {/* <div>
                <input
                    onChange={e => setSearchVal(e.target.value)}>
                </input>

                <BsSearch onClick={handleSearchClick} />

            </div> */}
            {
                clubs.length > 0 ? (
                    <div >
                    {clubs?.map((club) => (
                        <div className='container' key={club.id}>
                            <p>{club.name}</p>
                            <p>{club.address}</p>
                            <p>{club.open_time}</p>
                            <p>{club.close_time}</p>
                            <p>{club.picture_location}</p>
                            <Link to={`/clubs/${club.id}`}><button>Detail</button></Link>
                        </div>

                    ))}

                </div>
                ) : <Empty/>
            }
             
            </div>
            {/* <Footer/> */}
        </div>
    );
}






export default Club