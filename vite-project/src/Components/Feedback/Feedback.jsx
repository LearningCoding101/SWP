// import React, { useState } from "react";
// import { Form, Input, Button, message, Select } from "antd";
// import api from "../../config/axios";
// import { Option } from "antd/es/mentions";
// import NavBar from "../layout/NavBar";
// import Footer from "../layout/Footer";

// const Feedback = () => {
//   const [form] = Form.useForm();
//   const [feedbackContent, setFeedbackContent] = useState("");
//   const [feedbackRating, setFeedbackRating] = useState("");
//   const [bookingType, setBookingType] = useState("");
  
//   const handleSubmit = async (values) => {
//     const payload = {
//       feedbackContent: values.feedbackContent,
//       feedbackRating: values.feedbackRating,
//       bookingId: values.bookingId,
//     };

//     try {
//       const response = await api.post("/feedback", payload);

//       if (response.status === 200 || response.status === 201) {
//         message.success("Feedback submitted successfully!");
//         form.resetFields();
//       } else {
//         message.error("An error occurred while submitting feedback. Please try again later.");
//       }
//     } catch (error) {
//       console.error(error);
//       message.error("An error occurred. Please try again later.");
//     }
//   };

//   return (
//     <div>
//       <nav>
//       <NavBar/>
//       </nav>
//       <div className="feedback-content">
//     <Form form={form} layout="vertical" onFinish={handleSubmit}>
//       <Form.Item
//         name="feedbackContent"
//         label="Feedback"
//         rules={[{ required: true, message: "Please enter your feedback!" }]}
//       >
//         <Input.TextArea
//           value={feedbackContent}
//           onChange={(values) => setFeedbackContent(values.target.value)} />
//       </Form.Item>
//       <Form.Item
//         name="feedbackRating"
//         label="Rating"
//         rules={[{ required: true, message: "Please rate!" }]}
//       >
//         <Input
//           min={1}
//           max={5}
//           type="number"
//           value={feedbackRating}
//           onChange={(values) => setFeedbackRating(values.target.value)} />
//       </Form.Item>
//       <Form.Item
//         name="bookingId"
//         label="Booking ID"
//         rules={[{ required: true, message: "Please select the booking type!" }]}
//       >
//          <Input
//           type="number"
//           value={bookingType}
//           onChange={(values) => setBookingType(values.target.value)} />
//       </Form.Item>
//       <Form.Item>
//         <Button type="primary" htmlType="submit">
//           Submit Feedback
//         </Button>
//       </Form.Item>
//     </Form>
//     </div>
//  <Footer/>
//     </div>
//   );
// };

// export default Feedback;

import React, { useState } from "react";
import { Form, Input, Button, message, Select } from "antd";
import { Layout, Row, Col } from "antd";
import api from "../../config/axios";
import { Option } from "antd/es/mentions";
import NavBar from "../layout/NavBar";
import Footer from "../layout/Footer";

const { Content } = Layout; // Destructure Content from Layout

const Feedback = () => {
  const [form] = Form.useForm();
  const [feedbackContent, setFeedbackContent] = useState("");
  const [feedbackRating, setFeedbackRating] = useState("");
  const [bookingType, setBookingType] = useState("");

  const handleSubmit = async (values) => {
    const payload = {
      feedbackContent: values.feedbackContent,
      feedbackRating: values.feedbackRating,
      bookingId: values.bookingId,
    };

    try {
      const response = await api.post("/feedback", payload);

      if (response.status === 200 || response.status === 201) {
        message.success("Feedback submitted successfully!");
        form.resetFields();
      } else {
        message.error("An error occurred while submitting feedback. Please try again later.");
      }
    } catch (error) {
      console.error(error);
      message.error("An error occurred. Please try again later.");
    }
  };

  return (
    <Layout className="feedback-layout" style={{ backgroundColor: "white" }}>
      <NavBar />
      <Content className="feedback-content">
        <Row justify="center">
          <Col xs={24} sm={16} md={12} lg={8} xl={6}> {/* Responsive layout for form */}
            <Form form={form} layout="vertical" onFinish={handleSubmit}>
              <Form.Item
                name="feedbackContent"
                label="Feedback"
                rules={[{ required: true, message: "Please enter your feedback!" }]}
              >
                <Input.TextArea
                  value={feedbackContent}
                  onChange={(values) => setFeedbackContent(values.target.value)}
                />
              </Form.Item>
              <Form.Item
                name="feedbackRating"
                label="Rating"
                rules={[{ required: true, message: "Please rate!" }]}
              >
                <Input min={1} max={5} type="number" value={feedbackRating} onChange={(values) => setFeedbackRating(values.target.value)} />
              </Form.Item>
              <Form.Item
                name="bookingId"
                label="Booking ID"
                rules={[{ required: true, message: "Please select the booking type!" }]}
              >
                <Input type="number" value={bookingType} onChange={(values) => setBookingType(values.target.value)} />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Submit Feedback
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Content>
      <Footer />
    </Layout>
  );
};

export default Feedback;
