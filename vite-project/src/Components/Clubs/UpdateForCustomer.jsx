import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../config/axios';
import { Card, Typography, Space, Row, Col, Button, Form, Input, Modal, message, DatePicker } from 'antd';
import NavBar from '../layout/NavBar';
import Footer from '../layout/Footer';

const { Meta } = Card;

const UpdateForCustomer = () => {
    const [bookingDetail, setBookingDetail] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [currentBooking, setCurrentBooking] = useState(null);
    const { bookingid } = useParams();

    useEffect(() => {
        const fetchBookingDetail = async () => {
            try {
                const response = await api.get(`/bookingDetail/${bookingid}`);
                setBookingDetail(response.data);
            } catch (error) {
                console.error('Failed to fetch booking detail:', error);
            }
        };

        fetchBookingDetail();
    }, [bookingid]);

    const showModal = (booking) => {
        setCurrentBooking(booking);
        setIsModalVisible(true);
    };

    const handleUpdate = async (values) => {
        try {
            const changeSlotBookingDetailRequestCombo = {
                newcourtTSId: values.ctslot_id,
                newbookingDate: values.bookingDate
            };
            const response = await api.put(`/bookingDetail/slot/${currentBooking.bookingDetailsId}`, changeSlotBookingDetailRequestCombo);
            console.log("Booking updated:", response.data);
            message.success("Updated success!")
            setIsModalVisible(false);
            // Fetch the booking details again to get the updated data
            const fetchBookingDetail = async () => {
                try {
                    const response = await api.get(`/bookingDetail/${bookingid}`);
                    setBookingDetail(response.data);
                } catch (error) {
                    console.error('Failed to fetch booking detail:', error);
                }
            };
            fetchBookingDetail();
        } catch (error) {
            message.error("Error!")
            console.error("Error updating booking:", error);
        }
    };



    return (
        <div>
            <NavBar />
            <div style={{ marginTop: 130, marginBottom: 30 }}>
                <h3 style={{ textAlign: 'center' }}>Booking ID: {bookingid}</h3>
                <Row gutter={[16, 16]} justify="center">
                    {bookingDetail?.map((booking) => {
                        const bookingDate = new Date(booking.bookingDate);
                        const year = bookingDate.getFullYear();
                        const month = bookingDate.getMonth() + 1;
                        const day = bookingDate.getDate();
                        const dayOfWeek = bookingDate.toLocaleString('en-US', { weekday: 'long' });

                        return (
                            <Col span={10}>
                                <Card title={`Court: ${booking.courtName}`} style={{ margin: '0 auto' }}>
                                    <Space direction="vertical">
                                        <Typography.Text>Name: {booking.fullnameoforder}</Typography.Text>
                                        <Typography.Text>Phone: {booking.phonenumber}</Typography.Text>
                                        <Typography.Text strong>Time: Start: {booking.start_time} - End: {booking.end_time}</Typography.Text>
                                        <Typography.Text strong>Date: {month}/{day}/{year} ({dayOfWeek})</Typography.Text>
                                        <Button onClick={() => showModal(booking)}>Update</Button>
                                    </Space>
                                </Card>
                                <Modal title="Update Booking" visible={isModalVisible && currentBooking === booking} onCancel={() => setIsModalVisible(false)} footer={null}>
                                    <Form onFinish={handleUpdate}>
                                        <Form.Item name="ctslot_id">
                                            <Input placeholder="Court TS ID" />
                                        </Form.Item>
                                        <Form.Item name="bookingDate">
                                            <DatePicker placeholder="Booking Date" format="YYYY-MM-DD" />
                                        </Form.Item>
                                        <Button type="primary" htmlType="submit">Submit</Button>
                                    </Form>
                                </Modal>
                            </Col>
                        );
                    })}
                </Row>
            </div>
            <Footer />
        </div>
    );
};

export default UpdateForCustomer;
