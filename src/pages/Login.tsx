import { Form, Input, Button, Card, Typography, Checkbox, message } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const { Title } = Typography;

const Login = () => {
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    try {
      const response = await axios.post(
        import.meta.env.VITE_SERVER_URI + "/login",
        values
      );

      if (response.status === 200) {
        const { accessToken, refreshToken } = response.data;

        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

        message.success("Login successful!");
        navigate("/");
      } else {
        message.error("Unexpected error. Please try again.");
      }
    } catch (error: any) {
      if (error.response) {
        const errorMsg =
          error.response.data.message || "Login failed. Please try again.";
        message.error(errorMsg);
      } else {
        message.error(
          "Network error. Please check your connection and try again."
        );
      }
    }
  };

  const onFinishFailed = () => {
    message.error("Please fill in all required fields.");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f0f2f5",
      }}
    >
      <Card style={{ width: 400, boxShadow: "0 4px 8px rgba(0,0,0,0.2)" }}>
        <Title level={3} style={{ textAlign: "center", marginBottom: 20 }}>
          Log In
        </Title>
        <Form
          name="login"
          layout="vertical"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
          >
            <Input placeholder="Enter your email" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password placeholder="Enter your password" />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Log In
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
