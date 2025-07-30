import { 
    Table, 
    Input, 
    Button, 
    Upload,
    Card, 
    Row, 
    Col, 
    Typography, 
    Image, 
    Form, 
    Modal, 
    Affix 
} from "antd";
import { PlusCircleOutlined, UploadOutlined } from "@ant-design/icons";
import { useState } from "react";
import type { ColumnsType } from "antd/es/table";

/*
<Button onClick={() => setIsModalOpen(true)} style={{ marginBottom: 16 }} icon={<PlusCircleOutlined/> }>
                Add Sponsor
            </Button>
*/

const { Search } = Input;
const { Title } = Typography;

interface SponsorData {
  key: string;
  name: string;
  logo: string; 
  link: string;
}

const initialSponsors: SponsorData[] = [
  { key: "1", name: "Sponsor A", logo: "", link: "" },
  { key: "2", name: "BLBLBL", logo: "", link: "" },
  { key: "3", name: "Sponsor C", logo: "", link: "" },
];

export const SponsorsTable = () => {
  const [data, setData] = useState<SponsorData[]>(initialSponsors);
  const [initialData] = useState<SponsorData[]>(initialSponsors);
  const [searchValue, setSearchValue] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const addSponsor = (values: { logo: string; link: string, name: string }) => {
    const newSponsor: SponsorData = {
      key: Date.now().toString(),
      logo: values.logo,
      link: values.link,
      name: values.name,
    };
    setData((prev) => [...prev, newSponsor]);
    setIsModalOpen(false);
    form.resetFields();
  };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);

    const filtered = initialData.filter(sponsor =>
        sponsor.name.toLowerCase().includes(value.trim().toLowerCase())
    );
    setData(filtered);
    };



  const handleChange = (key: string, field: keyof SponsorData, value: string) => {
    setData(prev =>
      prev.map(item => (item.key === key ? { ...item, [field]: value } : item))
    );
  };

  const deleteSponsor = (key: string) => {
    setData((prev) => prev.filter((s) => s.key !== key));
  };

  const handleLogoUpload = (file: File, key: string) => {
    const reader = new FileReader();
    reader.onload = e => {
      const base64 = e.target?.result as string;
      setData(prev =>
        prev.map(item =>
          item.key === key ? { ...item, logo: base64 } : item
        )
      );
    };
    reader.readAsDataURL(file);
    return false; 
  };

  const columns: ColumnsType<SponsorData> = [
    {
      title: "№",
      render: (_: any, __: any, index: number) => index + 1,
      width: 50,
    },
    {
      title: "Name",
      dataIndex: "name",
      render: (_: any, record: SponsorData) => (
        <Input
          value={record.name}
          onChange={e => handleChange(record.key, "name", e.target.value)}
        />
      ),
    },
        {
      title: "Link",
      dataIndex: "link",
      render: (_: any, record: SponsorData) => (
        <Input
          value={record.link}
          onChange={e => handleChange(record.key, "link", e.target.value)}
        />
      ),
    },
    {
      title: "Logo",
      dataIndex: "logo",
      render: (_: any, record: SponsorData) => (
        <Upload
          showUploadList={false}
          beforeUpload={file => handleLogoUpload(file, record.key)}
        >
          {record.logo ? (
            <Image
              src={record.logo}
              alt="logo"
              width={40}
              height={40}
              style={{ objectFit: "cover", borderRadius: 4 }}
              preview={false}
            />
          ) : (
            <Button icon={<UploadOutlined />}>Upload</Button>
          )}
        </Upload>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: SponsorData) => (
        <Button onClick={() => deleteSponsor(record.key)}>
          Delete
        </Button>
      ),
    },
  ];

  return (
    <Card
        title={
            <Row justify="space-between" align="middle" wrap={false}>
                <Col>
                    <Title level={3} style={{ color: "white", margin: 0 }}>
                        Sponsors
                    </Title>
                </Col>
                <Col flex="auto" />
                    <Col>
                        <Row gutter={8} align="middle" wrap={false}>
                            <Col>
                                <Input
                                    placeholder="Поиск спонсора"
                                    value={searchValue}
                                    onChange={handleSearchChange}
                                />
                            </Col>
                            <Col>
                                <Button>Save</Button>
                            </Col>
                        </Row>
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
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        rowKey="key"
        className="custom-dark-table"
      />
      <Modal
        title="Add New Sponsor"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={() => form.submit()}
        okText="Add"
      >
        <Form form={form} layout="vertical" onFinish={addSponsor}>
          <Form.Item
            name="name"
            label={<span style={{ color: "white" }}>Sponsor name</span>}
            rules={[{ required: true, message: "Please input Sponsor's name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="logo"
            label={<span style={{ color: "white" }}>Logo</span>}
            rules={[{ required: true, message: "Please input logo URL" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="link"
            label={<span style={{ color: "white" }}>Sponsor link</span>}
            rules={[{ required: true, message: "Please input sponsor link" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
      <Affix offsetBottom={10}>
        <Button onClick={() => setIsModalOpen(true)} style={{ marginBottom: 16 }} icon={<PlusCircleOutlined/> }>
            Add Sponsor
        </Button>
      </Affix>
    </Card>
  );
};
