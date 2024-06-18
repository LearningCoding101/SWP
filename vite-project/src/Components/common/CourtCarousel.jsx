// import Carousel from 'react-bootstrap/Carousel';
// import React, { useEffect, useState } from 'react'
// import Card from 'react-bootstrap/esm/Card'
// import CardBody from 'react-bootstrap/esm/CardBody'
// import CardImg from 'react-bootstrap/esm/CardImg'
// import CardTitle from 'react-bootstrap/esm/CardTitle'
// import Col from 'react-bootstrap/esm/Col'
// import Container from 'react-bootstrap/esm/Container'
// import Row from 'react-bootstrap/esm/Row'
// import { Link } from 'react-router-dom'
// const CourtCarousel = () => {
//     const [courts, setCourts] = useState([{id: '', courtType: '', courtPrice: '', photo: ''}])
//     const [errorMessage, setErrorMessage] = useState("")
//     const [isLoading, setIsLoading] = useState(false)
//     useEffect(() => {
//         setIsLoading(true)
//         getAllCourts().then((data) => { //function is called from api, remember to change this one
//             setCourts(data)
//             setIsLoading(false)
//         }).catch((error) => {
//             setErrorMessage(error.message)
//             setIsLoading(false)
//         })
//     }, [])

//     if (isLoading) {
//         return <div className='mt-5'>Loading courts...</div>
//     }

//     if (errorMessage) {
//         return <div className='text danger mb-5 mt-5'>Error :{errorMessage}</div>
//     }
//     return (
//         //Remember to change the link here
//         <section className='bg-light, mb-5 mt-5 shadow'>
//             <Link to="/browse-courts" className='court-color text-center '>
//                 Browse all courts
//             </Link>

//             <Container>
//                 <Carousel indicators={false}>
//                     {[...Array(Math.ceil(courts.length / 4))].map((_, index) => (
//                         <Carousel.Item key={index}>
//                             <Row>
//                                 {courts.slice(index * 4, index * 4 + 4).map((court) => (
//                                     <Col key={court.id} className='mb-4' xs={12} md={6} lg={3}>
//                                         <Card>
//                                             <Link to={`/book/${court.id}`}>
//                                                 <CardImg
//                                                     variant='top'
//                                                     src={`data:image/png;base64, ${court.photo}`}
//                                                     alt='Court Photo'
//                                                     className='w-100'
//                                                     style={{ height: '200px' }}
//                                                 />

//                                             </Link>
//                                             <CardBody>
//                                             <CardTitle className="court-color">{court.courtType}</CardTitle>
// 												<CardTitle className="room-price">${court.courtPrice}/night</CardTitle>
// 												<div className="flex-shrink-0">
// 													<Link to={`/book/${court.id}`} className="btn btn-court btn-sm">
// 														Book Now
// 													</Link>
// 												</div>
//                                             </CardBody>
//                                         </Card>
//                                     </Col>
//                                 ))}
//                             </Row>
//                         </Carousel.Item>
//                     ))}
//                 </Carousel>
//             </Container>
//         </section>
//     )
// }

// export default CourtCarousel