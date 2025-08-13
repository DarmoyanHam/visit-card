import { Button, Card, Form, Input, message, Typography, Row, Col, Dropdown, Space, Grid } from "antd";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ADMIN_HOME_PATH, ADMIN_PATH } from "../consts/paths";
import logo from "../assets/Logo.png";
import { ShoppingOutlined, DownOutlined } from "@ant-design/icons";

const { Title, Paragraph } = Typography;
const { useBreakpoint } = Grid;

type LoginForm = {
  login: string;
  password: string;
};

const orderLinks = [
  { label: "Instagram", link: "https://www.instagram.com/l4.vcard/" },
  { label: "Facebook", link: "https://www.facebook.com/L4VisitCard" },
  { label: "WhatsApp", link: "https://api.whatsapp.com/send/?phone=37433220094" },
  { label: "Telegram", link: "https://t.me/L4vcard" },
];

const dropdownItems = orderLinks.map((item) => ({
  key: item.label,
  label: (
    <a href={item.link} target="_blank" rel="noopener noreferrer" >
      {item.label}
    </a>
  ),
}));

export const LoginContainer = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const screens = useBreakpoint();
  const isMobile = !screens.md;

  const onFinish = async (values: LoginForm) => {
    setLoading(true);

    try {
      const response = await fetch("http://192.168.18.6:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.message || "Login failed");
      }

      const { token } = await response.json();
      localStorage.setItem("token", token);
      localStorage.setItem("login", values.login);
      message.success("Login successful!");
      navigate(`${ADMIN_PATH}/${ADMIN_HOME_PATH}`);
    } catch {
      message.error("Invalid credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh" }}>
      <Row
        justify="center"
        align="middle"
        style={{
          minHeight: "100vh",
          padding: isMobile ? "12px" : "20px",
        }}
        gutter={[isMobile ? 12 : 24, isMobile ? 12 : 24]}
      >
        {/* Логотип + текст */}
        <Col
          xs={24}
          md={12}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            textAlign: "center",
            padding: isMobile ? "8px" : "20px",
          }}
        >
          <img
            src={logo}
            alt="logo"
            style={{
              width: isMobile ? "70%" : "80%",
              maxWidth: isMobile ? "220px" : "300px",
              height: "auto",
            }}
          />
          <Paragraph
            style={{
              color: "white",
              fontSize: "clamp(0.9rem, 2.5vw, 1rem)",
              marginBottom: isMobile ? "12px" : "15px",
              maxWidth: "90%",
            }}
          >
            New opportunities for your business. Order your digital business
            card now.
          </Paragraph>
          <Dropdown menu={{ items: dropdownItems }} trigger={["hover"]} placement="bottom" overlayClassName="custom-dropdown" className="login-button">
            <Button size={isMobile ? "middle" : "large"}>
              <Space>
                <ShoppingOutlined />
                Order
                <DownOutlined />
              </Space>
            </Button>
          </Dropdown>
        </Col>

        {/* Форма логина */}
        <Col
          xs={24}
          md={12}
          style={{
            display: "flex",
            justifyContent: "center",
            padding: isMobile ? "8px" : "20px",
          }}
        >
          <Card
            title={<span style={{ color: "white" }}>Admin Login</span>}
            style={{
              width: "100%",
              maxWidth: isMobile ? "420px" : "320px",
              background: "rgba(49, 51, 70, 0.4)", // полупрозрачный фон
              backdropFilter: "blur(10px)", // эффект стекла
              border: "1px solid rgba(255, 255, 255, 0.15)",
              boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
              borderRadius: "12px",
            }}
            bodyStyle={{
              padding: isMobile ? "14px" : "20px",
            }}
          >
            <Form name="login" onFinish={onFinish} layout="vertical">
              <Form.Item
                name="login"
                label={<span style={{ color: "white" }}>Username</span>}
                rules={[{ required: true }]}
              >
                <Input className="login-input"/>
              </Form.Item>

              <Form.Item
                name="password"
                label={<span style={{ color: "white" }}>Password</span>}
                rules={[{ required: true }]}
              >
                <Input.Password className="login-input"/>
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  style={{ color: "white" }}
                  block
                  className="login-button"
                >
                  Log in
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
};
