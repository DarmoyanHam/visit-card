import { Card, Avatar, Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";

const { Title, Paragraph } = Typography;

export const CardPreview = ({ iconColor, iconBgColor, cardBgColor }) => {
  return (
    <Card
      style={{
        backgroundColor: cardBgColor,
        width: 300,
        textAlign: "center",
        borderRadius: 12,
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      }}
    >
      <Avatar
        size={64}
        style={{ backgroundColor: iconBgColor, color: iconColor }}
        icon={<UserOutlined />}
      />
      <Title level={3} style={{ marginTop: 16 }}>Demo Title</Title>
      <Paragraph>Short description or details</Paragraph>
    </Card>
  );
};
