import { 
  Card, 
  Form, 
  Input, 
  Typography, 
  Button, 
  Row, 
  Col, 
  Upload,
  Modal,
  message
} from "antd";
import { 
  useState, 
  useEffect 
} from "react";
import "./cards.css";
import { UploadOutlined, EyeOutlined, DeleteOutlined } from "@ant-design/icons";
import type { UploadFile, UploadProps } from 'antd/es/upload/interface';
import { IP } from "../consts/ip";

const { TextArea } = Input;
const { Title } = Typography;

export const HomeContainer = () => {
    const [form] = Form.useForm();
    const [initialValues, setInitialValues] = useState<Record<string, any>>({});
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [previewVisible, setPreviewVisible] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [avatarData, setAvatarData] = useState<{base64: string, fileName: string, fileType: string} | null>(null);
    const [avatarDeleted, setAvatarDeleted] = useState(false);

    const token = localStorage.getItem("token");

    const getBase64 = (file: File): Promise<string> =>
      new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = error => reject(error);
      });

    const handlePreview = async (file: UploadFile) => {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj as File);
      }

      setPreviewImage(file.url || (file.preview as string));
      setPreviewVisible(true);
      setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
    };

    const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
      setFileList(newFileList);
    };

    const handleUpload = async (file: File) => {
      try {
        const base64 = await getBase64(file);
        const base64Data = base64.split(',')[1];
        
        setAvatarData({
          base64: base64Data,
          fileName: file.name,
          fileType: file.type
        });
        
        setAvatarDeleted(false);
        
        setFileList([{
          uid: '-1',
          name: file.name,
          status: 'done',
          url: base64, 
        }]);

        message.success("Изображение добавлено! Нажмите Save для сохранения.");
        return false; 
      } catch (error) {
        console.error("Ошибка при обработке изображения:", error);
        message.error("Ошибка при обработке изображения");
        return false;
      }
    };

    const handleRemove = async (file: UploadFile) => {
      setAvatarDeleted(true);
      setAvatarData(null);
      setFileList([]);
      message.success("Изображение удалено! Нажмите Save для сохранения изменений.");
      return true;
    };

    const onFinish = async (values: Record<string, string>) => {
      if (!token) {
        console.error("Token not found.");
        return;
      }

      const allowedKeys = [
        "slogan_positionHy",
        "slogan_positionRu",
        "slogan_positionEn",
        "name",
        "login",        
        "password"     
      ];

      const updates: Record<string, string> = {};
      for (const key of allowedKeys) {
        const newValue = values[key];
        const oldValue = initialValues[key];

        if (newValue !== undefined && newValue !== oldValue) {
          updates[key] = String(newValue);
        }
      }

      console.log("Updates to send:", updates);
      try {
        if (Object.keys(updates).length > 0) {
          const response = await fetch(`http://${IP}:8080/api/main/fields`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              "Authorization": "Bearer " + token,
            },
            body: JSON.stringify(updates),
          });

          if (!response.ok) {
            throw new Error("Failed to update fields");
          }
        }

        if (avatarDeleted && initialValues.avatar) {
          const deleteResponse = await fetch(`http://${IP}:8080/api/main/avatar`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              "Authorization": "Bearer " + token,
            },
          });

          if (!deleteResponse.ok) {
            throw new Error("Failed to delete avatar");
          }
          
          setInitialValues(prev => ({ ...prev, avatar: null }));
        } else if (avatarData) {
          const uploadResponse = await fetch(`http://${IP}:8080/api/main/avatar`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": "Bearer " + token,
            },
            body: JSON.stringify({
              avatar: avatarData.base64,
              fileName: avatarData.fileName,
              fileType: avatarData.fileType
            }),
          });

          if (!uploadResponse.ok) {
            throw new Error("Failed to upload avatar");
          }

          const avatarResult = await uploadResponse.json();
          setInitialValues(prev => ({ ...prev, avatar: avatarResult.avatarUrl }));
        }

        setAvatarData(null);
        setAvatarDeleted(false);

        console.log("Данные успешно сохранены");
        message.success("Все изменения успешно сохранены!");
        
      } catch (error) {
        console.error("Ошибка при сохранении:", error);
        message.error("Ошибка при сохранении данных");
      }
    };

    useEffect(() => {
        fetch(`http://${IP}:8080/api/main/token`, {
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
          };
          form.setFieldsValue(vals);
          setInitialValues(vals);

          if (data.avatar) {
            setFileList([{
              uid: '-1',
              name: 'avatar.jpg',
              status: 'done',
              url: data.avatar,
            }]);
            setAvatarDeleted(false);
          }
        })
        .catch((error) => {
          console.error("Ошибка при загрузке данных:", error);
        });
    }, [form, token]);

    const uploadButton = (
      <div>
        <UploadOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );

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
          WebkitBackdropFilter: "blur(12px)",
          background: "rgba(49, 51, 70, 0.4)",
          backdropFilter: "blur(10px)",
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

            <Form.Item label={<span style={{ color: "white" }}>Logo</span>} name="logo">
              <Upload
                listType="picture-card"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
                beforeUpload={handleUpload}
                onRemove={handleRemove}
                accept="image/*"
                maxCount={1}
                style={{ color: "white" }}
              >
                {fileList.length >= 1 ? null : uploadButton}
              </Upload>
            </Form.Item>

          </div>
        </Form>

        <Modal 
          open={previewVisible} 
          title={previewTitle} 
          footer={null} 
          onCancel={() => setPreviewVisible(false)}
          width={800}
        >
          <img 
            alt="preview" 
            style={{ width: '100%', maxHeight: '600px', objectFit: 'contain' }} 
            src={previewImage} 
          />
        </Modal>
      </Card>
    </div>
  );
};