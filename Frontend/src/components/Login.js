import React from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button } from 'antd';
import './Login.css';
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import ButtonGroup from "antd/es/button/button-group";

const Login = (props) => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const particlesInit = async (main) => {
    await loadFull(main);
  };
  const host = "http://localhost:5000";

  const handleSubmit = async (values) => {
    try {
        const response = await fetch(`${host}/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ 
                email: values.email, 
                password: values.password
            }),
        });

        const json = await response.json();
        console.log(json);

        if (json.success) {
            localStorage.setItem('token', json.authtoken);
            props.showAlert("Logged In Successfully", "success");
            navigate("/");
        } else {
            props.showAlert("Invalid Credentials", "danger");
        }
    } catch (error) {
        console.error("Login error:", error);
        props.showAlert("An error occurred during login", "danger");
    }
  }

  return (
    <div className="dynamic-bg" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column', textAlign: 'center' }}>
  <h2 className="d-flex" style={{ marginBottom: '20px' }}>
    iNotes welcomes you, Please Log in to continue.
  </h2>
  <div className="container" style={{ maxWidth: '400px', margin: '0 auto' }}>
      <Form
        form={form}
        onFinish={handleSubmit}
        layout="vertical"
        autoComplete="off"
      >
        {/* Email Field */}
        <Form.Item
          label="Email Address"
          name="email"
          rules={[
            {
              required: true,
              type: 'email',
              message: 'Please enter a valid email address',
            },
          ]}
        >
          <Input placeholder="Enter email" />
        </Form.Item>

        {/* Password Field */}
        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Please enter your password',
            },
          ]}
        >
          <Input.Password placeholder="Enter password" />
        </Form.Item>

        {/* Submit Button */}
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
    </div>
  );
};

export default Login;
