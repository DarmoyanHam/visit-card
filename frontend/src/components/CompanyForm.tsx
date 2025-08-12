import { Form, Input, Button, Upload, Space, message, Modal } from "antd";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import type { RcFile, UploadFile } from "antd/es/upload";

interface StaffMemberToSend {
  id?: number;
  name: string;
  position: string;
  phoneNumber?: string;
  photo?: string; // для отправки на бэк
}

export const CompanyForm = ({ initialData, onSave, onCancel }) => {
  const [form] = Form.useForm();
  const [previewImage, setPreviewImage] = useState<string>("");
  const [previewVisible, setPreviewVisible] = useState(false);

  const getBase64 = (file: RcFile): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const result = reader.result as string;
        resolve(result.split(",")[1] || ""); // возвращаем чистый base64
      };
      reader.onerror = (error) => reject(error);
    });

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview && file.originFileObj) {
      const base64 = await getBase64(file.originFileObj as RcFile);
      file.preview = `data:image/png;base64,${base64}`;
    }
    setPreviewImage(file.url || (file.preview as string));
    setPreviewVisible(true);
  };

  const handlePreviewCancel = () => {
    setPreviewVisible(false);
    setPreviewImage("");
  };

  useEffect(() => {
    if (initialData) {
      const staffList = (initialData.staffList || []).map((member) => {
        let fileList: UploadFile[] = [];
        if (member.photoBase64) {
          const fullUrl = /^[A-Za-z0-9+/=]+$/.test(member.photoBase64)
            ? `data:image/png;base64,${member.photoBase64}`
            : member.photoBase64.startsWith("http")
            ? member.photoBase64
            : `http://192.168.18.6:8080/${member.photoBase64}`;
          fileList = [
            {
              uid: "-1",
              name: "image.png",
              status: "done",
              url: fullUrl,
            },
          ];
        }
        return { ...member, photoBase64: fileList };
      });

      let logoFileList: UploadFile[] = [];
      if (initialData.logoUrl) {
        const fullLogoUrl = /^[A-Za-z0-9+/=]+$/.test(initialData.logoUrl)
          ? `data:image/png;base64,${initialData.logoUrl}`
          : initialData.logoUrl.startsWith("http")
          ? initialData.logoUrl
          : `http://192.168.18.6:8080/${initialData.logoUrl}`;
        logoFileList = [
          {
            uid: "-1",
            name: "logo.png",
            status: "done",
            url: fullLogoUrl,
          },
        ];
      }

      form.setFieldsValue({
        ...initialData,
        staffList,
        logoUrl: logoFileList,
      });
    } else {
      form.resetFields();
    }
  }, [initialData, form]);

  const onFinish = async (values) => {
    const staffWithPhotoField: StaffMemberToSend[] = await Promise.all(
        (values.staffList || []).map(async (member) => {
        let photo = null;
        if (member.photoBase64 && member.photoBase64.length > 0) {
            const file = member.photoBase64[0];
            if (file.originFileObj) {
            photo = await getBase64(file.originFileObj as RcFile);
            } else if (file.url) {
            if (file.url.startsWith("data:image")) {
                photo = file.url.split(",")[1];
            } else {
                const response = await fetch(file.url);
                const blob = await response.blob();
                photo = await getBase64(blob as RcFile);
            }
            }
        }
        return {
            ...member,
            photo,  // отправляем как photo
            photoBase64: undefined, // убираем photoBase64, чтобы не путать
        };
        })
    );

    let logo = null;
    if (values.logoUrl && values.logoUrl.length > 0) {
        const logoFile = values.logoUrl[0];
        if (logoFile.originFileObj) {
        logo = await getBase64(logoFile.originFileObj as RcFile);
        } else if (logoFile.url) {
        logo = logoFile.url.startsWith("data:image")
            ? logoFile.url.split(",")[1]
            : logoFile.url;
        }
    }

    const companyToSend = {
        ...initialData,
        name: values.name,
        description: values.description,
        staffList: staffWithPhotoField,
        logoUrl: logo,
    };

    onSave(companyToSend);
    };


  return (
    <>
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Form.Item name="name" label="Название компании" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item
          name="logoUrl"
          label="Логотип компании"
          valuePropName="fileList"
          getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
        >
          <Upload
            accept="image/*"
            listType="picture-card"
            beforeUpload={(file) => {
              if (!file.type.startsWith("image/")) {
                message.error("Можно загружать только изображения!");
                return Upload.LIST_IGNORE;
              }
              return false;
            }}
            maxCount={1}
            onPreview={handlePreview}
          >
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Загрузить</div>
            </div>
          </Upload>
        </Form.Item>

        <Form.Item name="description" label="Описание компании">
          <Input.TextArea rows={4} />
        </Form.Item>

        <Form.List name="staffList">
          {(fields, { add, remove }) => (
            <>
              <label>Сотрудники</label>
              {fields.map(({ key, name }) => (
                <div key={key} style={{ marginBottom: 8 }}>
                  <Form.Item name={[name, "name"]} rules={[{ required: true }]}>
                    <Input placeholder="Имя" />
                  </Form.Item>
                  <Form.Item name={[name, "position"]} rules={[{ required: true }]}>
                    <Input placeholder="Должность" />
                  </Form.Item>
                  <Form.Item name={[name, "phone"]}>
                    <Input placeholder="Телефон" />
                  </Form.Item>
                  <Form.Item
                    name={[name, "photoBase64"]}
                    valuePropName="fileList"
                    getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
                  >
                    <Upload
                      accept="image/*"
                      listType="picture-card"
                      beforeUpload={(file) => {
                        if (!file.type.startsWith("image/")) {
                          message.error("Можно загружать только изображения!");
                          return Upload.LIST_IGNORE;
                        }
                        return false;
                      }}
                      maxCount={1}
                      onPreview={handlePreview}
                    >
                      <div>
                        <PlusOutlined />
                        <div style={{ marginTop: 8 }}>Загрузить</div>
                      </div>
                    </Upload>
                  </Form.Item>
                  <Button icon={<MinusCircleOutlined />} onClick={() => remove(name)} />
                </div>
              ))}
              <Form.Item>
                <Button type="dashed" onClick={() => add()} icon={<PlusOutlined />}>
                  Добавить сотрудника
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>

        <Form.Item>
          <Space>
            <Button onClick={onCancel}>Отмена</Button>
            <Button type="primary" htmlType="submit">
              Сохранить
            </Button>
          </Space>
        </Form.Item>
      </Form>

      <Modal open={previewVisible} footer={null} onCancel={handlePreviewCancel}>
        <img alt="preview" style={{ width: "100%" }} src={previewImage} />
      </Modal>
    </>
  );
};
