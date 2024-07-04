


import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from "../../config/axios";
import { Carousel, Card, Empty, Row, Col, Button } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { useMediaQuery } from 'react-responsive';

const CourtServices = () => {
  const [clubs, setClubs] = useState([]);
  const accessToken = localStorage.getItem("token");
  const navigate = useNavigate();
  const carouselRef = useRef(null);

  const isExtraSmall = useMediaQuery({ maxWidth: 576 });
  const isSmall = useMediaQuery({ minWidth: 576, maxWidth: 768 });
  const isMedium = useMediaQuery({ minWidth: 768, maxWidth: 992 });
  const isLarge = useMediaQuery({ minWidth: 992 });

  useEffect(() => {
    const fetchClubs = async () => {
      try {
        const response = await api.get("/clubs", {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        setClubs(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchClubs();
  }, [accessToken]);

  const slidesToShow = isExtraSmall ? 1 : isSmall ? 2 : isMedium ? 3 : isLarge ? 4 : 1;

  return (
    <div className="court-services-container">
      {clubs.length > 0 ? (
        <div style={{ position: 'relative' }}>
          <Button
            style={{ position: 'absolute', top: '50%', left: '0', zIndex: 1, transform: 'translateY(-50%)' }}
            icon={<LeftOutlined />}
            onClick={() => carouselRef.current.prev()}
          />
          <Carousel
            autoplay
            slidesToShow={slidesToShow}
            dots={false}
            ref={carouselRef}
          >
            {clubs.map((club) => (
              <div key={club.clubId} style={{ padding: '10px' }}>
                <Card
                  cover={<img alt={club.name} src={club.picture_location} style={{ width: '100%', height: '200px' }} />}
                  className="custom-card"
                  style={{ marginBottom: '20px', 
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  marginLeft: 10, marginRight: 10 }}
                >
                  <Card.Meta title={club.name} description={`Open: ${club.open_time} - ${club.close_time}`} style={{marginBottom: 20}}/>
                  <Link to={`/booking/${club.clubId}`}>
                    <Button type="primary" size="small">
                      Book Now
                    </Button>
                  </Link>
                </Card>
              </div>
            ))}
          </Carousel>
          <Button
            style={{ position: 'absolute', top: '50%', right: '0', zIndex: 1, transform: 'translateY(-50%)' }}
            icon={<RightOutlined />}
            onClick={() => carouselRef.current.next()}
          />
        </div>
      ) : (
        <Empty description="No clubs found." />
      )}
    </div>
  );
};

export default CourtServices;
