import { Button, Card, Form, Input, message, Typography, Row, Col, Dropdown, Space } from "antd";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ADMIN_HOME_PATH, ADMIN_PATH } from "../consts/paths";
import logo from "../assets/l4_vc_logo.png";
import "./cards.css";
import { ShoppingOutlined, DownOutlined  } from "@ant-design/icons";
import "../index.css";

const { Title, Paragraph } = Typography;

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
    <a href={item.link} target="_blank" rel="noopener noreferrer">
      {item.label}
    </a>
  ),
}));


export const LoginContainer = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: LoginForm) => {
    setLoading(true);

    console.log(JSON.stringify(values));

    try {
      const response = await fetch("http://192.168.18.6:8080/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.message || "Login failed");
      }


      const { token } = await response.json();
      localStorage.setItem("token", token);
      message.success("Login successful!");
      navigate(`${ADMIN_PATH}/${ADMIN_HOME_PATH}`);
    } catch (error) {
      message.error("Invalid credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <Row
        gutter={[32, 32]}
        justify="center"
        align="middle"
        style={{ minHeight: "100vh", padding: "20px" }}
      >
        <Col
          xs={24}
          md={12}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            textAlign: "center",
            padding: "20px",
          }}
        >
          <img
            src={logo}
            alt="logo"
            style={{ width: "150px", marginBottom: "20px" }}
          />
          <Title level={1} style={{ color: "white" }}>
            L4 VISIT CARD
          </Title>
          <Paragraph style={{ color: "white" }}>
            New opportunities for your business. Order your digital business
            card now.
          </Paragraph>
          <Dropdown
            menu={{ items: dropdownItems }}
            trigger={["hover"]}
            placement="bottom"
            overlayClassName="custom-dropdown"
          >
            <Button size="large">
              <Space>
                <ShoppingOutlined />
                Order
                <DownOutlined />
              </Space>
            </Button>
          </Dropdown>
        </Col>

        <Col
          xs={24}
          md={12}
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Card
            title={<span style={{ color: "white" }}>Admin Login</span>}
            style={{
              width: 300,
              backgroundColor: "#313346ff",
              borderColor: "#313346ff",
              borderWidth: 1,
              borderStyle: "solid",
            }}
          >
            <Form name="login" onFinish={onFinish} layout="vertical">
              <Form.Item
                name="login"
                label={<span style={{ color: "white" }}>Username</span>}
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="password"
                label={<span style={{ color: "white" }}>Password</span>}
                rules={[{ required: true }]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  style={{ color: "white" }}
                  block
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
