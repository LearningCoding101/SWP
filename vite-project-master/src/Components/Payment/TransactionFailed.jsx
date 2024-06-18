import React from 'react';
import { CloseCircleOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { Typography, Space, Divider, Card } from 'antd';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';

const TransactionFailed = ({ message = 'Transaction failed!', details = null }) => {
  return (
    <div style={{ padding: 32 }}> {/* Background color and padding */}
      <Card bordered style={{ width: 400, margin: '0 auto', backgroundColor: '#f2f2f2' }}> {/* Card styles with background color */}
        <Row justify="center" align="middle">
          <Col span={24}>
            <CloseCircleOutlined style={{ fontSize: 64, color: 'red' }} />
            <Typography.Title level={3} style={{ color: 'red' }}>
              {message}
            </Typography.Title>
          </Col>
        </Row>
        <Space direction="vertical" size={12}>
          {details && (
            <>
              <Divider />
              <Typography.Paragraph>
                <InfoCircleOutlined style={{ marginRight: 8 }} /> {details}
              </Typography.Paragraph>
            </>
          )}
        </Space>
        <div style={{ textAlign: 'center', marginTop: 24, fontSize: 18 }}> {/* Center alignment and margin */}
          <p>Please try a different payment method</p>
        </div>
      </Card>
    </div>
  );
};

export default TransactionFailed;
