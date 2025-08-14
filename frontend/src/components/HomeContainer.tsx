import { 
  Card, 
  Form, 
  Input, 
  // Checkbox, 
  Typography, 
  Button, 
  // Upload, 
  // ColorPicker, 
  Row, 
  Col 
} from "antd";
//import { UploadOutlined } from "@ant-design/icons";
import { 
  useState, 
  useEffect 
} from "react";
import "./cards.css";

const { TextArea } = Input;
const { Title } = Typography;

export const HomeContainer = () => {
    const [form] = Form.useForm();
    const [initialValues, setInitialValues] = useState<Record<string, string>>({});
    

    const token = localStorage.getItem("token");

    const onFinish = (values: Record<string, string>) => {
      if (!token) {
        console.error("Token not found.");
        return;
      }

      const allowedKeys = [
        "slogan_positionHy",
        "slogan_positionRu",
        "slogan_positionEn",
        "name"
      ];

      const updates: Record<string, string> = {};
      for (const key of allowedKeys) {
        const newValue = values[key];
        const oldValue = initialValues[key];

        if (newValue !== undefined && newValue !== oldValue) {
          updates[key] = String(newValue);
        }
      }


      fetch("http://192.168.18.6:8080/api/main/fields", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token,
        },
        body: JSON.stringify(updates),
      })
        .then((res) => {
          if (!res.ok) throw new Error("Failed to update fields");
          return res.json();
        })
        .then((data) => {
          console.log("Данные успешно сохранены:", data);
        })
        .catch((error) => {
          console.error("Ошибка при обновлении данных:", error);
      });
    };



    useEffect(() => {
        fetch(`http://192.168.18.6:8080/api/main/token`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token,
          }
        })
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch MainPage data");
          return res.json();
        })
        .then((data) => {
          console.log(data);
          const vals = {
            password: data.password || "",
            login: data.login || "",
            name: data.name || "",
            slogan_positionHy: data.slogan_positionHy || "",
            slogan_positionRu: data.slogan_positionRu || "",
            slogan_positionEn: data.slogan_positionEn || "",
            // nameColor: data.nameColor,
            // logoBgColor: data.logoBgColor,
            // sloganColor: data.sloganColor,
            // iconColor: data.iconColor,
            // iconBgColor: data.iconBgColor,
            // buttonColor: data.buttonColor,
            // addToContactColor: data.addToContactColor,
            // langBtnColor: data.langBtnColor,
          };
          form.setFieldsValue(vals);
          setInitialValues(vals);
        })
        .catch((error) => {
          console.error("Ошибка при загрузке данных:", error);
        });
    }, []);

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
              <Button onClick={() => form.submit()} className="login-button">Save</Button>
            </Col>
          </Row>
        }
        className="shadow-xl rounded-2xl"
        style={{
          WebkitBackdropFilter: "blur(12px)", // для Safari
          background: "rgba(49, 51, 70, 0.4)", // полупрозрачный фон
          backdropFilter: "blur(10px)", // эффект стекла
          border: "1px solid rgba(255, 255, 255, 0.15)",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
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
              <Input.Password placeholder="Input password" className="login-input"/>
            </Form.Item>

            <Form.Item label={<span style={{ color: "white" }}>Login</span>} name="login">
              <Input placeholder="Input login" className="login-input"/>
            </Form.Item>

            <Form.Item label={<span style={{ color: "white" }}>Name</span>} name="name">
              <Input placeholder="Name" className="login-input"/>
            </Form.Item>

            <Form.Item label={<span style={{ color: "white" }}>Slogan/Position(Armenian)</span>} name="slogan_positionHy">
              <TextArea rows={2} className="login-input"/>
            </Form.Item>

            <Form.Item label={<span style={{ color: "white" }}>Slogan/Position(Russian)</span>} name="slogan_positionRu">
              <TextArea rows={2} className="login-input"/>
            </Form.Item>

            <Form.Item label={<span style={{ color: "white" }}>Slogan/Position(English)</span>} name="slogan_positionEn">
              <TextArea rows={2} className="login-input"/>
            </Form.Item>

{/* {            <Row gutter={[16, 16]}>
              <Col xs={24} sm={12} md={8} lg={6}>
                <Form.Item label={<span style={{ color: "white" }}>Name color</span>} name="nameColor">
                  <ColorPicker/>
                </Form.Item>
              </Col>

              <Col xs={24} sm={12} md={8} lg={6}>
                <Form.Item label={<span style={{ color: "white" }}>Logo background color</span>} name="logoBgColor">
                  <ColorPicker/>
                </Form.Item>
              </Col>

              <Col xs={24} sm={12} md={8} lg={6}>
                <Form.Item label={<span style={{ color: "white" }}>Slogan/position color</span>} name="sloganColor">
                  <ColorPicker/>
                </Form.Item>
              </Col>

              <Col xs={24} sm={12} md={8} lg={6}>
                <Form.Item label={<span style={{ color: "white" }}>Icon color</span>} name="iconColor">
                  <ColorPicker/>
                </Form.Item>
              </Col>

              <Col xs={24} sm={12} md={8} lg={6}>
                <Form.Item label={<span style={{ color: "white" }}>Icon background color</span>} name="iconBgColor">
                  <ColorPicker/>
                </Form.Item>
              </Col>

              <Col xs={24} sm={12} md={8} lg={6}>
                <Form.Item label={<span style={{ color: "white" }}>Button name color</span>} name="buttonColor">
                  <ColorPicker/>
                </Form.Item>
              </Col>

              <Col xs={24} sm={12} md={8} lg={6}>
                <Form.Item label={<span style={{ color: "white" }}>"Add to contacts" button color</span>} name="addToContactColor">
                  <ColorPicker/>
                </Form.Item>
              </Col>

              <Col xs={24} sm={12} md={8} lg={6}>
                <Form.Item label={<span style={{ color: "white" }}>Language button color</span>} name="langBtnColor">
                  <ColorPicker/>
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

            <Form.Item label={<span style={{ color: "white" }}>Background picture</span>} name="background">
              <Upload listType="picture" maxCount={1} beforeUpload={() => false}>
                <Button icon={<UploadOutlined />}>Upload</Button>
              </Upload>
            </Form.Item>} */}
          </div>
        </Form>
      </Card>
    </div>
  );
};
