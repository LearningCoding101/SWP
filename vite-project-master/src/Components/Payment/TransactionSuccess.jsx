
// import React from 'react';
// import { CheckCircleOutlined, InfoCircleOutlined } from '@ant-design/icons';
// import { Typography, Space, Divider, Card } from 'antd';
// import Row from 'react-bootstrap/esm/Row';
// import Col from 'react-bootstrap/esm/Col';

// const TransactionSuccess = ({ message = 'Payment successful!', details = null }) => {
//   return (
//     <Card bordered style={{ width: 400, margin: '0 auto' }}> {/* Added Card and styles */}
//       <Row justify="center" align="middle">
//         <Col span={24}> {/* Adjust span for wider content if needed */}
//           <CheckCircleOutlined style={{ fontSize: 64, color: 'green' }} />
//           <Typography.Title level={3}>{message}</Typography.Title>
//         </Col>
//       </Row>
//       <Space direction="vertical" size={12}>
//         {details && (
//           <>
//             <Divider />
//             <Typography.Paragraph>
//               <InfoCircleOutlined style={{ marginRight: 8 }} /> {details}
//             </Typography.Paragraph>
//           </>
//         )}
//       </Space>
//     </Card>
//   );
// };

// export default TransactionSuccess;

import React from 'react';
import { CheckCircleOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { Typography, Space, Divider, Card } from 'antd';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import { Link } from 'react-router-dom';

const TransactionSuccess = ({ message = 'Payment successful!', details = null }) => {
  return (
    <Card bordered style={{ dislay: 'flex' ,width: 400, margin: '0 auto', backgroundColor: '#f2f2f2'}}> {/* Added background color to Card */}
      <Row justify="center" align="middle">
        <Col span={24}>
          <CheckCircleOutlined style={{ fontSize: 64, color: 'green' }} />
          <Typography.Title level={3}>{message}</Typography.Title>
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
      <div style={{ textAlign: 'center', marginTop: 24 }}> {/* Center alignment and margin */}
          <Link to={"/"} style={{ textDecoration: 'none'}}>
            <Typography.Text style={{  fontSize: 18 }}>Redirect to Home</Typography.Text>
          </Link>
        </div>
    </Card>
  );
};

export default TransactionSuccess;
