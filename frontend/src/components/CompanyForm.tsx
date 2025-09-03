import { Form, Input, Button, Upload, Space, message, Modal } from "antd";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import type { RcFile, UploadFile } from "antd/es/upload";
import { IP } from "../consts/ip";
import { useTranslation } from "react-i18next";

interface StaffMemberToSend {
  id?: number;
  name: string;
  position: string;
  phoneNumber?: string;
  photo?: string; 
}

export const CompanyForm = ({ initialData, onSave, onCancel }) => {
  const [form] = Form.useForm();
  const [previewImage, setPreviewImage] = useState<string>("");
  const [previewVisible, setPreviewVisible] = useState(false);
  const [originalLogoUrl, setOriginalLogoUrl] = useState<string>("");
  const [originalStaffPhotos, setOriginalStaffPhotos] = useState<{[key: number]: string}>({});
  const { t } = useTranslation();

  const getBase64 = (file: RcFile | Blob): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const result = reader.result as string;
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
    setPreviewVisible(true);
  };

  const handlePreviewCancel = () => {
    setPreviewVisible(false);
    setPreviewImage("");
  };

  useEffect(() => {
    if (initialData) {
      console.log("useEffect - initialData:", initialData);
      console.log("useEffect - initialData.logoUrl:", initialData.logoUrl);
      
      const originalLogo = initialData.originalLogoUrl || initialData.logoUrl || "";
      console.log("useEffect - Setting originalLogoUrl to:", originalLogo);
      setOriginalLogoUrl(originalLogo);

      const originalPhotos: {[key: number]: string} = {};
      (initialData.staffList || []).forEach((member, index) => {
        if (member.originalPhoto || member.photoBase64) {
          console.log(`useEffect - Staff ${index} photo:`, member.originalPhoto || member.photoBase64);
          originalPhotos[index] = member.originalPhoto || member.photoBase64;
        }
      });
      setOriginalStaffPhotos(originalPhotos);

      const staffList = (initialData.staffList || []).map((member) => {
        let fileList: UploadFile[] = [];
        if (member.photoBase64) {
          const isBase64 = /^[A-Za-z0-9+/=]+$/.test(member.photoBase64);
          const fullUrl = isBase64
            ? `data:image/png;base64,${member.photoBase64}`
            : member.photoBase64.startsWith("http")
            ? member.photoBase64
            : `http://${IP}:8080/${member.photoBase64}`;
          
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
        };
      });

      let logoFileList: UploadFile[] = [];
      if (initialData.logoUrl) {
        const isBase64 = /^[A-Za-z0-9+/=]+$/.test(initialData.logoUrl);
        const fullLogoUrl = isBase64
          ? `data:image/png;base64,${initialData.logoUrl}`
          : initialData.logoUrl.startsWith("http")
          ? initialData.logoUrl
          : `http://${IP}:8080/${initialData.logoUrl}`;
        
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
      setOriginalLogoUrl("");
      setOriginalStaffPhotos({});
    }
  }, [initialData, form]);

  const onFinish = async (values) => {
    console.log("onFinish values:", values);
    console.log("originalLogoUrl:", originalLogoUrl);
    console.log("originalStaffPhotos:", originalStaffPhotos);

    const staffWithPhotoField: StaffMemberToSend[] = await Promise.all(
      (values.staffList || []).map(async (member, index) => {
        let photo = null;
        
        if (member.photoBase64 && member.photoBase64.length > 0) {
          const file = member.photoBase64[0];
          
          if (file.originFileObj && file.uid !== "-1") {
            photo = await getBase64(file.originFileObj as RcFile);
          } else {
            photo = originalStaffPhotos[index] || null;
          }
        }
        
        return {
          id: member.id,
          name: member.name,
          position: member.position,
          phoneNumber: member.phoneNumber,
          photo,
        };
      })
    );

    let logo = null;
    
    if (values.logoUrl && values.logoUrl.length > 0) {
      const logoFile = values.logoUrl[0];
      console.log("logoFile:", logoFile);
      console.log("logoFile.uid:", logoFile.uid);
      console.log("logoFile.originFileObj:", !!logoFile.originFileObj);
      
      if (logoFile.originFileObj && logoFile.uid !== "-1") {
        console.log("New logo file uploaded - sending base64");
        logo = await getBase64(logoFile.originFileObj as RcFile);
      } else {
        console.log("Logo not changed - sending original file path:", originalLogoUrl);
        logo = originalLogoUrl;
      }
    } else if (originalLogoUrl) {
      console.log("No logo in form but original exists - sending original file path:", originalLogoUrl);
      logo = originalLogoUrl;
    }

    console.log("Final logo value:", logo);

    const companyToSend = {
      ...initialData,
      name: values.name,
      description: values.description,
      staffList: staffWithPhotoField,
      logoUrl: logo,
    };

    console.log("Отправляем компанию:", companyToSend);
    onSave(companyToSend);
  };

  return (
    <>
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Form.Item name="name" label={t("companyform.cname")} rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item
          name="logoUrl"
          label={t("companyform.logo")}
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

        <Form.Item name="description" label={t("companyform.description")}>
          <Input.TextArea rows={4} />
        </Form.Item>

        <Form.List name="staffList">
          {(fields, { add, remove }) => (
            <>
              <label>{t("companyform.staff")}</label>
              {fields.map(({ key, name }) => (
                <div key={key} style={{ marginBottom: 16, padding: 16, border: "1px solid #d9d9d9", borderRadius: 6 }}>
                  <Form.Item name={[name, "name"]} label={t("companyform.name")} rules={[{ required: true }]}>
                    <Input />
                  </Form.Item>
                  
                  <Form.Item name={[name, "position"]} label={t("companyform.position")} rules={[{ required: true }]}>
                    <Input />
                  </Form.Item>
                  
                  <Form.Item name={[name, "phoneNumber"]} label={t("companyform.phone")}>
                    <Input />
                  </Form.Item>
                  
                  <Form.Item
                    name={[name, "photoBase64"]}
                    label={t("companyform.photo")}
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
                        <div style={{ marginTop: 8 }}>{t("companyform.upload")}</div>
                      </div>
                    </Upload>
                  </Form.Item>
                  
                  <Button 
                    icon={<MinusCircleOutlined />} 
                    onClick={() => remove(name)}
                    style={{ marginTop: 8 }}
                  >
                    {t("companyform.delete")}
                  </Button>
                </div>
              ))}
              <Form.Item>
                <Button type="dashed" onClick={() => add()} icon={<PlusOutlined />} block>
                  {t("companyform.add")}
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>

        <Form.Item>
          <Space>
            <Button onClick={onCancel}>{t("companyform.cancel")}</Button>
            <Button type="primary" htmlType="submit">
              {t("companyform.save")}
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