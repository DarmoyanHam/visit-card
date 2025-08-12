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

interface StaffMemberToSend {
  id?: number;
  name: string;
  position: string;
  phoneNumber?: string;
  photo?: string; // для отправки на бэк
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
    console.log("useEffect: Loading companies. Token exists:", !!token);
    fetch("http://192.168.18.6:8080/api/companies/get-all", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    })
      .then((res) => {
        console.log("useEffect: Fetch companies response status:", res.status);
        return res.json();
      })
      .then((data) => {
        let loadedCompanies: Company[] = [];
        if (Array.isArray(data)) {
          loadedCompanies = data.map((company) => ({
            ...company,
            staffList: company.staffList.map((member: any) => ({
              ...member,
              photoBase64: member.photo, // поле с бэка photo → photoBase64
              photo: undefined,
            })),
          }));
        }
        setCompanies(loadedCompanies);
        console.log("useEffect: Companies loaded:", loadedCompanies.length);
        console.log(
          "useEffect: Sample company data:",
          loadedCompanies[0]
            ? {
                name: loadedCompanies[0].name,
                logoUrl: loadedCompanies[0].logoUrl?.substring(0, 50), // Truncate for logging
                staffPhotoExample:
                loadedCompanies[0].staffList[0]?.photoBase64?.substring(0, 50),
              }
            : "No companies"
        );
      })
      .catch((err) => console.error("Failed to load companies", err));
  }, []);

  const handleAdd = () => {
    setEditingCompany(null);
    setModalVisible(true);
  };

  const handleEdit = (company: Company) => {
    setEditingCompany(JSON.parse(JSON.stringify(company)));
    setModalVisible(true);
  };

 const handleSave = async (company: Company & { staffList: any[] }) => {
  const login = localStorage.getItem("login");

  const url = company.id
    ? `http://192.168.18.6:8080/api/companies/${company.id}`
    : `http://192.168.18.6:8080/api/companies/create?adminLogin=${encodeURIComponent(login)}`;

  const method = company.id ? "PUT" : "POST";

  const res = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
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

  // Преобразуем поле photo → photoBase64 для локального стейта
  const updatedCompany = {
    ...savedCompany,
    staffList: savedCompany.staffList.map((member: any) => ({
      ...member,
      photoBase64: member.photo, // вот здесь переносим photo в photoBase64
      photo: undefined, // удаляем поле photo чтобы не путать UI
    })),
  };

  // Обновляем локальный стейт — теперь UI увидит фото сразу
  setCompanies((prev) =>
    company.id
      ? prev.map((c) => (c.id === updatedCompany.id ? updatedCompany : c))
      : [...prev, updatedCompany]
  );

  handleCancel();
};



  const handleDelete = async (id: number) => {
    console.log(`handleDelete: Deleting company id ${id}`);
    const res = await fetch(`http://192.168.18.6:8080/api/companies/${id}`, {
      method: "DELETE",
      headers: { "Authorization": `Bearer ${token}` },
    });
    console.log("handleDelete: Delete response status:", res.status);
    if (res.ok) {
      setCompanies((prev) => prev.filter((c) => c.id !== id));
    }
  };

  const handleCancel = () => {
    setModalVisible(false);
    setEditingCompany(null);
  };

  const isValidBase64 = (str: string) => {
    try {
      return /^[A-Za-z0-9+/=]+$/.test(str) && btoa(atob(str)) === str;
    } catch (e) {
      return false;
    }
  };

  const getImageSrc = (url?: string) => {
    if (!url) {
      console.log("getImageSrc: No URL provided");
      return undefined;
    }
    if (url.startsWith("data:image")) {
      console.log("getImageSrc: Direct base64 data provided");
      return url;
    }
    if (isValidBase64(url)) {
      console.log("getImageSrc: Converting valid base64 string to data URL");
      return `data:image/png;base64,${url}`;
    }
    if (url.startsWith("http")) {
      console.log("getImageSrc: Using direct HTTP URL");
      return url;
    }
    console.log("getImageSrc: Constructing server URL");
    const constructedUrl = `http://192.168.18.6:8080/${url}`;
    console.log(`getImageSrc: Constructed URL: ${constructedUrl}`);
    return constructedUrl;
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
              title={
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  {company.logoUrl && (
                    <Avatar
                      src={getImageSrc(company.logoUrl)}
                      size={32}
                      onError={() => {
                        console.error(`Failed to load logo for company ${company.name}: ${company.logoUrl?.substring(0, 50)}`);
                        return true;
                      }}
                    />
                  )}
                  {company.name}
                </div>
              }
              extra={
                <Space>
                  <Button
                    onClick={() => handleEdit(company)}
                    icon={<EditOutlined />}
                  />
                  <Button
                    onClick={() => handleDelete(company.id!)}
                    icon={<DeleteOutlined />}
                  />
                </Space>
              }
            >
              <p>
                <b>Staff:</b> {company.staffList.length}
              </p>
              <ul style={{ paddingLeft: 0, listStyle: "none" }}>
                {company.staffList.map((member, index) => (
                  <li
                    key={index}
                    style={{ display: "flex", alignItems: "center", gap: 8 }}
                  >
                    {member.photoBase64 && (
                      <Avatar
                        src={getImageSrc(member.photoBase64)}
                        size={32}
                        onError={() => {
                          console.error(`Failed to load photo for staff ${member.name}: ${member.photoBase64?.substring(0, 50)}`);
                          return true;
                        }}
                      />
                    )}
                    <span>
                      {member.position}: {member.name}
                    </span>
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