import React, { useState, useEffect } from 'react';
import { Spin, Row, Col, Card } from 'antd';
import api from '../../config/axios';

const Transaction = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const bookingId = localStorage.getItem("bookingId")

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await api.get(`/transactions/${bookingId}`);
        setTransactions(data.data);
        console.log(data.data)
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const renderTransaction = (transaction) => (
    <Col span={24}>
      <Card title={transaction.id}>
        <div>Date: </div>
        <div>Amount: {transaction.amount}</div>
        <div>Booking type: </div>
        <div>Total Amount:</div>
        <div>Status:</div>
      </Card>
    </Col>
  );

  return (
    <Spin spinning={loading}>
      <Row gutter={16}>
      {transactions?.length > 0 && transactions.map(renderTransaction)}
      </Row>
    </Spin>
  );
};

export default Transaction;
