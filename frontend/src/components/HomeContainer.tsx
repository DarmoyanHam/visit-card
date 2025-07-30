import { Card, Form, Input, Checkbox, Typography, Button, Upload, ColorPicker, Row, Col } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useState } from "react";
import "./cards.css";

const { TextArea } = Input;
const { Title } = Typography;

export const HomeContainer = () => {
  const [form] = Form.useForm();
  const [color, setColor] = useState("#FFFFF000526ff")

  const onFinish = (values) => {
    console.log("Saved:", values);
  };

  return (
    <div className="max-w-4xl mx-auto py-10">
      <Card 
        title={
          <Row justify="space-between" align="middle">
            <Col>
              <Title level={3} style={{ color: "white", margin: 0 }}>
                Edit Visit Card
              </Title>
            </Col>
            <Col>
              <Button >Save</Button>
            </Col>
          </Row>
        }
        className="shadow-xl rounded-2xl"
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
          onFinish={onFinish}
          initialValues={{ sloganBold: true, feedback: true }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Form.Item label={<span style={{ color: "white" }}>Password</span>} name="password" >
              <Input.Password placeholder="Введите пароль" />
            </Form.Item>

            <Form.Item label={<span style={{ color: "white" }}>URL</span>} name="url">
              <Input />
            </Form.Item>

            <Form.Item label={<span style={{ color: "white" }}>Name(Armenian)</span>} name="nameHy">
              <Input />
            </Form.Item>

            <Form.Item label={<span style={{ color: "white" }}>Name(Russian)</span>} name="nameRu">
              <Input />
            </Form.Item>

            <Form.Item label={<span style={{ color: "white" }}>Name(English)</span>} name="nameEn">
              <Input />
            </Form.Item>

            <Form.Item label={<span style={{ color: "white" }}>Slogan/Position(Armenian)</span>} name="sloganHy">
              <TextArea rows={2} />
            </Form.Item>

            <Form.Item label={<span style={{ color: "white" }}>Slogan/Position(Russian)</span>} name="sloganRu">
              <TextArea rows={2} />
            </Form.Item>

            <Form.Item label={<span style={{ color: "white" }}>Slogan/Position(English)</span>} name="sloganEn">
              <TextArea rows={2} />
            </Form.Item>

            <Row gutter={[16, 16]}>
              <Col xs={24} sm={12} md={8} lg={6}>
                <Form.Item label={<span style={{ color: "white" }}>Name color</span>} name="nameColor">
                  <ColorPicker value={color} />
                </Form.Item>
              </Col>

              <Col xs={24} sm={12} md={8} lg={6}>
                <Form.Item label={<span style={{ color: "white" }}>Logo background color</span>} name="logoBgColor">
                  <ColorPicker value={color} />
                </Form.Item>
              </Col>

              <Col xs={24} sm={12} md={8} lg={6}>
                <Form.Item label={<span style={{ color: "white" }}>Slogan/position color</span>} name="sloganColor">
                  <ColorPicker value={color} />
                </Form.Item>
              </Col>

              <Col xs={24} sm={12} md={8} lg={6}>
                <Form.Item label={<span style={{ color: "white" }}>Icon color</span>} name="iconColor">
                  <ColorPicker value={color} />
                </Form.Item>
              </Col>

              <Col xs={24} sm={12} md={8} lg={6}>
                <Form.Item label={<span style={{ color: "white" }}>Icon background color</span>} name="iconBgColor">
                  <ColorPicker value={color} />
                </Form.Item>
              </Col>

              <Col xs={24} sm={12} md={8} lg={6}>
                <Form.Item label={<span style={{ color: "white" }}>Button name color</span>} name="buttonColor">
                  <ColorPicker value={color} />
                </Form.Item>
              </Col>

              <Col xs={24} sm={12} md={8} lg={6}>
                <Form.Item label={<span style={{ color: "white" }}>"Add to contacts" button color</span>} name="addToContactColor">
                  <ColorPicker value={color} />
                </Form.Item>
              </Col>

              <Col xs={24} sm={12} md={8} lg={6}>
                <Form.Item label={<span style={{ color: "white" }}>Language button color</span>} name="langBtnColor">
                  <ColorPicker value={color} />
                </Form.Item>
              </Col>
            </Row>


            <Form.Item label={<span style={{ color: "white" }}>Selections</span>}>
                <Checkbox.Group>
                    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                        <Checkbox value="opt4"><span style={{ color: "white" }}>Slogan/Position bold</span></Checkbox>
                        <Checkbox value="opt1"><span style={{ color: "white" }}>Button name shadow</span></Checkbox>
                        <Checkbox value="opt2"><span style={{ color: "white" }}>Disable icon blink</span></Checkbox>
                        <Checkbox value="opt3"><span style={{ color: "white" }}>Book a visit</span></Checkbox>
                        <Checkbox value="opt4"><span style={{ color: "white" }}>Feedback</span></Checkbox>
                    </div>
                </Checkbox.Group>
            </Form.Item>

            <Form.Item label={<span style={{ color: "white" }}>Logo</span>} name="logo">
              <Upload listType="picture" maxCount={1} beforeUpload={() => false}>
                <Button icon={<UploadOutlined />}>Upload</Button>
              </Upload>
            </Form.Item>

            <Form.Item label={<span style={{ color: "white" }}>Background picture</span>} name="logo">
              <Upload listType="picture" maxCount={1} beforeUpload={() => false}>
                <Button icon={<UploadOutlined />}>Upload</Button>
              </Upload>
            </Form.Item>
          </div>
        </Form>
      </Card>
    </div>
  );
};
