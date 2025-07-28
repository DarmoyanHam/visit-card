import { Card, Form, Input, Checkbox, Select, Button, Upload, ColorPicker } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useState } from "react";

const { TextArea } = Input;

export const HomeContainer = () => {
  const [form] = Form.useForm();
  const [color, setColor] = useState("#FFFFF000526ff")

  const onFinish = (values) => {
    console.log("Saved:", values);
  };

  return (
    <div className="max-w-4xl mx-auto py-10">
      <Card 
        title="Редактирование страницы визитки" bordered 
        className="shadow-xl rounded-2xl"
        style={{
            backgroundColor: "#313346ff",
            borderColor: "#313346ff",
            borderWidth: 1,
            borderStyle: "solid",
        }}>
        <Form
          layout="vertical"
          form={form}
          onFinish={onFinish}
          initialValues={{ sloganBold: true, feedback: true }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Form.Item label="Пароль" name="password">
              <Input.Password placeholder="Введите пароль" />
            </Form.Item>

            <Form.Item label="URL" name="url">
              <Input />
            </Form.Item>

            <Form.Item label="Название (Армянский)" name="nameHy">
              <Input />
            </Form.Item>

            <Form.Item label="Название (Русский)" name="nameRu">
              <Input />
            </Form.Item>

            <Form.Item label="Название (Английский)" name="nameEn">
              <Input />
            </Form.Item>

            <Form.Item label="Слоган/Должность (Армянский)" name="sloganHy">
              <TextArea rows={2} />
            </Form.Item>

            <Form.Item label="Слоган/Должность (Русский)" name="sloganRu">
              <TextArea rows={2} />
            </Form.Item>

            <Form.Item label="Слоган/Должность (Английский)" name="sloganEn">
              <TextArea rows={2} />
            </Form.Item>

            <div style={{ display: "flex" }}>
                <Form.Item label="color for name" name="nameColor">
                    <ColorPicker value={color} />
                </Form.Item>

                <Form.Item label="Цвет имени" name="nameColor">
                    <ColorPicker value={color} />
                </Form.Item>

                <Form.Item label="Цвет Слоган/Должность" name="sloganColor">
                    <ColorPicker value={color} />
                </Form.Item>

                <Form.Item label="Цвет значка" name="iconColor">
                    <ColorPicker value={color} />
                </Form.Item>

                <Form.Item label="Цвет фона значка" name="iconBgColor">
                    <ColorPicker value={color} />
                </Form.Item>

                <Form.Item label="Цвет названия кнопки" name="buttonColor">
                    <ColorPicker value={color} />
                </Form.Item>

                <Form.Item label="Цвет 'Добавить в контакты'" name="addToContactColor">
                    <ColorPicker value={color} />
                </Form.Item>

                <Form.Item label="Цвет кнопки выбора языка" name="langBtnColor">
                    <ColorPicker value={color} />
                </Form.Item>
            </div>

            <Form.Item label="Опции">
                <Checkbox.Group>
                    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                        <Checkbox value="opt1">Опция 1</Checkbox>
                        <Checkbox value="opt2">Опция 2</Checkbox>
                        <Checkbox value="opt3">Опция 3</Checkbox>
                        <Checkbox value="opt4">Опция 4</Checkbox>
                    </div>
                </Checkbox.Group>
            </Form.Item>

            <Form.Item label="Логотип" name="logo">
              <Upload listType="picture" maxCount={1} beforeUpload={() => false}>
                <Button icon={<UploadOutlined />}>Загрузить логотип</Button>
              </Upload>
            </Form.Item>
          </div>

          <div className="text-center mt-8">
            <Button type="primary" htmlType="submit" size="large">
              Сохранить
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
};
