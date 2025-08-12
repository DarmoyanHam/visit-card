import { useEffect, useState } from "react";
import { Card, Button, Modal, Row, Col, Space, Avatar } from "antd";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { CompanyForm } from "./CompanyForm";

interface StaffMember {
  id?: number;
  name: string;
  position: string;
  phoneNumber?: string;
  photoBase64?: string;
}

interface Company {
  id?: number;
  name: string;
  staffList: StaffMember[];
  logoUrl?: string;
  description?: string;
}

const token = localStorage.getItem("token");

export const CompanyContainer = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [editingCompany, setEditingCompany] = useState<Company | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    fetch("http://192.168.18.6:8080/api/companies/get-all", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setCompanies(data);
        } else if (Array.isArray(data.data)) {
          setCompanies(data.data);
        } else {
          setCompanies([]);
        }
      })
      .catch((err) => console.error("Failed to load companies", err));
  }, []);

  const handleAdd = () => {
    setEditingCompany(null);
    setModalVisible(true);
  };

  const handleEdit = (company: Company) => {
    // Копируем объект, чтобы форма работала с отдельным экземпляром
    setEditingCompany(JSON.parse(JSON.stringify(company)));
    setModalVisible(true);
  };

  const handleSave = async (company: Company) => {
    const url = company.id
      ? `http://192.168.18.6:8080/api/companies/${company.id}`
      : `http://192.168.18.6:8080/api/companies/create`;

    const method = company.id ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token,
      },
      body: JSON.stringify({
        ...company,
        staffList: company.staffList.map((s) => ({
          ...s,
          company: undefined,
        })),
      }),
    });

    if (!res.ok) {
      console.error("Failed to save company");
      return;
    }

    const savedCompany = await res.json();
    setCompanies((prev) =>
      company.id
        ? prev.map((c) => (c.id === savedCompany.id ? savedCompany : c))
        : [...prev, savedCompany]
    );

    handleCancel();
  };

  const handleDelete = async (id: number) => {
    const res = await fetch(`http://192.168.18.6:8080/api/companies/${id}`, {
      method: "DELETE",
      headers: { "Authorization": "Bearer " + token },
    });
    if (res.ok) {
      setCompanies((prev) => prev.filter((c) => c.id !== id));
    }
  };

  const handleCancel = () => {
    setModalVisible(false);
    setEditingCompany(null);
  };

  return (
    <div>
      <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
        Add company
      </Button>

      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        {companies.map((company) => (
          <Col key={company.id} span={8}>
            <Card
              style={{ backgroundColor: "#1e1f25", color: "white" }}
              styles={{ header: { backgroundColor: "#1e1f25", color: "white" } }}
              title={company.name}
              extra={
                <Space>
                  <Button onClick={() => handleEdit(company)} icon={<EditOutlined />} />
                  <Button onClick={() => handleDelete(company.id!)} icon={<DeleteOutlined />} />
                </Space>
              }
            >
              <p><b>Staff:</b> {company.staffList.length}</p>
              <ul style={{ paddingLeft: 0, listStyle: "none" }}>
                {company.staffList.map((member, index) => (
                  <li key={index} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    {member.photoBase64 && (
                      <Avatar
                        src={
                          member.photoBase64
                            ? member.photoBase64.startsWith("data:image")
                              ? member.photoBase64
                              : member.photoBase64.startsWith("http")
                              ? member.photoBase64
                              : /^[A-Za-z0-9+/=]+$/.test(member.photoBase64)
                              ? `data:image/png;base64,${member.photoBase64}`
                              : `http://192.168.18.6:8080/${member.photoBase64}`
                            : undefined
                        }
                        size={32}
                      />
                    )}
                    <span>{member.position}: {member.name}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </Col>
        ))}
      </Row>

      <Modal
        open={modalVisible}
        onCancel={handleCancel}
        footer={null}
        width={900}
        destroyOnHidden
      >
        <CompanyForm
          initialData={editingCompany}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      </Modal>
    </div>
  );
};