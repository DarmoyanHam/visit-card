import { Form, Input, Button, Upload, Space, Image, Flex } from "antd";
import { UploadOutlined, MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import type { RcFile, UploadFile } from "antd/es/upload";

export const CompanyForm = ({ initialData, onSave, onCancel }) => {
  const [form] = Form.useForm();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState<string>("");

  const getBase64 = (file: RcFile): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }
    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  useEffect(() => {
    if (initialData) {
      form.setFieldsValue(initialData);
    } else {
      form.resetFields();
    }
  }, [initialData]);

  const onFinish = async (values) => {
    // Конвертация фото в base64
    const staffWithBase64 = await Promise.all(
      (values.staff || []).map(async (member) => {
        if (member.photo && member.photo[0]?.originFileObj) {
          const base64 = await getBase64(member.photo[0].originFileObj);
          return { ...member, photo: base64 };
        }
        return member;
      })
    );

    const company = {
      ...initialData,
      name: values.name,
      staff: staffWithBase64,
    };

    onSave(company);
  };

  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
      <Form.Item name="name" label="Название компании" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.List name="staff">
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
                <Flex wrap gap="small" align="center">
                  <Form.Item
                    name={[name, "photo"]}
                    valuePropName="fileList"
                    getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
                    style={{ marginBottom: 0 }}
                  >
                    <Upload
                      listType="picture"
                      beforeUpload={() => false}
                      maxCount={1}
                      onPreview={handlePreview}
                    >
                      <Button icon={<UploadOutlined />} />
                    </Upload>
                  </Form.Item>

                  {/* Модальное окно просмотра */}
                  {previewImage && (
                    <Image
                      wrapperStyle={{ display: "none" }}
                      preview={{
                        visible: previewOpen,
                        onVisibleChange: (visible) => setPreviewOpen(visible),
                        afterOpenChange: (visible) => !visible && setPreviewImage(""),
                      }}
                      src={previewImage}
                    />
                  )}

                  <Button icon={<MinusCircleOutlined />} onClick={() => remove(name)} />
                </Flex>
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
  );
};

{/* <Space
                key={key}
                align="start"
                style={{ display: "flex", marginBottom: 8, flexWrap: "wrap" }}
              ></Space> 
              </Space>*/}