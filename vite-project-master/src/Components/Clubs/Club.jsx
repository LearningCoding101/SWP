// import React, { useState, useEffect } from 'react'
// import { BsSearch } from 'react-icons/bs';
// import axios from 'axios';
// import { Card, CardContent, CardMedia, Typography, Button, Grid, Divider } from '@mui/material';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { Link, useNavigate } from 'react-router-dom';
// import NavBar from '../layout/NavBar';
// import Footer from '../layout/Footer';
// import api from './../../config/axios';
// import { Empty } from 'antd'
// function Club() {
//   const [clubs, setClubs] = useState([]);
 
//   const accessToken = localStorage.getItem("token");
//   const navigate = useNavigate();

 
//   useEffect(() => {
//     const fetch = async () => {
//       try {
//         const data = await api.get("/clubs")
//         console.log('Club data', data.data);
//         setClubs(data.data);
//       }
//       catch (err) {
//         console.log(err);
//       }
//     }
//     fetch()
//   }, [])



//   return (
//     <div>
//       <NavBar />
//       <div className='text-lg-center'>
//         {
//           clubs.length > 0 ? (
//             <div style={{ margin: '50px 120px 20px' }}>
//               {clubs?.map((club) => (
               
//                 <Grid container key={club.id} spacing={2} border={"thick"} borderRadius={1} margin>
//                   <Grid item xs={8}>
//                     <CardMedia
//                       component="img"
//                       image={club.picture_location}
//                       alt={club.name}
//                       style={{ width: '600px', height: '300px' }}
//                     />
//                   </Grid>
//                   <Grid item xs={4} marginTop={"50px"}>
//                     <CardContent>
//                       <Typography variant="h5" component="div">
//                         {club.name}
//                       </Typography>
//                       <Typography variant="body2" color="text.secondary" style={{ fontSize: 22 }}>
//                         Address: {club.address}
//                       </Typography>
//                       <Typography variant="body2" color="text.secondary" style={{ fontSize: 22 }}>
//                         Open time: {club.open_time} - {club.close_time}
//                       </Typography>
//                     </CardContent>
                    
//                       <Link to={`/booking`}>
//                         <Button variant="contained" size="small">
//                           Book now
//                         </Button>
//                       </Link>
                    
//                   </Grid>
//                 </Grid>
//               ))}

//             </div>
//           ) : <Empty />
//         }

//       </div>
//       <Footer />
//     </div>
//   );
// }
// export default Club
import React, { useState, useEffect } from "react";
import { List, Card, Image, Typography, Button, Space, Empty } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import NavBar from "../layout/NavBar";
import Footer from "../layout/Footer";
import api from "../../config/axios";

const Club = () => {
  const [clubs, setClubs] = useState([]);
  const accessToken = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClubs = async () => {
      try {
        const response = await api.get("/clubs", {
          headers: { Authorization: `Bearer ${accessToken}` }, // Assuming token-based auth
        });
        setClubs(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchClubs();
  }, [accessToken]);

  const renderClubList = (club) => (
    <List.Item key={club.id}>
      <List.Item.Meta
        avatar={<Image width={80} height={80} src={club.picture_location} alt={club.name} />}
        title={<Typography.Title level={4}>{club.name}</Typography.Title>}
        description={
          <Space direction="vertical">
            <Typography.Text>{club.address}</Typography.Text>
            <Typography.Text>Open: {club.open_time} - {club.close_time}</Typography.Text>
          </Space>
        }
      />
      <Link to={`/booking/${club.clubId}`}>
        <Button type="primary" size="small">
          Book Now
        </Button>
      </Link>
    </List.Item>
  );

  return (
    <div>
      <NavBar />
      <div className="container" style={{marginTop: 150}}> {/* Added a container class for better styling */}
        {clubs.length > 0 ? (
          <List
            itemLayout="horizontal"
            dataSource={clubs}
            renderItem={renderClubList}
            pagination={{ pageSize: 5 }} // Optional pagination configuration
          />
        ) : (
          <Empty description="No clubs found." />
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Club;
