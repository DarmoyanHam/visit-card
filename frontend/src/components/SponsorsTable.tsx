import { useEffect, useState } from "react";
import { Card, Button, Modal, Row, Col, Space, Avatar } from "antd";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { CompanyForm } from "./CompanyForm";

interface StaffMember {
  name: string;
  position: string;
  phone?: string;
  photo?: string; // теперь base64
}

interface Company {
  id: number;
  name: string;
  staff: StaffMember[];
}

export const CompanyContainer = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [editingCompany, setEditingCompany] = useState<Company | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    fetch("/api/companies")
      .then((res) => res.json())
      .then(setCompanies)
      .catch((err) => console.error("Ошибка при загрузке компаний", err));
  }, []);

  const handleAdd = () => {
    setEditingCompany(null);
    setModalVisible(true);
  };

  const handleEdit = (company: Company) => {
    setEditingCompany(company);
    setModalVisible(true);
  };

  const handleSave = async (company: Omit<Company, "id"> & { id?: number }) => {
    if (company.id) {
      const res = await fetch(`/api/companies/${company.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(company),
      });

      if (res.ok) {
        setCompanies((prev) =>
          prev.map((c) => (c.id === company.id ? { ...company, id: company.id! } : c))
        );
      }
    } else {
      const res = await fetch("/api/companies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(company),
      });

      if (res.ok) {
        const newCompany = await res.json();
        setCompanies((prev) => [...prev, newCompany]);
      }
    }

    setModalVisible(false);
    setEditingCompany(null);
  };

  const handleDelete = async (id: number) => {
    const res = await fetch(`/api/companies/${id}`, { method: "DELETE" });
    if (res.ok) {
      setCompanies((prev) => prev.filter((c) => c.id !== id));
    }
  };

  return (
    <div>
      <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
        Добавить компанию
      </Button>

      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        {companies.map((company) => (
          <Col key={company.id} span={8}>
            <Card
              style={{ backgroundColor: "#1e1f25", color: "white" }}
              headStyle={{ backgroundColor: "#1e1f25", color: "white" }}
              bodyStyle={{ color: "white" }}
              title={company.name}
              extra={
                <Space>
                  <Button onClick={() => handleEdit(company)} icon={<EditOutlined />} />
                  <Button onClick={() => handleDelete(company.id)} icon={<DeleteOutlined />} />
                </Space>
              }
            >
              <p><b>Сотрудников:</b> {company.staff.length}</p>
              <ul style={{ paddingLeft: 0, listStyle: "none" }}>
                {company.staff.map((member, index) => (
                  <li key={index} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    {member.photo && (
                      <Avatar src={member.photo} size={32} />
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
        onCancel={() => setModalVisible(false)}
        footer={null}
        width={900}
      >
        <CompanyForm
          initialData={editingCompany}
          onSave={handleSave}
          onCancel={() => setModalVisible(false)}
        />
      </Modal>
    </div>
  );
};
