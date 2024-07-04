// // import React, { useState, useEffect } from 'react';
// // import { Row, Col, Card, Image, Typography, Affix } from 'antd';

// // const Services = () => {
// //   const [isVisible, setIsVisible] = useState(false);

// //   useEffect(() => {
// //     const handleScroll = () => {
// //       const scrollTop = window.scrollY;
// //       const windowHeight = window.innerHeight;
// //       const componentTop = document.getElementById('badminton-services').offsetTop;

// //       setIsVisible(scrollTop > componentTop - windowHeight / 2);
// //     };

// //     window.addEventListener('scroll', handleScroll);

// //     return () => window.removeEventListener('scroll', handleScroll);
// //   }, []);

// //   return (
// //     <div id="badminton-services" className="badminton-services">
// //       <Affix offset={-200}>
// //         {/* Services Section Content */}
// //         {isVisible && (
// //           <Row gutter={[16, 16]}>
// //             <Col xs={24} sm={12} md={8}>
// //               <Card hoverable cover={<Image src="https://placehold.it/200x150?text=Badminton Coaching" alt="Badminton Coaching" />}>
// //                 <Card.Meta title="Badminton Coaching" description="Learn from qualified coaches and improve your game." />
// //               </Card>
// //             </Col>
// //             <Col xs={24} sm={12} md={16}>
// //               <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
// //                 <Typography.Title level={4}>Badminton Coaching</Typography.Title>
// //                 <Typography.Text>
// //                   Elevate your badminton skills with our expert coaching programs. We cater to all levels, from beginners to advanced players. Our coaches are passionate and experienced, dedicated to helping you achieve your goals.
// //                 </Typography.Text>
// //               </div>
// //             </Col>

// //             <Col xs={24} sm={12} md={16}>
// //               <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
// //                 <Typography.Title level={4}>Group Lessons</Typography.Title>
// //                 <Typography.Text>
// //                   Make new friends and have fun while learning badminton in our engaging group lessons. We offer small group sizes for personalized attention and a supportive learning environment.
// //                 </Typography.Text>
// //               </div>
// //             </Col>
// //             <Col xs={24} sm={12} md={8}>
// //               <Card hoverable cover={<Image src="https://placehold.it/200x150?text=Group Badminton Lessons" alt="Group Badminton Lessons" />}>
// //                 <Card.Meta title="Group Lessons" description="Fun and social way to learn badminton." />
// //               </Card>
// //             </Col>

// //             <Col xs={24} sm={12} md={8}>
// //               <Card hoverable cover={<Image src="https://placehold.it/200x150?text=Court Rentals" alt="Badminton Court Rentals" />}>
// //                 <Card.Meta title="Court Rentals" description="Book your court online and play anytime." />
// //               </Card>
// //             </Col>
// //             <Col xs={24} sm={12} md={16}>
// //               <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
// //                 <Typography.Title level={4}>Court Rentals</Typography.Title>
// //                 <Typography.Text>
// //                   Reserve your badminton court online for convenient and flexible playtime. We offer a variety of court types to suit your needs, whether you're practicing solo or playing with friends.
// //                 </Typography.Text>
// //               </div>
// //             </Col>
// //           </Row>
// //         )}
// //       </Affix>
// //     </div>
// //   );
// // };

// // export default Services;

// import React, { useState, useEffect } from 'react';
// import { Row, Col, Card, Image, Typography, Affix, Animate } from 'antd';

// const Services = () => {
//   const [isVisible, setIsVisible] = useState(false);
//   const [services, setServices] = useState([]); // Array to hold service objects

//   useEffect(() => {
//     const handleScroll = () => {
//       const scrollTop = window.scrollY;
//       const windowHeight = window.innerHeight;
//       const componentTop = document.getElementById('badminton-services').offsetTop;

//       setIsVisible(scrollTop > componentTop - windowHeight / 2);
//     };

//     window.addEventListener('scroll', handleScroll);

//     // Define services data
//     const serviceData = [
//       {
//         id: 1,
//         image: 'https://placehold.it/200x150?text=Badminton Coaching',
//         title: 'Badminton Coaching',
//         description: 'Learn from qualified coaches and improve your game.',
//       },
//       {
//         id: 2,
//         image: 'https://placehold.it/200x150?text=Group Badminton Lessons',
//         title: 'Group Lessons',
//         description: 'Fun and social way to learn badminton.',
//       },
//       {
//         id: 3,
//         image: 'https://placehold.it/200x150?text=Court Rentals',
//         title: 'Court Rentals',
//         description: 'Book your court online and play anytime.',
//       },
//     ];

//     setServices(serviceData); // Set initial service data

//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   return (
//     <div id="badminton-services" className="badminton-services">
//       <Affix offset={-200}>
//         {/* Services Section Content */}
//         {isVisible && (
//           <Row gutter={[16, 16]}>
//             {services.map((service) => (
//               <Col
//                 xs={24}
//                 sm={12}
//                 md={8}
//                 key={service.id}
//                 style={{ animationDelay: `${service.id * 0.2}s` }}
//               >
//                 <Animate animation={{ opacity: 1, translateY: 0 }} in={isVisible}>
//                   <Card hoverable cover={<Image src={service.image} alt={service.title} />}>
//                     <Card.Meta title={service.title} description={service.description} />
//                   </Card>
//                 </Animate>
//               </Col>
//             ))}
//           </Row>
//         )}
//       </Affix>
//     </div>
//   );
// };

// export default Services;

