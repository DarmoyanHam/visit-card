import { Form, Input, Button, Upload, Space, message } from "antd";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import type { RcFile, UploadFile } from "antd/es/upload";

export const CompanyForm = ({ initialData, onSave, onCancel }) => {
  const [form] = Form.useForm();
  const [previewImage, setPreviewImage] = useState<string>("");

  const getBase64 = (file: RcFile): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const result = reader.result as string;
        // Оставляем только чистый base64 без префикса
        resolve(result.split(",")[1] || "");
      };
      reader.onerror = (error) => reject(error);
    });

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview && file.originFileObj) {
      const base64 = await getBase64(file.originFileObj as RcFile);
      file.preview = `data:image/png;base64,${base64}`;
    }
    setPreviewImage(file.url || (file.preview as string));
  };

  useEffect(() => {
    if (initialData) {
      const staffList = (initialData.staffList || []).map((member) => {
        let fileList: UploadFile[] = [];
        if (member.photoBase64) {
          let fullUrl;
          if (member.photoBase64.startsWith("http")) {
            fullUrl = member.photoBase64;
          } else if (/^[A-Za-z0-9+/=]+$/.test(member.photoBase64)) {
            fullUrl = `data:image/png;base64,${member.photoBase64}`;
          } else {
            fullUrl = `http://192.168.18.6:8080/${member.photoBase64}`;
          }
          fileList = [
            {
              uid: "-1",
              name: "image.png",
              status: "done",
              url: fullUrl,
            },
          ];
        }
        return {
          ...member,
          photoBase64: fileList,
          originalPhotoBase64: member.photoBase64, // Сохраняем оригинальное значение
        };
      });

      form.setFieldsValue({
        ...initialData,
        staffList,
      });
    } else {
      form.resetFields();
    }
  }, [initialData, form]);

  const onFinish = async (values) => {
    const staffWithProcessedPhotos = await Promise.all(
      (values.staffList || []).map(async (member) => {
        if (member.photoBase64 && member.photoBase64.length > 0) {
          const file = member.photoBase64[0];
          if (file.originFileObj) {
            // Новый файл → base64 без префикса
            const base64 = await getBase64(file.originFileObj as RcFile);
            return { ...member, photo: base64, originalPhotoBase64: undefined };
          } else if (file.url) {
            if (file.url.startsWith("data:image")) {
              // Редкий случай: base64 в url
              return { ...member, photo: file.url.split(",")[1], originalPhotoBase64: undefined };
            } else {
              // Не изменено → отправляем оригинальный путь/base64
              return { ...member, photo: member.originalPhotoBase64, originalPhotoBase64: undefined };
            }
          }
        }
        // Удалено или пусто → null
        return { ...member, photo: null, originalPhotoBase64: undefined };
      })
    );

    const company = {
      ...initialData,
      name: values.name,
      staffList: staffWithProcessedPhotos,
    };

    onSave(company);
  };

  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
      <Form.Item
        name="name"
        label="Название компании"
        rules={[{ required: true, message: "Введите название компании" }]}
      >
        <Input />
      </Form.Item>

      <Form.List name="staffList">
        {(fields, { add, remove }) => (
          <>
            <label>Сотрудники</label>
            {fields.map(({ key, name }) => (
              <div style={{ marginBottom: 8 }} key={key}>
                <Form.Item
                  name={[name, "name"]}
                  rules={[{ required: true, message: "Введите имя" }]}
                >
                  <Input placeholder="Имя" />
                </Form.Item>
                <Form.Item
                  name={[name, "position"]}
                  rules={[{ required: true, message: "Введите должность" }]}
                >
                  <Input placeholder="Должность" />
                </Form.Item>
                <Form.Item name={[name, "phone"]}>
                  <Input placeholder="Телефон" />
                </Form.Item>
                <Form.Item
                  name={[name, "photoBase64"]}
                  valuePropName="fileList"
                  getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
                  style={{ marginBottom: 0 }}
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
                    showUploadList={{ showRemoveIcon: true }}
                  >
                    <div>
                      <PlusOutlined />
                      <div style={{ marginTop: 8 }}>Загрузить</div>
                    </div>
                  </Upload>
                </Form.Item>
                <Form.Item name={[name, "originalPhotoBase64"]} hidden>
                  <Input type="hidden" />
                </Form.Item>
                <Button
                  icon={<MinusCircleOutlined />}
                  onClick={() => remove(name)}
                />
              </div>
            ))}
            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                icon={<PlusOutlined />}
              >
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
  );
};