import React, { useState, useEffect } from 'react';
import { BsSearch } from 'react-icons/bs';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
// const ClubLoad = async() => {
//     const [clubs, setClubs] = useState([]);
//     const [searchVal, setSearchVal] = useState("");

//     function handleSearchClick() {
//         if (searchVal === "") { setClubs(clubs); return; }
//         const filterBySearch = clubs.filter((item) => {
//             if (item.toLowerCase()
//                 .includes(searchVal.toLowerCase())) { return item; }
//         })
//         setClubs(filterBySearch);
//     }

//     useEffect(() => {
//         axios.get('http://152.42.168.144:8080/api/club')
//             .then((res) => res.json())
//             .then((data) => {
//                 console.log(data); // Just to test if the API loads data
//                 setClubs(data);
//             })
//             .catch((error) => {
//                 console.error("Error fetching the courts data: ", error);
//             });
//     }, []);

//     return (
//         <div className='text-lg-center'>
//             <div>
//                 <input
//                     onChange={e => setSearchVal(e.target.value)}>
//                 </input>
                
//                 <BsSearch onClick={handleSearchClick} />
            
//             </div>
//             <div className='container'>
//                 {clubs.map((club) => (
//                     <div key={club.id}>
//                         <p>{club.name}</p>
//                         <p>{club.address}</p>
//                         <p>{club.open_time}</p>
//                         <p>{club.close_time}</p>
//                         <p>{club.picture_location}</p>
//                         {/* <p>{club.ownerId}</p> */}
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// }

// export default ClubLoad;

export const courtLoad = async () => {
  const url = 'http://152.42.168.144:8080/api/club'; 
//   const payload = {
//     email: email,
//     password: password,
//   };

  try {
    const response = await axios.get(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    throw new Error(`Login failed: ${error.response.status} - ${error.response.data}`);
  }
};
