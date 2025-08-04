import { Table, Input, Checkbox, Button, Card, Row, Col, Typography, Form } from "antd";
import { useState } from "react";
import type { ColumnsType } from "antd/es/table";
import "./ContactTable.css";

const { Title } = Typography;

// interface ContactData {
//   key: string;
//   label: string;
//   value: string;
//   enabled: boolean;
// }

// const initialData: ContactData[] = [
//   { key: "1", label: "Phone", value: "", enabled: true },
//   { key: "2", label: "Email", value: "", enabled: false },
//   { key: "3", label: "SMS", value: "", enabled: false },
//   { key: "4", label: "Website", value: "", enabled: false },
//   { key: "5", label: "Location(Yandex(arm))", value: "", enabled: false },
//   { key: "6", label: "Location(Yandex(ru))", value: "", enabled: false },
//   { key: "7", label: "Location(google(eng))", value: "", enabled: false },
//   { key: "8", label: "WhatsApp", value: "", enabled: false },
//   { key: "9", label: "Linkedin", value: "", enabled: false },
//   { key: "10", label: "Viber", value: "", enabled: false },
//   { key: "11", label: "Telegram", value: "", enabled: false },
//   { key: "12", label: "Facebook", value: "", enabled: false },
//   { key: "13", label: "Messenger", value: "", enabled: false },
//   { key: "14", label: "Instagram", value: "", enabled: false },
//   { key: "15", label: "Tiktok", value: "", enabled: false },
//   { key: "16", label: "Youtube", value: "", enabled: false },
//   { key: "17", label: "X", value: "", enabled: false },
//   { key: "18", label: "VK", value: "", enabled: false },
//   { key: "19", label: "Snapchat", value: "", enabled: false },
// ];

export const ContactTable = () => {
  // const [data, setData] = useState(initialData);
  // const [form] = Form.useForm();

  // const handleCheckboxChange = (key: string, checked: boolean) => {
  //   setData(prev =>
  //     prev.map(item =>
  //       item.key === key ? { ...item, enabled: checked } : item
  //     )
  //   );
  // };

  // const handleInputChange = (key: string, value: string) => {
  //   setData(prev =>
  //     prev.map(item =>
  //       item.key === key ? { ...item, value } : item
  //     )
  //   );
  // };

  // const columns: ColumnsType<ContactData> = [
  //   {
  //     title: "",
  //     dataIndex: "enabled",
  //     render: (_: any, record: ContactData) => (
  //       <Checkbox
  //         checked={record.enabled}
  //         onChange={e => handleCheckboxChange(record.key, e.target.checked)}
  //       />
  //     ),
  //     width: 60,
  //   },
  //   {
  //     title: "Type",
  //     dataIndex: "label",
  //   },
  //   {
  //     title: "Value",
  //     dataIndex: "value",
  //     render: (_: any, record: ContactData) => (
  //       <Input
  //         value={record.value}
  //         onChange={e => handleInputChange(record.key, e.target.value)}
  //         disabled={!record.enabled}
  //       />
  //     ),
  //   },
  // ];

  return (
    <Card 
      title={
        <Row justify="space-between" align="middle">
          <Col>
            <Title level={3} style={{ color: "white", margin: 0 }}>
              My contacts
            </Title>
          </Col>
          <Col>
            <Button >Save</Button>
          </Col>
        </Row>
      }
      className="custom-table-wrapper"
      style={{
          backgroundColor: "#262835ff",
          borderColor: "#313346ff",
          borderWidth: 1,
          borderStyle: "solid",
      }}  
    >

      <Form
          layout="vertical"
          form={form}
          onFinish={() => {}}
          initialValues={{ sloganBold: true, feedback: true }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Form.Item label={<span style={{ color: "white" }}>Phone</span>} name="tel" >
              <Input placeholder="Input phone number" />
            </Form.Item>

            <Form.Item label={<span style={{ color: "white" }}>Email</span>} name="mail">
              <Input placeholder="Input email"/>
            </Form.Item>

            <Form.Item label={<span style={{ color: "white" }}>SMS</span>} name="sms">
              <Input placeholder="Input phone number"/>
            </Form.Item>

            <Form.Item label={<span style={{ color: "white" }}>Website</span>} name="website">
              <Input placeholder="Input Website link"/>
            </Form.Item>

            <Form.Item label={<span style={{ color: "white" }}>Location(google maps)</span>} name="location">
              <Input placeholder="Input your location"/>
            </Form.Item>

            <Form.Item label={<span style={{ color: "white" }}>WhatsApp</span>} name="whatsapp">
              <Input placeholder="Input your whatsApp"/>
            </Form.Item>

            <Form.Item label={<span style={{ color: "white" }}>LinkedIn</span>} name="linkedin">
              <Input placeholder="Input your linkedIn"/>
            </Form.Item>

            <Form.Item label={<span style={{ color: "white" }}>Viber</span>} name="viber">
              <Input placeholder="Input your viber"/>
            </Form.Item>
          
            <Form.Item label={<span style={{ color: "white" }}>Telegram</span>} name="telegram">
              <Input placeholder="Input your telegram"/>
            </Form.Item>

            <Form.Item label={<span style={{ color: "white" }}>Facebook</span>} name="facebook">
              <Input placeholder="Input your facebook"/>
            </Form.Item>

            <Form.Item label={<span style={{ color: "white" }}>Messenger</span>} name="messenger">
              <Input placeholder="Input your Messenger"/>
            </Form.Item>

            <Form.Item label={<span style={{ color: "white" }}>Instagram</span>} name="instagram">
              <Input placeholder="Input your instagram"/>
            </Form.Item>

            <Form.Item label={<span style={{ color: "white" }}>TikTok</span>} name="tiktok">
              <Input placeholder="Input your tiktok"/>
            </Form.Item>

            <Form.Item label={<span style={{ color: "white" }}>YouTube</span>} name="youtube">
              <Input placeholder="Input your youtube"/>
            </Form.Item>

            <Form.Item label={<span style={{ color: "white" }}>X</span>} name="twitter">
              <Input placeholder="Input your X"/>
            </Form.Item>

            <Form.Item label={<span style={{ color: "white" }}>VK</span>} name="vk">
              <Input placeholder="Input vk"/>
            </Form.Item>

            <Form.Item label={<span style={{ color: "white" }}>Snapchat</span>} name="snapchat">
              <Input placeholder="Input snapchat"/>
            </Form.Item>
          </div>
        </Form>
      {/* <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        rowKey="key"
        className="custom-dark-table"
      /> */}
    </Card>
  );
};
