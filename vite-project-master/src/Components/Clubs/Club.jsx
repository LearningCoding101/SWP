import React, { useState, useEffect } from 'react'
import { BsSearch } from 'react-icons/bs';
import axios from 'axios';
import { Card, CardContent, CardMedia, Typography, Button, Grid, Divider } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import NavBar from '../layout/NavBar';
import Footer from '../layout/Footer';
import api from './../../Config/axios';
import { Empty } from 'antd'
function Club() {
  const [clubs, setClubs] = useState([]);
  // const [searchVal, setSearchVal] = useState("");
  const accessToken = localStorage.getItem("token");
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (!accessToken) {
  //     navigate('/login'); // Navigate to the login page or another page if accessToken is null
  //   }
  // }, [accessToken, navigate]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await api.get("/clubs")
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
      <NavBar />
      <div className='text-lg-center'>
        {/* <div>
                <input
                    onChange={e => setSearchVal(e.target.value)}>
                </input>

                <BsSearch onClick={handleSearchClick} />

            </div> */}
        {
          clubs.length > 0 ? (
            <div style={{ margin: '50px 120px 20px' }}>
              {clubs?.map((club) => (
                // <div className='container' key={club.id}>
                //     <p>{club.name}</p>
                //     <p>{club.address}</p>
                //     <p>{club.open_time}</p>
                //     <p>{club.close_time}</p>
                //     <p>{club.picture_location}</p>
                //     <Link to={`/clubs/${club.address}`}><button>Detail</button></Link>
                // </div>
                <Grid container key={club.id} spacing={2} border={"thick"} borderRadius={1} margin>
                  <Grid item xs={8}>
                    <CardMedia
                      component="img"
                      image={club.picture_location}
                      alt={club.name}
                      style={{ width: '600px', height: '300px' }}
                    />
                  </Grid>
                  <Grid item xs={4} marginTop={"50px"}>
                    <CardContent>
                      <Typography variant="h5" component="div">
                        {club.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" style={{ fontSize: 22 }}>
                        Address: {club.address}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" style={{ fontSize: 22 }}>
                        Open time: {club.open_time} - {club.close_time}
                      </Typography>
                    </CardContent>
                    
                      <Link to={`/booking`}>
                        <Button variant="contained" size="small">
                          Book now
                        </Button>
                      </Link>
                    
                  </Grid>
                </Grid>
              ))}

            </div>
          ) : <Empty />
        }

      </div>
      <Footer />
    </div>
  );
}






export default Club