import React, { useState, useEffect } from 'react'
import { BsSearch } from 'react-icons/bs';
import { courtLoad } from '../API/ClubLoad';


const Club = async () => {
    const [clubs, setClubs] = useState([]);
    const [searchVal, setSearchVal] = useState("");
    // try {
    //     const data = await courtLoad();
    //     console.log('Club data', data);
    //     setClubs(data);
    // }
    // catch (err) {
    //     console.log(err);
    // }

    function handleSearchClick() {
        if (searchVal === "") { setClubs(clubs); return; }
        const filterBySearch = clubs.filter((item) => {
            if (item.toLowerCase()
                .includes(searchVal.toLowerCase())) { return item; }
        })
        setClubs(filterBySearch);
    }
    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const data = await courtLoad();
    //             console.log('Club data', data);
    //             setClubs(data);
    //         } catch (err) {
    //             console.log(err);
    //         }
    //     };
    //     fetchData();
    // }, []);




    return (
        <div className='text-lg-center'>
            <div>
                <input
                    onChange={e => setSearchVal(e.target.value)}>
                </input>

                <BsSearch onClick={handleSearchClick} />

            </div>
            <div className='container'>
                {clubs.map((club) => (
                    <div key={club}>
                        <p>{club}</p>
                            {/* <p>{club.name}</p>
                            <p>{club.address}</p>
                            <p>{club.open_time}</p>
                            <p>{club.close_time}</p>
                            <p>{club.picture_location}</p> */}
                        </div>
                    
                ))}
            </div>
        </div>
    );
}



export default Club