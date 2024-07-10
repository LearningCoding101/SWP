

// import React, { useState } from "react";
// import { Form, Input, Button, message, Select } from "antd";
// import { Layout, Row, Col } from "antd";
// import api from "../../config/axios";
// import { Option } from "antd/es/mentions";
// import NavBar from "../layout/NavBar";
// import Footer from "../layout/Footer";
// import { useNavigate, useParams } from "react-router-dom";

// const { Content } = Layout; // Destructure Content from Layout

// const Feedback = () => {
//   const navigate = useNavigate();
//   const [form] = Form.useForm();
//   const [feedbackContent, setFeedbackContent] = useState("");
//   const [feedbackRating, setFeedbackRating] = useState("");
//   const [bookingType, setBookingType] = useState("");
//   const { bookingId } = useParams();
//   const handleSubmit = async (values) => {

//     const payload = {
//       feedbackContent: values.feedbackContent,
//       feedbackRating: values.feedbackRating,
//       bookingId: bookingId,
//     };

//     try {
//       const response = await api.post("/feedback", payload);

//       if (response.status === 200 || response.status === 201) {

//         message.success("Feedback submitted successfully!");
//         form.resetFields();
//         navigate("/bookingHistory")
//       } else {
//         message.error("An error occurred while submitting feedback. Please try again later.");
//       }
//     } catch (error) {
//       console.error(error);
//       message.error("An error occurred. Please try again later.");
//     }
//   };

//   return (
//     <Layout className="feedback-layout" style={{ backgroundColor: "white" }}>
//       <NavBar />
//       <Content className="feedback-content">
//         <Row justify="center">
//           <Col xs={24} sm={16} md={12} lg={8} xl={6}> {/* Responsive layout for form */}
//             <Form form={form} layout="vertical" onFinish={handleSubmit}>
//               <Form.Item
//                 name="feedbackContent"
//                 label="Feedback"
//                 rules={[{ required: true, message: "Please enter your feedback!" }]}
//               >
//                 <Input.TextArea
//                   value={feedbackContent}
//                   onChange={(values) => setFeedbackContent(values.target.value)}
//                 />
//               </Form.Item>
//               <Form.Item
//                 name="feedbackRating"
//                 label="Rating"
//                 rules={[{ required: true, message: "Please rate!" }]}
//               >
//                 <Input min={1} max={5} type="number" value={feedbackRating} onChange={(values) => setFeedbackRating(values.target.value)} />
//               </Form.Item>
//               <Form.Item>
//                 <Button type="primary" htmlType="submit">
//                   Submit Feedback
//                 </Button>
//               </Form.Item>
//             </Form>
//           </Col>
//         </Row>
//       </Content>
//       <Footer />
//     </Layout>
//   );
// };

// export default Feedback;

import React, { useEffect, useState } from "react";
import { Form, Input, Button, message, Select } from "antd";
import { Layout, Row, Col } from "antd";
import api from "../../config/axios";
import { Option } from "antd/es/mentions";
import NavBar from "../layout/NavBar";
import Footer from "../layout/Footer";
import { useNavigate, useParams } from "react-router-dom";
import { Rate } from "antd"; // Import Rate component

const { Content } = Layout; // Destructure Content from Layout

const Feedback = () => {
  const userRole = localStorage.getItem("userRole")
  const isLoggedIn = localStorage.getItem("token")
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [feedbackContent, setFeedbackContent] = useState("");
  const [feedbackRating, setFeedbackRating] = useState(0); // Initialize with 0 for star selection
  const [bookingType, setBookingType] = useState("");
  const { bookingId } = useParams();

  useEffect(() => {
    if (userRole != "CUSTOMER") {
      navigate('/error404');
    }
  }, [userRole, navigate]);

  const handleRatingChange = (value) => {
    setFeedbackRating(value);
  };

  const handleSubmit = async (values) => {
    const payload = {
      feedbackContent: values.feedbackContent,
      feedbackRating: feedbackRating, // Use the state variable
      bookingId: bookingId,
    };

    try {
      const response = await api.post("/feedback", payload);

      if (response.status === 200 || response.status === 201) {
        message.success("Feedback submitted successfully!");
        form.resetFields();
        navigate("/bookingHistory");
      } else {
        message.error("An error occurred while submitting feedback. Please try again later.");
      }
    } catch (error) {
      console.error(error);
      message.error("An error occurred. Please try again later.");
    }
  };

  return (
    <>
      {isLoggedIn ? (
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
                    label="Rating"
                    rules={[{ required: true, message: "Please rate!" }]}
                  >
                    <Rate allowHalf value={feedbackRating} onChange={handleRatingChange} />
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
      ) : (
        navigate('/login')
      )}
    </>
  );
};

export default Feedback;

